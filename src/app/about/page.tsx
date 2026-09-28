import { PageIntro, Notice } from "@/components/ui";
export default function About() {
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow="DAD Day prototype"
        title="Built to make the next step simpler."
        description="Pension Sahayak is an independent demonstration of a more approachable pension-help experience."
      />
      <div className="panel max-w-3xl space-y-6">
        <h2 className="text-xl font-semibold">What works in this prototype</h2>
        <p className="leading-7 text-slate-600">
          Guided pension journeys, downloadable sample checklists, a fictional
          service-centre directory, a mock PPO lookup, and locally persisted
          grievances with tracking references.
        </p>
        <Notice>
          There are no real government API connections. This is not endorsed by
          DAD, PCDA, SPARSH or any government agency. No official application,
          payment, grievance or appointment is submitted.
        </Notice>
        <h2 className="text-xl font-semibold">Your demo information</h2>
        <p className="leading-7 text-slate-600">
          Grievance category, subject, description, timestamp and status are
          stored in the MongoDB database on this computer. No documents are
          collected. Use fictional information only. Checklists remain in the
          browser until downloaded and reset on reload.
        </p>
        <h2 className="text-xl font-semibold">Before a public launch</h2>
        <p className="leading-7 text-slate-600">
          This local prototype needs authenticated access, role-based case
          management, abuse protection, retention controls, security review,
          verified content, and approved integrations before it can handle real
          users or personal information.
        </p>
      </div>
    </div>
  );
}
