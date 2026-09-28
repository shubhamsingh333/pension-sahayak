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

/** Chooses the plural form for the locale, then fills in {count} ("10,399"). */
export function plural(locale: Locale, count: number, forms: PluralForms) {
  const intl = intlLocales[locale];
  const category = new Intl.PluralRules(intl).select(count);
  return format(category === "one" ? forms.one : forms.other, {
    count: new Intl.NumberFormat(intl).format(count),
  });
}
