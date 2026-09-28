import { LocalizedLink as Link } from "@/components/localized-link";
import { getI18n } from "@/i18n/server";
export default async function NotFound() {
  const { t } = await getI18n();
  return (
    <div className="shell py-20">
      <p className="eyebrow">404</p>
      <h1 className="page-title">{t.notFound.title}</h1>
      <p className="my-5 text-slate-600">{t.notFound.body}</p>
      <Link href="/pension-help" className="btn">
        {t.notFound.cta}
      </Link>
    </div>
  );
}
