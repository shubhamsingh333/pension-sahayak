"use client";
import { useRef, useState } from "react";
import { MapPin, Phone, Search, ExternalLink } from "lucide-react";
import { apiRequest, errorMessage } from "@/lib/client-api";
import {
  centreFilters,
  mapsUrl,
  type CentreFilter,
  type CentrePage,
} from "@/lib/service-centres";
import { useI18n } from "@/i18n/client";
import { format, plural } from "@/i18n/format";
import { Notice } from "@/components/ui";

type Params = { q: string; type: CentreFilter };

function fetchPage({ q, type }: Params, offset: number, signal: AbortSignal) {
  const query = new URLSearchParams({ q, type, offset: String(offset) });
  return apiRequest<CentrePage>("/api/service-centres?" + query, { signal });
}

export function CentreSearch({
  initial,
  source,
}: {
  /** First page for an empty search, rendered on the server. */
  initial: CentrePage;
  source: { url: string; updated: string };
}) {
  const { locale, t } = useI18n();
  const text = t.centreSearch;
  const [params, setParams] = useState<Params>({ q: "", type: "all" });
  const [page, setPage] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef<{ timer?: number; controller?: AbortController }>({});

  /** Loads results for `next`, cancelling any request still in flight. */
  function load(next: Params, offset: number, delay: number) {
    window.clearTimeout(pending.current.timer);
    pending.current.controller?.abort();
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchPage(next, offset, controller.signal);
        setPage((prev) =>
          offset
            ? { total: result.total, centres: [...prev.centres, ...result.centres] }
            : result,
        );
      } catch (e) {
        if (!controller.signal.aborted) setError(errorMessage(e, t.errors));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, delay);
    pending.current = { timer, controller };
  }

  function update(next: Params) {
    setParams(next);
    if (next.q.trim() === "" && next.type === "all") {
      // Back to the default view: reuse the server-rendered page.
      window.clearTimeout(pending.current.timer);
      pending.current.controller?.abort();
      setPage(initial);
      setLoading(false);
      setError("");
    } else load(next, 0, 250);
  }

  const shown = page.centres.length;
  return (
    <>
      <label htmlFor="centre-search" className="mb-2 block text-sm font-semibold">
        {text.label}
      </label>
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-4 text-slate-400" size={20} />
        <input
          id="centre-search"
          type="search"
          className="control pl-12!"
          placeholder={text.placeholder}
          value={params.q}
          onChange={(e) => update({ ...params, q: e.target.value })}
          maxLength={80}
          aria-describedby="centre-search-hint"
        />
      </div>
      <p id="centre-search-hint" className="mt-2 text-sm text-slate-500">
        {text.hint}
      </p>
      <div
        role="group"
        aria-label={text.filterLabel}
        className="mt-5 flex flex-wrap gap-2"
      >
        {centreFilters.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={params.type === type}
            onClick={() => update({ ...params, type })}
            className={
              "rounded-full border px-4 py-2 text-sm font-semibold " +
              (params.type === type
                ? "border-teal-800 bg-teal-800 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100")
            }
          >
            {text.filters[type]}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="my-6 text-sm text-slate-500">
        {loading
          ? text.searching
          : plural(locale, page.total, text.found) +
            (shown < page.total ? " · " + format(text.showing, { shown }) : "")}
      </p>
      {error ? (
        <div className="mb-6">
          <Notice error>{error}</Notice>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        {page.centres.map((c) => (
          <article className="panel" key={c.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="icon-tile">
                <MapPin size={23} />
              </span>
              <span
                className={
                  "rounded-full px-3 py-1 text-xs font-semibold " +
                  (c.type === "defence"
                    ? "bg-teal-50 text-teal-800"
                    : "bg-amber-50 text-amber-800")
                }
              >
                {text.badges[c.type]}
              </span>
            </div>
            <h2 className="mt-5 text-lg font-semibold">{c.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{c.address}</p>
            <p className="mt-1 text-sm text-slate-600">
              {c.district}, {c.state}
              {c.pincode ? " – " + c.pincode : ""}
            </p>
            {c.phone ? (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Phone size={15} aria-hidden />
                {format(text.phone, { phone: c.phone })}
              </p>
            ) : null}
            <a
              href={mapsUrl(c)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 underline"
            >
              {text.map} <ExternalLink size={14} aria-hidden />
            </a>
          </article>
        ))}
      </div>
      {shown < page.total ? (
        <button
          type="button"
          className="btn btn-outline mt-7"
          disabled={loading}
          onClick={() => load(params, shown, 0)}
        >
          {text.more}
        </button>
      ) : null}
      {!page.total && !loading ? (
        <div className="panel">
          <p>{text.empty}</p>
          <button
            type="button"
            className="btn btn-outline mt-4"
            onClick={() => update({ q: "", type: "all" })}
          >
            {text.clear}
          </button>
        </div>
      ) : null}
      <p className="mt-10 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
        {format(text.source, { date: source.updated })}{" "}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-800 underline"
        >
          sparsh.defencepension.gov.in
        </a>
        <br />
        {text.callAhead}
      </p>
    </>
  );
}
