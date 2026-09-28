"use client";
import { useState } from "react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { Field, Notice } from "@/components/ui";
type RecordData = {
  ppo: string;
  name: string;
  branch: string;
  status: string;
  lifeCertificate: string;
};
export function PpoLookup() {
  const [ppo, setPpo] = useState("DEMO-PPO-12345");
  const [data, setData] = useState<RecordData | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <section className="panel mt-8">
      <h2 className="text-xl font-semibold">Explore a sample PPO record</h2>
      <p className="mt-2 mb-5 text-sm text-slate-600">
        This lookup uses mock data and never queries government systems.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setData(null);
          setBusy(true);
          try {
            setData(await apiRequest<RecordData>("/api/pension", { ppo }));
          } catch (e) {
            setError(errorMessage(e));
          } finally {
            setBusy(false);
          }
        }}
        className="space-y-4"
      >
        <Field label="Demo PPO reference" id="ppo">
          <input
            className="control"
            id="ppo"
            value={ppo}
            maxLength={40}
            onChange={(e) => setPpo(e.target.value)}
            required
          />
        </Field>
        <button className="btn" disabled={busy}>
          {busy ? "Looking up…" : "Look up sample record"}
        </button>
      </form>
      {error ? (
        <div className="mt-4">
          <Notice error>{error}</Notice>
        </div>
      ) : null}
      {data ? (
        <div className="mt-5">
          <Notice>
            <strong>
              {data.name} · {data.branch}
            </strong>
            <br />
            {data.status}
            <br />
            Life certificate: {data.lifeCertificate}
          </Notice>
        </div>
      ) : null}
    </section>
  );
}
