"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Download, Check } from "lucide-react";
import {
  branches,
  statuses,
  makeChecklist,
  type Workflow,
} from "@/lib/workflows";
import { Field, Notice } from "@/components/ui";
export function WorkflowGuide({ workflow }: { workflow: Workflow }) {
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState<string>(branches[0]);
  const [status, setStatus] = useState<string>(statuses[0]);
  const [checked, setChecked] = useState<string[]>([]);
  const checklist = makeChecklist(workflow, branch, status);
  function download() {
    const text = [
      "PENSION SAHAYAK · DAD DAY DEMO",
      workflow.title,
      branch + " · " + status,
      "Illustrative checklist only. Confirm actual requirements with the authorised provider.",
      "",
      ...checklist.map(
        (item) => (checked.includes(item) ? "[x] " : "[ ] ") + item,
      ),
      "",
      ...workflow.steps,
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = workflow.slug + "-demo-checklist.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="grid items-start gap-7 lg:grid-cols-[1fr_290px]">
      <div className="panel">
        <ol
          aria-label="Journey progress"
          className="mb-8 grid grid-cols-3 gap-2"
        >
          {["Your situation", "Your checklist", "Next steps"].map(
            (label, i) => (
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
            ),
          )}
        </ol>
        {step === 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Tell us a little about the situation
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              These choices tailor your sample checklist. They do not verify
              eligibility.
            </p>
            <Field id="branch" label="Service branch">
              <select
                id="branch"
                className="control"
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  setChecked([]);
                }}
              >
                {branches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field id="status" label="Current pension status">
              <select
                id="status"
                className="control"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setChecked([]);
                }}
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
        ) : step === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold">
              Your preparation checklist
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {branch} · {status}. Tick items as you review them.
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
              {checked.length} of {checklist.length} reviewed
            </p>
            <p className="mt-3 text-xs text-slate-500">
              No documents are uploaded or stored. You can continue even if some
              items are unavailable.
            </p>
          </div>
        ) : (
          <div>
            <span className="icon-tile">
              <Check />
            </span>
            <h2 className="mt-4 text-2xl font-semibold">
              You have a clearer next step.
            </h2>
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
                <Download size={17} /> Download checklist
              </button>
              <Link className="btn btn-outline" href="/grievance">
                Create a demo grievance
              </Link>
            </div>
            <Link
              href="/service-centre"
              className="mt-5 inline-block text-sm font-semibold text-teal-800 underline"
            >
              Explore sample service centres
            </Link>
          </div>
        )}
        <div className="mt-8 flex justify-between gap-4 border-t border-slate-200 pt-5">
          {step > 0 ? (
            <button
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <button className="btn" onClick={() => setStep(step + 1)}>
              {step === 0 ? "Build my checklist" : "See next steps"}
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
              Start again
            </button>
          )}
        </div>
      </div>
      <aside className="space-y-5">
        <Notice>
          <strong>Take your time.</strong>
          <br />
          You don’t need to have every answer. Start with what you know and keep
          the checklist for later.
        </Notice>
        <div className="panel">
          <h2 className="font-semibold">A safe place to explore</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This is a demo. Use fictional references only. Actual documents,
            eligibility and processes must be confirmed with the relevant
            authority.
          </p>
        </div>
      </aside>
    </div>
  );
}
