"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Download, Check } from "lucide-react";
import {
  branches,
  statuses,
  makeChecklist,
  type Branch,
  type PensionStatus,
  type WorkflowContent,
  type WorkflowSlug,
} from "@/lib/workflows";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";
import { LocalizedLink as Link } from "@/components/localized-link";
import { Field, Notice } from "@/components/ui";
export function WorkflowGuide({
  slug,
  workflow,
}: {
  slug: WorkflowSlug;
  workflow: WorkflowContent;
}) {
  const { t } = useI18n();
  const text = t.workflow;
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState<Branch>(branches[0]);
  const [status, setStatus] = useState<PensionStatus>(statuses[0]);
  const [checked, setChecked] = useState<string[]>([]);
  const branchLabel = t.branches[branch];
  const statusLabel = t.statuses[status];
  const checklist = makeChecklist(
    workflow.documents,
    branchLabel,
    status,
    t.checklist,
  );
  function download() {
    const lines = [
      text.fileHeader,
      workflow.title,
      branchLabel + " · " + statusLabel,
      text.fileDisclaimer,
      "",
      ...checklist.map(
        (item) => (checked.includes(item) ? "[x] " : "[ ] ") + item,
      ),
      "",
      ...workflow.steps,
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([lines], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = slug + "-demo-checklist.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="grid items-start gap-7 lg:grid-cols-[1fr_290px]">
      <div className="panel">
        <ol
          aria-label={text.progressLabel}
          className="mb-8 grid grid-cols-3 gap-2"
        >
          {text.stepLabels.map((label, i) => (
            <li
              key={label}
              aria-current={step === i ? "step" : undefined}
              className={
                "border-b-2 pb-3 text-xs sm:text-sm " +
                (i <= step
                  ? "border-teal-700 font-semibold text-teal-800"
                  : "border-slate-200 text-slate-400")
              }
            >
              <span className="mr-2">{i + 1}.</span>
              {label}
            </li>
          ))}
        </ol>
        {step === 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">{text.situationTitle}</h2>
            <p className="text-sm leading-6 text-slate-600">
              {text.situationHint}
            </p>
            <Field id="branch" label={text.branchLabel}>
              <select
                id="branch"
                className="control"
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value as Branch);
                  setChecked([]);
                }}
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {t.branches[b]}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="status" label={text.statusLabel}>
              <select
                id="status"
                className="control"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as PensionStatus);
                  setChecked([]);
                }}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {t.statuses[s]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : step === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold">{text.checklistTitle}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {format(text.checklistHint, {
                branch: branchLabel,
                status: statusLabel,
              })}
            </p>
            <div className="my-6 space-y-3">
              {checklist.map((item, i) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 text-sm leading-6"
                >
                  <input
                    type="checkbox"
                    className="mt-1 size-4 accent-teal-700"
                    checked={checked.includes(item)}
                    onChange={(e) =>
                      setChecked((prev) =>
                        e.target.checked
                          ? [...prev, item]
                          : prev.filter((x) => x !== item),
                      )
                    }
                    aria-label={item}
                  />
                  <span>
                    {i + 1}. {item}
                  </span>
                </label>
              ))}
            </div>
            <p
              className="text-sm font-semibold text-teal-800"
              aria-live="polite"
            >
              {format(text.reviewed, {
                count: checked.length,
                total: checklist.length,
              })}
            </p>
            <p className="mt-3 text-xs text-slate-500">{text.noUpload}</p>
          </div>
        ) : (
          <div>
            <span className="icon-tile">
              <Check />
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{text.doneTitle}</h2>
            <ol className="my-6 space-y-4">
              {workflow.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm leading-6">
                  <span className="font-bold text-teal-700">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn" onClick={download}>
                <Download size={17} /> {text.download}
              </button>
              <Link className="btn btn-outline" href="/grievance">
                {text.createGrievance}
              </Link>
            </div>
            <Link
              href="/service-centre"
              className="mt-5 inline-block text-sm font-semibold text-teal-800 underline"
            >
              {text.exploreCentres}
            </Link>
          </div>
        )}
        <div className="mt-8 flex justify-between gap-4 border-t border-slate-200 pt-5">
          {step > 0 ? (
            <button
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} /> {text.back}
            </button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <button className="btn" onClick={() => setStep(step + 1)}>
              {step === 0 ? text.buildChecklist : text.seeNextSteps}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="btn btn-outline"
              onClick={() => {
                setStep(0);
                setChecked([]);
              }}
            >
              {text.startAgain}
            </button>
          )}
        </div>
      </div>
      <aside className="space-y-5">
        <Notice>
          <strong>{text.takeYourTime}</strong>
          <br />
          {text.takeYourTimeBody}
        </Notice>
        <div className="panel">
          <h2 className="font-semibold">{text.safeTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {text.safeBody}
          </p>
        </div>
      </aside>
    </div>
  );
}
