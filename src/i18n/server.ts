import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./messages";

// Loaded on demand, so each request only imports its own language.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./messages/en").then((m) => m.en),
  hi: () => import("./messages/hi").then((m) => m.hi),
  te: () => import("./messages/te").then((m) => m.te),
};

/** Current locale from the `[lang]` root segment, for any Server Component. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: await dictionaries[locale]() };
}
