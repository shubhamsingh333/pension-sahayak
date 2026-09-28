"use client";
import { useState } from "react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import type { GrievanceCategory, GrievanceStatus } from "@/lib/validation";
import { useI18n } from "@/i18n/client";
import { intlLocales } from "@/i18n/config";
import { format } from "@/i18n/format";
import { Field, Notice } from "@/components/ui";
type Status = {
  reference: string;
  status: GrievanceStatus;
  category: GrievanceCategory;
  createdAt: string;
};
export function Tracker({
  initialReference = "",
}: {
  initialReference?: string;
}) {
  const { locale, t } = useI18n();
  const text = t.tracker;
  const [reference, setReference] = useState(initialReference);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState<Status | null>(null);
  return (
    <section className="panel scroll-mt-6" id="track">
      <p className="eyebrow">{text.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold">{text.title}</h2>
      <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">
        {text.intro}
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
            setError(errorMessage(e, t.errors));
          } finally {
            setBusy(false);
          }
        }}
      >
        <Field label={text.label} id="tracking-reference">
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
          {busy ? text.busy : text.submit}
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
            <strong>
              {format(text.resultTitle, {
                status: t.grievanceStatuses[record.status],
              })}
            </strong>
            <br />
            {format(text.category, { category: t.categories[record.category] })}
            <br />
            {format(text.saved, {
              date: new Date(record.createdAt).toLocaleString(
                intlLocales[locale],
              ),
            })}
            <p className="mt-3">{text.resultNote}</p>
          </Notice>
        </div>
      ) : null}
      <p className="mt-5 text-xs leading-6 text-slate-500">{text.footnote}</p>
    </section>
  );
}
