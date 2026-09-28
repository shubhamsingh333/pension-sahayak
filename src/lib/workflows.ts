import { format } from "@/i18n/format";

/** Language-neutral workflow structure. Display text lives in the dictionaries. */
export const workflows = [
  { slug: "family-pension", icon: "heart" },
  { slug: "pension-not-received", icon: "wallet" },
  { slug: "life-certificate", icon: "check" },
  { slug: "ppo-help", icon: "file" },
  { slug: "update-details", icon: "user" },
] as const;
export type WorkflowSlug = (typeof workflows)[number]["slug"];
export type WorkflowIcon = (typeof workflows)[number]["icon"];

export interface WorkflowContent {
  title: string;
  description: string;
  tag: string;
  documents: string[];
  steps: string[];
}

export const branches = [
  "army",
  "navy",
  "air-force",
  "defence-civilian",
] as const;
export type Branch = (typeof branches)[number];

export const statuses = ["receiving", "not-started", "not-sure"] as const;
export type PensionStatus = (typeof statuses)[number];

export interface ChecklistText {
  branchReference: string;
  statusItems: Record<PensionStatus, string>;
}

export function isWorkflowSlug(value: string): value is WorkflowSlug {
  return workflows.some((w) => w.slug === value);
}

export function makeChecklist(
  documents: readonly string[],
  branchLabel: string,
  status: PensionStatus,
  text: ChecklistText,
) {
  return [
    ...documents,
    format(text.branchReference, { branch: branchLabel }),
    text.statusItems[status],
  ];
}
