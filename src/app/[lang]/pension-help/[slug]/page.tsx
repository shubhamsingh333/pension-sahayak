import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { WorkflowGuide } from "@/components/pension/workflow";
import { PpoLookup } from "@/components/pension/ppo-lookup";
import { getI18n } from "@/i18n/server";
import { isWorkflowSlug, workflows } from "@/lib/workflows";
export function generateStaticParams() {
  return workflows.map(({ slug }) => ({ slug }));
}
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isWorkflowSlug(slug)) notFound();
  const { t } = await getI18n();
  const workflow = t.workflows[slug];
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={t.help.workflowEyebrow}
        title={workflow.title}
        description={workflow.description}
      />
      <WorkflowGuide slug={slug} workflow={workflow} />
      {slug === "ppo-help" ? <PpoLookup /> : null}
    </div>
  );
}
