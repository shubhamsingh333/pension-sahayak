import { isApiErrorCode, type ApiErrorCode } from "./api-errors";
export type ErrorMessages = Record<ApiErrorCode | "generic", string>;
export class ApiRequestError extends Error {
  constructor(
    public code: ApiErrorCode | "generic",
    message: string,
  ) {
    super(message);
  }
}
/** GET when there is no body, POST JSON otherwise. Pass `signal` to cancel stale requests. */
export async function apiRequest<T>(
  url: string,
  { body, signal }: { body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const timeout = AbortSignal.timeout(12000);
  const response = await fetch(url, {
    method: body === undefined ? "GET" : "POST",
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  const result = await response.json();
  if (!response.ok)
    throw new ApiRequestError(
      isApiErrorCode(result.code) ? result.code : "generic",
      result.error ?? "The request could not be completed.",
    );
  return result.data as T;
}
/** Translated message for any failure, including network errors and timeouts. */
export function errorMessage(error: unknown, messages: ErrorMessages) {
  return messages[error instanceof ApiRequestError ? error.code : "generic"];
}
