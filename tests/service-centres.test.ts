import test from "node:test";
import assert from "node:assert/strict";
import dataset from "../src/data/service-centres.json";
import {
  CENTRES_PAGE_SIZE,
  centreQuerySchema,
  createCentreSearch,
  toCentres,
} from "../src/lib/service-centres";

const centres = toCentres(dataset.centres);
const search = createCentreSearch(centres);
const find = (q: string, type: "all" | "defence" | "bank" = "all", offset = 0) =>
  search({ q, type, offset });

test("dataset is the cleaned SPARSH list without personal names", () => {
  assert.match(dataset.source, /^https:\/\/sparsh\.defencepension\.gov\.in\//);
  assert.match(dataset.retrievedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(centres.length > 1000);
  assert.ok(centres.some((c) => c.type === "defence"));
  for (const row of dataset.centres) {
    assert.ok(row.name && row.address && row.state, JSON.stringify(row));
    assert.ok(!("contactPerson" in row), "contact person names must not be stored");
    assert.ok(!/^DAD\b/i.test(row.name), "the DAD prefix is removed from names");
  }
  assert.ok(!centres.some((c) => /\\n|\uFFFD/.test(c.state + c.address)));
});

test("empty search lists Defence Accounts offices first, one page at a time", () => {
  const page = find("");
  assert.equal(page.total, centres.length);
  assert.equal(page.centres.length, CENTRES_PAGE_SIZE);
  assert.equal(page.centres[0].type, "defence");
  assert.deepEqual(
    find("", "all", CENTRES_PAGE_SIZE).centres[0],
    centres[CENTRES_PAGE_SIZE],
  );
});

test("search matches every word, filters by type and finds PIN codes", () => {
  const defencePune = find("pune", "defence");
  assert.ok(defencePune.centres.some((c) => c.name === "PCDA O Pune"));
  assert.ok(defencePune.centres.every((c) => c.type === "defence"));
  assert.ok(find("pune", "bank").centres.every((c) => c.type === "bank"));
  const pin = find("411001");
  assert.ok(pin.total > 0);
  assert.ok(pin.centres.every((c) => (c.name + c.address + c.pincode).includes("411001")));
  assert.equal(find("pune zzzz-no-such-place").total, 0);
});

test("centres in the searched place rank above address-only matches", () => {
  const banks = find("pune", "bank").centres;
  const firstElsewhere = banks.findIndex((c) => !/pune/i.test(c.district + c.state));
  const lastInPune = banks.findLastIndex((c) => /pune/i.test(c.district + c.state));
  assert.ok(banks.length > 0 && /pune/i.test(banks[0].district));
  assert.ok(firstElsewhere === -1 || firstElsewhere > lastInPune);
});

test("old city names still match", () => {
  const names = (q: string) => find(q, "defence").centres.map((c) => c.name);
  assert.ok(names("bangalore").includes("SSC BANGALORE"));
  assert.deepEqual(names("bengaluru"), names("bangalore"));
  assert.ok(find("allahabad", "defence").total >= find("prayagraj", "defence").total);
});

test("query parameters are validated with safe defaults", () => {
  assert.deepEqual(centreQuerySchema.parse({}), { q: "", type: "all", offset: 0 });
  assert.equal(centreQuerySchema.parse({ offset: "48" }).offset, 48);
  assert.equal(centreQuerySchema.safeParse({ type: "hotel" }).success, false);
  assert.equal(centreQuerySchema.safeParse({ q: "x".repeat(81) }).success, false);
  assert.equal(centreQuerySchema.safeParse({ offset: "-1" }).success, false);
});
