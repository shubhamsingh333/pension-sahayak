"use client";
import { useState } from "react";
import { MapPin, Clock, Search } from "lucide-react";
import { filterCentres, type SearchableCentre } from "@/lib/centres";
import { useI18n } from "@/i18n/client";
import { plural } from "@/i18n/format";
export function CentreSearch({ centres }: { centres: SearchableCentre[] }) {
  const { locale, t } = useI18n();
  const text = t.centreSearch;
  const [query, setQuery] = useState("");
  const filtered = filterCentres(centres, query);
  return (
    <>
      <label
        htmlFor="centre-search"
        className="mb-2 block text-sm font-semibold"
      >
        {text.label}
      </label>
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-4 text-slate-400" size={20} />
        <input
          id="centre-search"
          className="control pl-12!"
          placeholder={text.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          maxLength={80}
        />
      </div>
      <p aria-live="polite" className="my-6 text-sm text-slate-500">
        {plural(locale, filtered.length, text.found)} · {text.fictional}
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((c) => (
          <article className="panel" key={c.id}>
            <div className="flex justify-between items-center">
              <span className="icon-tile">
                <MapPin size={23} />
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                {text.badge}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">{c.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{c.address}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Clock size={15} />
              {c.hours}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.services.map((s) => (
                <span
                  key={s}
                  className="rounded bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
              {text.disclaimer}
            </p>
          </article>
        ))}
      </div>
      {!filtered.length ? (
        <div className="panel">
          <p>{text.empty}</p>
          <button className="btn btn-outline mt-4" onClick={() => setQuery("")}>
            {text.clear}
          </button>
        </div>
      ) : null}
    </>
  );
}
