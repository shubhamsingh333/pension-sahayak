import type { ReactNode } from "react";
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      role={error ? "alert" : "status"}
      className={error ? "notice notice-error" : "notice"}
    >
      {children}
    </div>
  );
}
export function Field({
  label,
  id,
  children,
  hint,
}: {
  label: string;
  id: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-sm" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? (
        <p id={id + "-hint"} className="text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
