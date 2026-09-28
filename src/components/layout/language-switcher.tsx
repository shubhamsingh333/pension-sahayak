"use client";
import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/client";
import {
  localeCookie,
  localeNames,
  locales,
  switchLocalePath,
  type Locale,
} from "@/i18n/config";

/** Remembered by the proxy for visits to URLs without a language prefix. */
function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function choose(event: MouseEvent<HTMLAnchorElement>, next: Locale) {
    rememberLocale(next);
    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (modified || event.button !== 0) return;
    event.preventDefault();
    // Keep query and hash, e.g. /grievance?reference=…#track.
    const { search, hash } = window.location;
    router.replace(switchLocalePath(pathname, next) + search + hash, {
      scroll: false,
    });
  }

  return (
    <nav aria-label={t.topBar.language} className="flex items-center gap-1">
      <Languages size={16} aria-hidden className="mr-1 text-slate-500" />
      {locales.map((option) => (
        <Link
          key={option}
          href={switchLocalePath(pathname, option)}
          hrefLang={option}
          lang={option}
          prefetch={false}
          aria-current={option === locale ? "true" : undefined}
          onClick={(event) => choose(event, option)}
          className={
            "rounded px-2 py-1 font-semibold transition-colors " +
            (option === locale
              ? "bg-teal-800 text-white"
              : "text-slate-600 hover:bg-slate-200")
          }
        >
          {localeNames[option]}
        </Link>
      ))}
    </nav>
  );
}
