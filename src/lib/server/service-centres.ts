import "server-only";
import dataset from "@/data/selected-offices.json";
import { createCentreSearch, toCentres } from "@/lib/service-centres";

// Only the three user-selected office groups are exposed by pages and the API.
// Keep this separate from the full SPARSH import so refreshes cannot expand it.
const centres = toCentres(dataset.centres);

export const centreDirectory = {
  source: dataset.source,
  retrievedAt: dataset.retrievedAt,
  total: centres.length,
  search: createCentreSearch(centres),
};
