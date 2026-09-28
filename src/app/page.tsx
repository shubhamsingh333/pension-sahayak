import Link from "next/link";
import {
  ArrowRight,
  Check,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  MessageSquareText,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/workflows";
import { ServiceCard } from "@/components/service-card";
export default function Home() {
  return (
    <div className="shell">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-700" /> DAD Day
            prototype · Demo only
          </div>
          <h1 className="mt-6 text-[clamp(2.7rem,5.2vw,4.4rem)] font-bold leading-[1.06] tracking-[-.055em]">
            Your service matters.
            <br />
            <span className="text-teal-700">
              So does your peace
              <br className="hidden lg:block" /> of mind.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Pension questions can feel overwhelming. Find simple guidance,
            prepare your documents, and take the next step with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn" href="/pension-help">
              Find the help you need <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-outline" href="/grievance#track">
              Track a request
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} /> No real PPO, bank or identity details
            needed
          </p>
        </div>
        <div className="hero-art p-7 sm:p-10">
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-900">
                With you, step by step
              </span>
              <HeartHandshake className="text-teal-700" size={30} />
            </div>
            <div className="ml-3 rounded-xl bg-white p-6 shadow-[0_12px_35px_#21493612]">
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <ShieldCheck size={24} />
                </span>
                <div>
                  <p className="text-sm font-semibold">
                    A clearer path forward
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your pension support journey
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {[
                  "Tell us what you need",
                  "Get a simple checklist",
                  "Choose your next step",
                ].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    <span
                      className={
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs " +
                        (i < 2
                          ? "bg-teal-700 text-white"
                          : "bg-orange-100 text-orange-800")
                      }
                    >
                      {i < 2 ? <Check size={13} /> : 3}
                    </span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-teal-600" />
              <p className="text-sm leading-5 text-teal-900">
                For pensioners.
                <br />
                For families. For every next chapter.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5 text-sm">
        <span className="text-slate-500">
          Guidance across the defence community
        </span>
        <div className="flex flex-wrap gap-x-7 gap-y-2 font-semibold text-slate-600">
          {["Army", "Navy", "Air Force", "Defence Civilian"].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
      <section className="py-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Start with what matters to you</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              How can we help today?
            </h2>
          </div>
          <span className="text-sm text-slate-500">
            Simple steps. At your own pace.
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
          <Link className="service-card bg-teal-50!" href="/grievance">
            <div className="flex justify-between">
              <span className="icon-tile bg-white!">
                <MessageSquareText size={25} />
              </span>
              <span className="text-xs text-slate-400">06</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">Raise a grievance</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Describe a sample concern and follow its locally saved request
              status.
            </p>
            <div className="mt-6 flex justify-between text-xs font-semibold text-teal-800">
              We’re here to guide you <ArrowUpRight size={19} />
            </div>
          </Link>
        </div>
      </section>
      <section className="grid gap-7 rounded-xl bg-[#eaf0e8] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 shrink-0 text-teal-700" size={27} />
          <div>
            <h2 className="text-xl font-bold">Prefer a helping hand?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore the sample service-centre directory and see the support
              available.
            </p>
          </div>
        </div>
        <Link href="/service-centre" className="btn btn-outline">
          Explore demo centres <ArrowRight size={16} />
        </Link>
      </section>
      <section className="pt-14">
        <p className="eyebrow">A few helpful answers</p>
        <h2 className="mt-3 mb-6 text-3xl font-bold tracking-tight">
          Before you get started
        </h2>
        {[
          [
            "Is this an official pension portal?",
            "No. This is a DAD Day prototype demonstrating possible pension support journeys. It has no connection to government systems.",
          ],
          [
            "Should I enter my real information?",
            "Please use fictional details only. Do not enter real PPO numbers, Aadhaar, account numbers or upload personal documents.",
          ],
          [
            "What happens when I submit a grievance?",
            "A demo record is saved in your local MongoDB database and you receive a tracking reference. No government office receives it, and its status does not change automatically.",
          ],
        ].map(([q, a]) => (
          <details key={q} className="border-b border-slate-200 py-5">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {a}
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}
