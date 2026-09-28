import { PageIntro } from "@/components/ui";
import { CentreSearch } from "@/components/centres/search";
import { getI18n } from "@/i18n/server";
import { en } from "@/i18n/messages/en";
import { localizeCentres } from "@/lib/centres";
export default async function Centres() {
  const { locale, t } = await getI18n();
  // English names stay searchable in every language ("Pune" on the Hindi page).
  const centres = localizeCentres(t, locale === "en" ? [] : [en]);
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={t.centresPage.eyebrow}
        title={t.centresPage.title}
        description={t.centresPage.description}
      />
      <CentreSearch centres={centres} />
    </div>
  );
}
