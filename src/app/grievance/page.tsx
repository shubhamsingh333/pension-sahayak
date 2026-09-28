import { PageIntro } from "@/components/ui";
import { GrievanceForm } from "@/components/grievance/grievance-form";
import { Tracker } from "@/components/grievance/tracker";
export default async function Grievance({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string | string[] }>;
}) {
  const query = await searchParams;
  const reference =
    typeof query.reference === "string" ? query.reference.slice(0, 35) : "";
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow="Grievance & tracking · local demo"
        title="Every concern deserves clarity."
        description="Try the complete journey: describe a sample issue, save it locally, and use your reference to check its status."
      />
      <div className="grid items-start gap-7 lg:grid-cols-2">
        <GrievanceForm />
        <Tracker key={reference} initialReference={reference} />
      </div>
    </div>
  );
}
