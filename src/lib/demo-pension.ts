import type { Branch } from "./workflows";

export const DEMO_PPO = "DEMO-PPO-12345";

/** Mock record returned by POST /api/pension. Status fields are codes the UI translates. */
export const demoPensionRecord = {
  ppo: DEMO_PPO,
  name: "Sample Pensioner",
  branch: "army" satisfies Branch,
  status: "active",
  lifeCertificate: "acknowledged",
  demo: true,
} as const;
export type PensionRecord = typeof demoPensionRecord;
