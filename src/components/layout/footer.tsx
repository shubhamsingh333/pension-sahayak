import { LocalizedLink as Link } from "@/components/localized-link";
import { getI18n } from "@/i18n/server";
export async function Footer() {
  const { t } = await getI18n();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="shell py-9 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <p className="font-bold text-lg">{t.footer.heading}</p>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            {t.footer.disclaimer}
          </p>
        </div>
        <div className="flex gap-5 text-sm font-semibold">
          <Link href="/about">{t.footer.about}</Link>
          <Link href="/grievance">{t.footer.help}</Link>
        </div>
      </div>
    </footer>
  );
}
