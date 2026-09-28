import { PageIntro, Notice } from "@/components/ui";
import { getI18n } from "@/i18n/server";
export default async function About() {
  const { t } = await getI18n();
  const { about } = t;
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
      />
      <div className="panel max-w-3xl space-y-6">
        <h2 className="text-xl font-semibold">{about.worksTitle}</h2>
        <p className="leading-7 text-slate-600">{about.worksBody}</p>
        <Notice>{about.notice}</Notice>
        <h2 className="text-xl font-semibold">{about.dataTitle}</h2>
        <p className="leading-7 text-slate-600">{about.dataBody}</p>
        <h2 className="text-xl font-semibold">{about.launchTitle}</h2>
        <p className="leading-7 text-slate-600">{about.launchBody}</p>
      </div>
    </div>
  );
}
