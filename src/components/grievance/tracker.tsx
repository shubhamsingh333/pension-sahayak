"use client";
import { useState } from "react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { Field, Notice } from "@/components/ui";
type Status = {
  reference: string;
  status: string;
  category: string;
  createdAt: string;
};
export function Tracker({
  initialReference = "",
}: {
  initialReference?: string;
}) {
  const [reference, setReference] = useState(initialReference);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState<Status | null>(null);
  return (
    <section className="panel scroll-mt-6" id="track">
      <p className="eyebrow">Already have a reference?</p>
      <h2 className="mt-3 text-2xl font-semibold">Track your request</h2>
      <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">
        Enter the tracking reference from a locally saved demo grievance.
      </p>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          setRecord(null);
          try {
            setRecord(
              await apiRequest<Status>(
                "/api/grievances/" +
                  encodeURIComponent(reference.trim().toUpperCase()),
              ),
            );
          } catch (e) {
            setError(errorMessage(e));
          } finally {
            setBusy(false);
          }
        }}
      >
        <Field label="Tracking reference" id="tracking-reference">
          <input
            id="tracking-reference"
            className="control font-mono text-sm"
            placeholder="PS-…"
            maxLength={35}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </Field>
        <button className="btn btn-outline w-full" disabled={busy}>
          {busy ? "Checking…" : "Check status"}
        </button>
      </form>
      {error ? (
        <div className="mt-5">
          <Notice error>{error}</Notice>
        </div>
      ) : null}
      {record ? (
        <div className="mt-5">
          <Notice>
            <strong>{record.status} · Demo request</strong>
            <br />
            Category: {record.category}
            <br />
            Saved: {new Date(record.createdAt).toLocaleString()}
            <p className="mt-3">
              Your request is stored locally. There is no official processing or
              automatic status progression in this demo.
            </p>
          </Notice>
        </div>
      ) : null}
      <p className="mt-5 text-xs leading-6 text-slate-500">
        No tracking reference? Create a demo request first. Lost references
        cannot be recovered through this prototype.
      </p>
    </section>
  );
}
