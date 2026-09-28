"use client";
import { useState } from "react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { DEMO_PPO, type PensionRecord } from "@/lib/demo-pension";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";
import { Field, Notice } from "@/components/ui";
export function PpoLookup() {
  const { t } = useI18n();
  const text = t.ppo;
  const [ppo, setPpo] = useState<string>(DEMO_PPO);
  const [data, setData] = useState<PensionRecord | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <section className="panel mt-8">
      <h2 className="text-xl font-semibold">{text.title}</h2>
      <p className="mt-2 mb-5 text-sm text-slate-600">{text.description}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setData(null);
          setBusy(true);
          try {
            setData(await apiRequest<PensionRecord>("/api/pension", { body: { ppo } }));
          } catch (e) {
            setError(errorMessage(e, t.errors));
          } finally {
            setBusy(false);
          }
        }}
        className="space-y-4"
      >
        <Field label={text.label} id="ppo">
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
          {busy ? text.busy : text.submit}
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
              {data.name} · {t.branches[data.branch]}
            </strong>
            <br />
            {text.recordStatuses[data.status]}
            <br />
            {format(text.lifeCertificate, {
              value: text.lifeCertificateStatuses[data.lifeCertificate],
            })}
          </Notice>
        </div>
      ) : null}
    </section>
  );
}
