"use client";
import { useState } from "react";
import Link from "next/link";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { Field, Notice } from "@/components/ui";
type Receipt = { reference: string; status: string; createdAt: string };
export function GrievanceForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  return (
    <section className="panel">
      <p className="eyebrow">Create a request</p>
      <h2 className="mt-3 text-2xl font-semibold">Tell us what happened</h2>
      <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">
        Use a fictional example. This saves a demo grievance to local MongoDB,
        without contacting any government office.
      </p>
      {receipt ? (
        <div className="space-y-5">
          <Notice>
            <strong>Demo grievance saved successfully.</strong>
            <br />
            Status: {receipt.status}
          </Notice>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">
              KEEP YOUR TRACKING REFERENCE
            </p>
            <p
              className="mt-2 break-all font-mono text-sm"
              data-testid="receipt-reference"
            >
              {receipt.reference}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              This reference gives access to the demo status. Keep a copy before
              leaving this page.
            </p>
          </div>
          <Link
            href={"/grievance?reference=" + receipt.reference + "#track"}
            className="btn"
          >
            Track this request
          </Link>
          <button
            className="block text-sm text-teal-800 underline"
            onClick={() => setReceipt(null)}
          >
            Create another demo request
          </button>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setBusy(true);
            setError("");
            try {
              setReceipt(
                await apiRequest<Receipt>("/api/grievances", {
                  category: data.get("category"),
                  subject: data.get("subject"),
                  description: data.get("description"),
                  demoConsent: data.get("demoConsent") === "on",
                }),
              );
            } catch (error) {
              setError(errorMessage(error));
            } finally {
              setBusy(false);
            }
          }}
        >
          <Field id="category" label="What is this about?">
            <select id="category" name="category" className="control">
              {[
                "Payment",
                "Family pension",
                "Life certificate",
                "PPO",
                "Other",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="subject" label="Short summary">
            <input
              id="subject"
              name="subject"
              className="control"
              placeholder="e.g. Sample pension payment delayed"
              minLength={5}
              maxLength={100}
              required
            />
          </Field>
          <Field
            id="description"
            label="Describe the sample issue"
            hint="20–1,500 characters. Do not include real names, phone numbers, PPO, Aadhaar or bank details."
          >
            <textarea
              id="description"
              name="description"
              className="control"
              rows={5}
              minLength={20}
              maxLength={1500}
              aria-describedby="description-hint"
              placeholder="Describe a fictional situation to try the grievance flow."
              required
            />
          </Field>
          <label className="flex items-start gap-3 text-sm leading-6">
            <input
              className="mt-1 size-4 shrink-0 accent-teal-700"
              type="checkbox"
              name="demoConsent"
              required
            />
            I confirm this contains fictional information only and understand
            this is not an official grievance.
          </label>
          {error ? <Notice error>{error}</Notice> : null}
          <button className="btn w-full" disabled={busy}>
            {busy ? "Saving…" : "Submit demo grievance"}
          </button>
        </form>
      )}
    </section>
  );
}
