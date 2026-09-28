import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import dataset from "../src/data/selected-offices.json";
import { createCentreSearch, toCentres } from "../src/lib/service-centres";

const search = createCentreSearch(toCentres(dataset.centres));
const find = (q = "", type: "all" | "defence" | "bank" = "all", offset = 0) =>
  search({ q, type, offset });

test("backend uses only the selected office directory", () => {
  const backend = readFileSync(new URL("../src/lib/server/service-centres.ts", import.meta.url), "utf8");
  assert.match(backend, /@\/data\/selected-offices\.json/);
  assert.doesNotMatch(backend, /@\/data\/service-centres\.json/);
  assert.equal(find().total, 3);
  assert.deepEqual(find().centres.map((c) => c.district), ["Prayagraj", "Pune", "New Delhi"]);
  assert.equal(find("", "defence").total, 3);
  assert.equal(find("", "bank").total, 0);
  assert.equal(find("Mumbai").total, 0);
  assert.deepEqual(find("", "all", 3).centres, []);
});

test("selected offices are searchable by city, aliases and both office addresses", () => {
  for (const query of ["Prayagraj", "Allahabad", "Pune", "Poona", "New Delhi", "211014", "411001", "110001", "110066", "Southern Command", "Delhi R&D"]) {
    assert.equal(find(query).total, 1, query);
  }
  assert.equal(find("Prayagraj").centres[0].phone, "18001805325");
});

