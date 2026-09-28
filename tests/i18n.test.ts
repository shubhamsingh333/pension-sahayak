import test from "node:test";
import assert from "node:assert/strict";
import {
  localizePath,
  preferredLocale,
  switchLocalePath,
} from "../src/i18n/config";
import { format, plural } from "../src/i18n/format";
import { en } from "../src/i18n/messages/en";
import { hi } from "../src/i18n/messages/hi";
import { te } from "../src/i18n/messages/te";
import { filterCentres, localizeCentres } from "../src/lib/centres";
import { apiErrorCodes } from "../src/lib/api-errors";

test("preferred locale: saved cookie, then Accept-Language, then English", () => {
  assert.equal(preferredLocale("te", "hi-IN,hi;q=0.9"), "te");
  assert.equal(preferredLocale("fr", "hi-IN,hi;q=0.9,en;q=0.8"), "hi");
  assert.equal(preferredLocale(undefined, "en-US;q=0.5,te;q=0.9"), "te");
  assert.equal(preferredLocale(undefined, "fr-FR,de;q=0.8"), "en");
  assert.equal(preferredLocale(undefined, "hi;q=0,te;q=0.1"), "te");
  assert.equal(preferredLocale(undefined, null), "en");
});

test("paths switch language and keep the rest of the route", () => {
  assert.equal(localizePath("hi", "/"), "/hi");
  assert.equal(localizePath("hi", "/grievance#track"), "/hi/grievance#track");
  assert.equal(switchLocalePath("/en", "te"), "/te");
  assert.equal(
    switchLocalePath("/hi/pension-help/ppo-help", "te"),
    "/te/pension-help/ppo-help",
  );
  assert.equal(switchLocalePath("/about/", "hi"), "/hi/about");
});

test("format fills placeholders and plural picks the locale's form", () => {
  assert.equal(format(en.workflow.reviewed, { count: 2, total: 5 }), "2 of 5 reviewed");
  assert.equal(format("{missing} stays", {}), "{missing} stays");
  assert.equal(plural("en", 1, en.centreSearch.found), "1 sample centre found");
  assert.equal(plural("en", 4, en.centreSearch.found), "4 sample centres found");
  assert.equal(plural("te", 2, te.centreSearch.found), "2 నమూనా కేంద్రాలు కనుగొనబడ్డాయి");
});

/** Every key path in a dictionary, with array lengths, e.g. "home.faqs[3]". */
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value))
    return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}.${i}`))];
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  return [path];
}

test("Hindi and Telugu match the English dictionary and have no empty text", () => {
  for (const [name, dict] of Object.entries({ hi, te })) {
    assert.deepEqual(shape(dict), shape(en), `${name} differs from en`);
    const empty = shape(dict).filter((key) => {
      const leaf = key.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], dict);
      return typeof leaf === "string" && !leaf.trim();
    });
    assert.deepEqual(empty, [], `${name} has empty strings`);
  }
});

test("every API error code has a translated message", () => {
  for (const dict of [en, hi, te])
    for (const code of apiErrorCodes) assert.ok(dict.errors[code], code);
});

test("centre search matches translated and English names", () => {
  const hindi = localizeCentres(hi, [en]);
  assert.deepEqual(filterCentres(hindi, "Pune").map((c) => c.id), ["demo-pune"]);
  assert.deepEqual(filterCentres(hindi, "पुणे").map((c) => c.id), ["demo-pune"]);
  assert.deepEqual(
    filterCentres(localizeCentres(en), "family pension").map((c) => c.id),
    ["demo-delhi", "demo-lucknow"],
  );
  assert.equal(filterCentres(hindi, "").length, 4);
});
