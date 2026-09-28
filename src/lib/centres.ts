/** Language-neutral, fictional directory. Display text lives in the dictionaries. */
export const centres = [
  { id: "demo-delhi", services: ["ppo", "family-pension"] },
  { id: "demo-pune", services: ["payment", "life-certificate"] },
  { id: "demo-lucknow", services: ["family-pension", "life-certificate"] },
  { id: "demo-bengaluru", services: ["ppo", "payment"] },
] as const;
export type CentreId = (typeof centres)[number]["id"];
export type CentreService = (typeof centres)[number]["services"][number];

export interface CentreMessages {
  centres: Record<CentreId, { city: string; name: string; address: string }>;
  centreServices: Record<CentreService, string>;
  centreHours: string;
}

export interface Centre {
  id: CentreId;
  city: string;
  name: string;
  address: string;
  services: string[];
  hours: string;
}

export type SearchableCentre = Centre & { searchText: string };

const normalize = (text: string) => text.normalize("NFC").trim().toLowerCase();

/**
 * Builds display-ready centres. `alsoSearch` adds other languages' city and
 * service names, so "Pune" still matches on the Hindi or Telugu page.
 */
export function localizeCentres(
  t: CentreMessages,
  alsoSearch: CentreMessages[] = [],
): SearchableCentre[] {
  return centres.map(({ id, services }) => ({
    id,
    ...t.centres[id],
    services: services.map((s) => t.centreServices[s]),
    hours: t.centreHours,
    searchText: normalize(
      [t, ...alsoSearch]
        .flatMap((m) => [m.centres[id].city, ...services.map((s) => m.centreServices[s])])
        .join(" "),
    ),
  }));
}

export function filterCentres<T extends SearchableCentre>(list: T[], query: string) {
  const q = normalize(query);
  return q ? list.filter((c) => c.searchText.includes(q)) : list;
}
