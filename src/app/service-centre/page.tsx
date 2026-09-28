import { PageIntro } from "@/components/ui";
import { CentreSearch } from "@/components/centres/search";
export default function Centres() {
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow="A helping hand nearby"
        title="Explore service centres."
        description="Search a fictional directory to see how in-person support could be presented. These are sample locations, not an official service-centre listing."
      />
      <CentreSearch />
    </div>
  );
}
