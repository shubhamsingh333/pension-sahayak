import type { Dictionary } from "./en";
export type { Dictionary };

/**
 * Namespaces used by Client Components. Only these are sent to the browser;
 * page copy rendered by Server Components never ships as JavaScript.
 */
const clientNamespaces = [
  "topBar",
  "branches",
  "statuses",
  "checklist",
  "workflow",
  "ppo",
  "grievanceForm",
  "tracker",
  "categories",
  "grievanceStatuses",
  "centreSearch",
  "errorPage",
  "errors",
] as const satisfies readonly (keyof Dictionary)[];

export type ClientMessages = Pick<Dictionary, (typeof clientNamespaces)[number]>;

export function pickClientMessages(t: Dictionary): ClientMessages {
  return Object.fromEntries(
    clientNamespaces.map((key) => [key, t[key]]),
  ) as ClientMessages;
}
