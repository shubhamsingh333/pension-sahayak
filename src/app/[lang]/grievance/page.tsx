import { PageIntro } from "@/components/ui";
import { GrievanceForm } from "@/components/grievance/grievance-form";
import { Tracker } from "@/components/grievance/tracker";
import { getI18n } from "@/i18n/server";
export default async function Grievance({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string | string[] }>;
}) {
  const [{ t }, query] = await Promise.all([getI18n(), searchParams]);
  const reference =
    typeof query.reference === "string" ? query.reference.slice(0, 35) : "";
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={t.grievancePage.eyebrow}
        title={t.grievancePage.title}
        description={t.grievancePage.description}
      />
      <div className="grid items-start gap-7 lg:grid-cols-2">
        <GrievanceForm />
        <Tracker key={reference} initialReference={reference} />
      </div>
    </div>
  );
}
