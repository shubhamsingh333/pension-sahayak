"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { ClientMessages } from "./messages";

const I18nContext = createContext<{ locale: Locale; t: ClientMessages } | null>(
  null,
);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: ClientMessages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: messages }), [locale, messages]);
  return <I18nContext value={value}>{children}</I18nContext>;
}

/** Current locale and translated messages, for any Client Component. */
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>.");
  return value;
}
