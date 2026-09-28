import { NextResponse, type NextRequest } from "next/server";
import { localeCookie, localizePath, preferredLocale } from "@/i18n/config";

/**
 * Sends URLs without a language prefix to the visitor's language:
 * saved choice (cookie), then browser language, then English.
 * "/grievance?reference=…" → "/hi/grievance?reference=…"
 */
export function proxy(request: NextRequest) {
  const locale = preferredLocale(
    request.cookies.get(localeCookie)?.value,
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = localizePath(locale, url.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next.js internals, files with an extension, and paths
  // that already start with a locale. Keep the locale list in sync with config.ts.
  matcher: ["/((?!api|_next|(?:en|hi|te)(?:/|$)|.*\\..*).*)"],
};
