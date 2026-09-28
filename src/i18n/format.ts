import { intlLocales, type Locale } from "./config";

export type PluralForms = { one: string; other: string };

/** format("{count} of {total}", { count: 2, total: 5 }) → "2 of 5" */
export function format(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Chooses the plural form for the locale, then fills in {count}. */
export function plural(locale: Locale, count: number, forms: PluralForms) {
  const category = new Intl.PluralRules(intlLocales[locale]).select(count);
  return format(category === "one" ? forms.one : forms.other, { count });
}
