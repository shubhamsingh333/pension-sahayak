import { PageIntro } from "@/components/ui";
import { CentreSearch } from "@/components/centres/search";
import { intlLocales } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { centreDirectory } from "@/lib/server/service-centres";
export default async function Centres() {
  const { locale, t } = await getI18n();
  const intl = intlLocales[locale];
  const updated = new Intl.DateTimeFormat(intl, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(centreDirectory.retrievedAt));
  const count = new Intl.NumberFormat(intl).format(centreDirectory.total);
  return (
    <div className="shell py-12">
      <PageIntro
        eyebrow={t.centresPage.eyebrow}
        title={t.centresPage.title}
        description={format(t.centresPage.description, { count })}
      />
      <CentreSearch
        initial={centreDirectory.search({ q: "", type: "all", offset: 0 })}
        source={{ url: centreDirectory.source, updated }}
      />
    </div>
  );
}
