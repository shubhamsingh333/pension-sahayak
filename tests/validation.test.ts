import test from "node:test";
import assert from "node:assert/strict";
import {
  grievanceSchema,
  ppoSchema,
  trackingSchema,
} from "../src/lib/validation";
import { services, makeChecklist } from "../src/lib/workflows";
const valid = {
  category: "Payment",
  subject: "Sample missed payment",
  description: "This is a fictional pension payment issue.",
  demoConsent: true,
};
test("grievance requires meaningful description and explicit demo consent", () => {
  assert.equal(grievanceSchema.safeParse(valid).success, true);
  assert.equal(
    grievanceSchema.safeParse({ ...valid, demoConsent: false }).success,
    false,
  );
  assert.equal(
    grievanceSchema.safeParse({ ...valid, description: "short" }).success,
    false,
  );
  assert.equal(
    grievanceSchema.safeParse({ ...valid, category: "Injected" }).success,
    false,
  );
  assert.equal(
    grievanceSchema.safeParse({ ...valid, subject: { $ne: null } }).success,
    false,
  );
});
test("PPO lookup accepts only demo-shaped references", () => {
  assert.equal(ppoSchema.safeParse({ ppo: "DEMO-PPO-12345" }).success, true);
  assert.equal(ppoSchema.safeParse({ ppo: "REAL-12345" }).success, false);
});
test("tracking rejects malformed and query-like references", () => {
  assert.equal(trackingSchema.safeParse("PS-" + "A".repeat(32)).success, true);
  assert.equal(trackingSchema.safeParse('{"$ne":null}').success, false);
});
test("checklist adapts to service and pension status", () => {
  const items = makeChecklist(services[0], "Navy", "Pension not started");
  assert(items.includes("Navy service reference (sample)"));
  assert(items.includes("Sample sanction / application acknowledgement"));
  assert(!items.includes("Sample recent pension credit reference"));
});
