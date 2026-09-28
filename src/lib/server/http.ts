import "server-only";
import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { isApiErrorCode, type ApiErrorCode } from "@/lib/api-errors";
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ApiErrorCode,
    message: string,
  ) {
    super(message);
  }
}
export function apiError(error: unknown) {
  if (error instanceof ApiError)
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  console.error(
    "[Pension Sahayak API]",
    error instanceof Error ? error.name : "Unknown error",
  );
  return NextResponse.json(
    {
      error:
        "Database is unavailable. Please try again later. No grievance was saved.",
      code: "service_unavailable" satisfies ApiErrorCode,
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
/** Validates input, turning the first issue into a field-specific error code. */
export function parseInput<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  const issue = result.error.issues[0];
  const field = String(issue.path[0] ?? "request").replace(
    /[A-Z]/g,
    (c) => "_" + c.toLowerCase(),
  );
  const code = "invalid_" + field;
  throw new ApiError(
    400,
    isApiErrorCode(code) ? code : "invalid_request",
    issue.message,
  );
}
/**
 * Compares the browser's Origin with the host it actually requested. `request.url`
 * can't be used: Next.js reports it as "localhost" when bound to 127.0.0.1.
 */
function isSameOrigin(request: Request, origin: string) {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
export async function readBody(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !isSameOrigin(request, origin))
    throw new ApiError(403, "cross_origin", "Cross-origin requests are not allowed.");
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new ApiError(415, "unsupported_media_type", "Send JSON content.");
  const reader = request.body?.getReader();
  if (!reader)
    throw new ApiError(400, "body_required", "A request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) {
      await reader.cancel();
      throw new ApiError(413, "payload_too_large", "Request is too large.");
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    throw new ApiError(400, "invalid_json", "Invalid JSON.");
  }
}
