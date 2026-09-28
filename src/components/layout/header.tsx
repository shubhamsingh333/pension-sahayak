import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { Accessibility } from "./accessibility";
export function Header() {
  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="shell flex items-center justify-between gap-4 py-2 text-xs text-slate-600">
          <span>
            DAD DAY EXHIBITION <span className="mx-2 text-slate-300">|</span> A
            pension support concept
          </span>
          <Accessibility />
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="shell flex flex-wrap items-center justify-between gap-5 py-5">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Pension Sahayak home"
          >
            <span className="rounded-xl bg-teal-800 p-2.5 text-white">
              <ShieldCheck size={28} />
            </span>
            <span>
              <span className="block text-xl font-bold tracking-tight">
                Pension Sahayak<span className="text-orange-600">.</span>
              </span>
              <span className="block text-xs text-slate-500">
                Here for every next step
              </span>
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold"
          >
            <Link className="nav-link" href="/pension-help">
              Pension help
            </Link>
            <Link className="nav-link" href="/service-centre">
              Service centres
            </Link>
            <Link className="nav-link" href="/grievance">
              Grievances
            </Link>
            <Link href="/grievance#track" className="btn btn-small btn-outline">
              Track a request <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
