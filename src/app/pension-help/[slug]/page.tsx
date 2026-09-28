import { notFound } from "next/navigation";
import { services } from "@/lib/workflows";
import { PageIntro } from "@/components/ui";
import { WorkflowGuide } from "@/components/pension/workflow";
import { PpoLookup } from "@/components/pension/ppo-lookup";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workflow = services.find((s) => s.slug === slug);
  if (!workflow) notFound();
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow="Guided pension support · demo"
        title={workflow.title}
        description={workflow.description}
      />
      <WorkflowGuide workflow={workflow} />
      {slug === "ppo-help" ? <PpoLookup /> : null}
    </div>
  );
}
