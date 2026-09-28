import { PageIntro } from "@/components/ui";
import { services } from "@/lib/workflows";
import { ServiceCard } from "@/components/service-card";
export default function Help() {
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow="Pension help"
        title="Let’s find your next step."
        description="Choose a topic to get a guided, illustrative checklist. No sign-in or personal documents needed."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard service={service} index={index} key={service.slug} />
        ))}
      </div>
    </div>
  );
}
