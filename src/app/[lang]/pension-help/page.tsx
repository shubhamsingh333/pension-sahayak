import { PageIntro } from "@/components/ui";
import { ServiceCard } from "@/components/service-card";
import { getI18n } from "@/i18n/server";
import { workflows } from "@/lib/workflows";
export default async function Help() {
  const { t } = await getI18n();
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={t.help.eyebrow}
        title={t.help.title}
        description={t.help.description}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map(({ slug, icon }, index) => (
          <ServiceCard
            key={slug}
            slug={slug}
            icon={icon}
            content={t.workflows[slug]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
