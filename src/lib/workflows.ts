export const services = [
  {
    slug: "family-pension",
    title: "Family pension",
    description:
      "Support after the loss of a pensioner. Find your next steps, at your pace.",
    tag: "Guided support",
    icon: "heart",
    documents: [
      "Sample death certificate reference",
      "Sample family relationship record",
      "Existing demo PPO reference",
    ],
    steps: [
      "Review the family pension details recorded in the PPO.",
      "Prepare the illustrative documents below.",
      "Ask the relevant pension authority to confirm eligibility and its current process.",
    ],
  },
  {
    slug: "pension-not-received",
    title: "Pension not received",
    description:
      "Work through a missed payment with a simple, guided checklist.",
    tag: "Payment support",
    icon: "wallet",
    documents: [
      "Sample pension payment month",
      "Redacted sample bank statement",
      "Demo PPO reference",
    ],
    steps: [
      "Check the expected payment month and sample bank entry.",
      "Check whether a life certificate acknowledgement is available.",
      "Prepare a demo grievance with the payment month and issue.",
    ],
  },
  {
    slug: "life-certificate",
    title: "Life certificate",
    description:
      "Understand the preparation steps for your next life certificate.",
    tag: "Annual support",
    icon: "check",
    documents: ["Sample PPO reference", "Sample previous acknowledgement"],
    steps: [
      "Review the recorded life certificate status.",
      "Ask the authorised provider about accepted submission options.",
      "Keep the acknowledgement after completing the official process.",
    ],
  },
  {
    slug: "ppo-help",
    title: "PPO / e-PPO help",
    description:
      "Explore a sample pension record and understand what to check.",
    tag: "Pension records",
    icon: "file",
    documents: ["Demo PPO reference", "Sample service details"],
    steps: [
      "Try the sample lookup using DEMO-PPO-12345.",
      "Review the service and sample pension status.",
      "Contact the issuing authority for any actual correction or copy.",
    ],
  },
  {
    slug: "update-details",
    title: "Update your details",
    description: "Prepare for a change to bank or personal information.",
    tag: "Profile support",
    icon: "user",
    documents: [
      "Sample details to change",
      "Redacted sample supporting document",
    ],
    steps: [
      "Identify the information that needs updating.",
      "Confirm the authorised channel and supporting documents.",
      "Keep the acknowledgement and check the official record later.",
    ],
  },
] as const;
export type Workflow = (typeof services)[number];
export const branches = [
  "Army",
  "Navy",
  "Air Force",
  "Defence Civilian",
] as const;
export const statuses = [
  "Receiving pension",
  "Pension not started",
  "Not sure",
] as const;
export function makeChecklist(
  workflow: Workflow,
  branch: string,
  status: string,
) {
  return [
    ...workflow.documents,
    branch + " service reference (sample)",
    ...(status === "Pension not started"
      ? ["Sample sanction / application acknowledgement"]
      : status === "Not sure"
        ? ["Any sample pension correspondence available"]
        : ["Sample recent pension credit reference"]),
  ];
}
