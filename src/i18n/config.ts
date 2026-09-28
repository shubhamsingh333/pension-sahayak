export const locales = ["en", "hi", "te"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "NEXT_LOCALE";

/** Native names, so every visitor can recognise their own language. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
};

/** BCP 47 tags for Intl formatting (dates, plurals). */
export const intlLocales: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** "/grievance#track" → "/hi/grievance#track" */
export function localizePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** "/hi/pension-help/ppo-help" → "/te/pension-help/ppo-help" */
export function switchLocalePath(pathname: string, locale: Locale) {
  const [, first, ...rest] = pathname.split("/");
  const path = isLocale(first) ? rest.join("/") : [first, ...rest].join("/");
  return localizePath(locale, "/" + path.replace(/\/$/, ""));
}

/** Picks a supported locale from a saved cookie, then the Accept-Language header. */
export function preferredLocale(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return (
    (acceptLanguage ?? "")
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().toLowerCase().split(";");
        const q = params.find((p) => p.trim().startsWith("q="));
        return { language: tag.split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
      })
      .filter(({ q }) => q > 0)
      .sort((a, b) => b.q - a.q)
      .map(({ language }) => language)
      .find(isLocale) ?? defaultLocale
  );
}
