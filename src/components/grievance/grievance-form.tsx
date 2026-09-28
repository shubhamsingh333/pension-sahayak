"use client";
import { useState } from "react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { grievanceCategories, type GrievanceStatus } from "@/lib/validation";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";
import { LocalizedLink as Link } from "@/components/localized-link";
import { Field, Notice } from "@/components/ui";
type Receipt = { reference: string; status: GrievanceStatus; createdAt: string };
export function GrievanceForm() {
  const { t } = useI18n();
  const text = t.grievanceForm;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  return (
    <section className="panel">
      <p className="eyebrow">{text.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold">{text.title}</h2>
      <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">
        {text.intro}
      </p>
      {receipt ? (
        <div className="space-y-5">
          <Notice>
            <strong>{text.savedTitle}</strong>
            <br />
            {format(text.statusLine, {
              status: t.grievanceStatuses[receipt.status],
            })}
          </Notice>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">
              {text.keepReference}
            </p>
            <p
              className="mt-2 break-all font-mono text-sm"
              data-testid="receipt-reference"
            >
              {receipt.reference}
            </p>
            <p className="mt-3 text-xs text-slate-500">{text.referenceHint}</p>
          </div>
          <Link
            href={"/grievance?reference=" + receipt.reference + "#track"}
            className="btn"
          >
            {text.trackThis}
          </Link>
          <button
            className="block text-sm text-teal-800 underline"
            onClick={() => setReceipt(null)}
          >
            {text.createAnother}
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
                  body: {
                    category: data.get("category"),
                    subject: data.get("subject"),
                    description: data.get("description"),
                    demoConsent: data.get("demoConsent") === "on",
                  },
                }),
              );
            } catch (error) {
              setError(errorMessage(error, t.errors));
            } finally {
              setBusy(false);
            }
          }}
        >
          <Field id="category" label={text.categoryLabel}>
            <select id="category" name="category" className="control">
              {grievanceCategories.map((c) => (
                <option key={c} value={c}>
                  {t.categories[c]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="subject" label={text.subjectLabel}>
            <input
              id="subject"
              name="subject"
              className="control"
              placeholder={text.subjectPlaceholder}
              minLength={5}
              maxLength={100}
              required
            />
          </Field>
          <Field
            id="description"
            label={text.descriptionLabel}
            hint={text.descriptionHint}
          >
            <textarea
              id="description"
              name="description"
              className="control"
              rows={5}
              minLength={20}
              maxLength={1500}
              aria-describedby="description-hint"
              placeholder={text.descriptionPlaceholder}
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
            {text.consent}
          </label>
          {error ? <Notice error>{error}</Notice> : null}
          <button className="btn w-full" disabled={busy}>
            {busy ? text.busy : text.submit}
          </button>
        </form>
      )}
    </section>
  );
}
