import {
  ArrowRight,
  Check,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  MessageSquareText,
  ArrowUpRight,
} from "lucide-react";
import { LocalizedLink as Link } from "@/components/localized-link";
import { ServiceCard } from "@/components/service-card";
import { getI18n } from "@/i18n/server";
import { branches, workflows } from "@/lib/workflows";
export default async function Home() {
  const { t } = await getI18n();
  const { home } = t;
  return (
    <div className="shell">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
            {home.badge}
          </div>
          <h1 className="mt-6 text-[clamp(2.7rem,5.2vw,4.4rem)] font-bold leading-[1.06] tracking-[-.055em]">
            {home.title}
            <br />
            <span className="text-teal-700">{home.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            {home.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn" href="/pension-help">
              {home.findHelp} <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-outline" href="/grievance#track">
              {home.track}
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} /> {home.privacyNote}
          </p>
        </div>
        <div className="hero-art p-7 sm:p-10">
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-900">
                {home.hero.label}
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
                    {home.hero.cardTitle}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {home.hero.cardSubtitle}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {home.hero.steps.map((s, i) => (
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
                {home.hero.taglineTop}
                <br />
                {home.hero.taglineBottom}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5 text-sm">
        <span className="text-slate-500">{home.branchesLabel}</span>
        <div className="flex flex-wrap gap-x-7 gap-y-2 font-semibold text-slate-600">
          {branches.map((b) => (
            <span key={b}>{t.branches[b]}</span>
          ))}
        </div>
      </div>
      <section className="py-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{home.servicesEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {home.servicesTitle}
            </h2>
          </div>
          <span className="text-sm text-slate-500">{home.servicesAside}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map(({ slug, icon }, index) => (
            <ServiceCard
              key={slug}
              slug={slug}
              icon={icon}
              content={t.workflows[slug]}
              index={index}
            />
          ))}
          <Link className="service-card bg-teal-50!" href="/grievance">
            <div className="flex justify-between">
              <span className="icon-tile bg-white!">
                <MessageSquareText size={25} />
              </span>
              <span className="text-xs text-slate-400">06</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">
              {home.grievanceCard.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {home.grievanceCard.description}
            </p>
            <div className="mt-6 flex justify-between text-xs font-semibold text-teal-800">
              {home.grievanceCard.cta} <ArrowUpRight size={19} />
            </div>
          </Link>
        </div>
      </section>
      <section className="grid gap-7 rounded-xl bg-[#eaf0e8] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 shrink-0 text-teal-700" size={27} />
          <div>
            <h2 className="text-xl font-bold">{home.centresBanner.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {home.centresBanner.description}
            </p>
          </div>
        </div>
        <Link href="/service-centre" className="btn btn-outline">
          {home.centresBanner.cta} <ArrowRight size={16} />
        </Link>
      </section>
      <section className="pt-14">
        <p className="eyebrow">{home.faqEyebrow}</p>
        <h2 className="mt-3 mb-6 text-3xl font-bold tracking-tight">
          {home.faqTitle}
        </h2>
        {home.faqs.map(({ question, answer }) => (
          <details key={question} className="border-b border-slate-200 py-5">
            <summary className="cursor-pointer font-semibold">
              {question}
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {answer}
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}
