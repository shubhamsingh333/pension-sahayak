import { z } from "zod";
export const grievanceSchema = z
  .object({
    category: z.enum([
      "Payment",
      "Family pension",
      "Life certificate",
      "PPO",
      "Other",
    ]),
    subject: z
      .string()
      .trim()
      .min(5, "Use at least 5 characters for the subject.")
      .max(100),
    description: z
      .string()
      .trim()
      .min(20, "Describe the issue in at least 20 characters.")
      .max(1500),
    demoConsent: z.literal(true, {
      error: "Please confirm that you are using fictional information.",
    }),
  })
  .strict();
export type GrievanceInput = z.infer<typeof grievanceSchema>;
export const trackingSchema = z
  .string()
  .regex(/^PS-[A-F0-9]{32}$/, "Enter a valid tracking reference.");
export const ppoSchema = z
  .object({
    ppo: z
      .string()
      .trim()
      .max(40)
      .regex(
        /^DEMO-PPO-\d{5}$/,
        "Use a demo reference such as DEMO-PPO-12345.",
      ),
  })
  .strict();
