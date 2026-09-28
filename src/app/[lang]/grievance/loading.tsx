import { getI18n } from "@/i18n/server";
export default async function Loading() {
  const { t } = await getI18n();
  return (
    <div className="shell py-20" role="status">
      <p className="text-lg text-teal-800">{t.loading}</p>
    </div>
  );
}
