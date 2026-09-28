import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { LocalizedLink as Link } from "@/components/localized-link";
import { getI18n } from "@/i18n/server";
import { Accessibility } from "./accessibility";
import { LanguageSwitcher } from "./language-switcher";
export async function Header() {
  const { t } = await getI18n();
  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="shell flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 text-xs text-slate-600">
          <span>
            {t.topBar.exhibition}
            <span className="mx-2 hidden text-slate-300 sm:inline">|</span>
            <span className="hidden sm:inline">{t.topBar.concept}</span>
          </span>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Accessibility />
          </div>
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="shell flex flex-wrap items-center justify-between gap-5 py-5">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={t.header.homeLabel}
          >
            <span className="rounded-xl bg-teal-800 p-2.5 text-white">
              <ShieldCheck size={28} />
            </span>
            <span>
              <span className="block text-xl font-bold tracking-tight">
                {t.header.brand}
                <span className="text-orange-600">.</span>
              </span>
              <span className="block text-xs text-slate-500">
                {t.header.tagline}
              </span>
            </span>
          </Link>
          <nav
            aria-label={t.header.navLabel}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold"
          >
            <Link className="nav-link" href="/pension-help">
              {t.header.help}
            </Link>
            <Link className="nav-link" href="/service-centre">
              {t.header.centres}
            </Link>
            <Link className="nav-link" href="/grievance">
              {t.header.grievances}
            </Link>
            <Link href="/grievance#track" className="btn btn-small btn-outline">
              {t.header.track} <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
