import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { I18nProvider } from "@/i18n/client";
import { locales } from "@/i18n/config";
import { pickClientMessages } from "@/i18n/messages";
import { getI18n } from "@/i18n/server";
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: { default: t.meta.title, template: t.meta.titleTemplate },
    description: t.meta.description,
    robots: { index: false, follow: false },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, t } = await getI18n();
  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale} messages={pickClientMessages(t)}>
          <a href="#main" className="skip-link">
            {t.topBar.skipToContent}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
