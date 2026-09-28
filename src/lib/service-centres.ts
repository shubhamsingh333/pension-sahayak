import { z } from "zod";

export const centreFilters = ["all", "defence", "bank"] as const;
export type CentreFilter = (typeof centreFilters)[number];
export type CentreType = Exclude<CentreFilter, "all">;

/** One row of the official SPARSH service-centre list, as published. */
export interface ServiceCentre {
  id: number;
  type: CentreType;
  name: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
}

/** A row as stored in src/data/service-centres.json (see scripts/update-service-centres.mjs). */
export type CentreRow = Omit<ServiceCentre, "id" | "type"> & { type: string };

export function toCentres(rows: CentreRow[]): ServiceCentre[] {
  return rows.map((row, id) => ({
    ...row,
    id,
    type: row.type === "defence" ? "defence" : "bank",
  }));
}

export interface CentrePage {
  total: number;
  centres: ServiceCentre[];
}

export const CENTRES_PAGE_SIZE = 24;

export const centreQuerySchema = z.object({
  q: z.string().trim().max(80).default(""),
  type: z.enum(centreFilters).default("all"),
  offset: z.coerce.number().int().min(0).max(100_000).default(0),
});
export type CentreQuery = z.infer<typeof centreQuerySchema>;

/** Older or alternative city names people still search with. */
const aliases: Record<string, string[]> = {
  bangalore: ["bengaluru"],
  bengaluru: ["bangalore"],
  allahabad: ["prayagraj"],
  prayagraj: ["allahabad"],
  gurgaon: ["gurugram"],
  gurugram: ["gurgaon"],
  bombay: ["mumbai"],
  calcutta: ["kolkata"],
  madras: ["chennai"],
  poona: ["pune"],
  mysore: ["mysuru"],
  mysuru: ["mysore"],
  trivandrum: ["thiruvananthapuram"],
  cochin: ["kochi"],
  baroda: ["vadodara"],
};

const normalize = (text: string) =>
  text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

/**
 * Builds a search over the directory. Every word must match somewhere in the
 * name, address, district, state or PIN code. Defence Accounts offices come first, and
 * centres located in the searched place rank above address-only matches.
 */
export function createCentreSearch(centres: ServiceCentre[]) {
  const text = centres.map((c) =>
    normalize([c.name, c.address, c.district, c.state, c.pincode].join(" ")),
  );
  const place = centres.map((c) =>
    normalize([c.district, c.state, c.pincode].join(" ")),
  );
  return function search({ q, type, offset }: CentreQuery): CentrePage {
    const terms = normalize(q)
      .split(" ")
      .filter(Boolean)
      .map((term) => [term, ...(aliases[term] ?? [])]);
    const matchAll = (field: string[], i: number) =>
      terms.every((options) => options.some((t) => field[i].includes(t)));
    const hits: { i: number; rank: number }[] = [];
    centres.forEach((c, i) => {
      if ((type === "all" || c.type === type) && matchAll(text, i))
        hits.push({
          i,
          rank: (c.type === "defence" ? 0 : 2) + (matchAll(place, i) ? 0 : 1),
        });
    });
    hits.sort((a, b) => a.rank - b.rank); // stable: keeps list order within a rank
    return {
      total: hits.length,
      centres: hits
        .slice(offset, offset + CENTRES_PAGE_SIZE)
        .map(({ i }) => centres[i]),
    };
  };
}

export function mapsUrl(c: ServiceCentre) {
  const place = `${c.name}, ${c.address}, ${c.district}, ${c.state} ${c.pincode}`;
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(place)
  );
}
