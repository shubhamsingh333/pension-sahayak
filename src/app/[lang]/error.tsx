"use client";
import { useI18n } from "@/i18n/client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const { t } = useI18n();
  return (
    <div className="shell py-20">
      <h1 className="page-title">{t.errorPage.title}</h1>
      <p className="my-5 text-slate-600">{t.errorPage.body}</p>
      <button className="btn" onClick={reset}>
        {t.errorPage.retry}
      </button>
    </div>
  );
}
