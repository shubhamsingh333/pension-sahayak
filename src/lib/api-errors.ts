/**
 * Stable, language-neutral error codes returned by the API as `{ error, code }`.
 * The UI translates the code; `error` stays as an English message for API clients.
 */
export const apiErrorCodes = [
  "cross_origin",
  "unsupported_media_type",
  "body_required",
  "payload_too_large",
  "invalid_json",
  "invalid_request",
  "invalid_category",
  "invalid_subject",
  "invalid_description",
  "invalid_demo_consent",
  "invalid_ppo",
  "ppo_not_found",
  "invalid_reference",
  "grievance_not_found",
  "service_unavailable",
] as const;
export type ApiErrorCode = (typeof apiErrorCodes)[number];

export function isApiErrorCode(value: unknown): value is ApiErrorCode {
  return apiErrorCodes.includes(value as ApiErrorCode);
}
