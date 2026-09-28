"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/i18n/client";
import { localizePath } from "@/i18n/config";

/** next/link that keeps the visitor in their language: "/grievance" → "/hi/grievance". */
export function LocalizedLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { locale } = useI18n();
  return <Link href={localizePath(locale, href)} {...props} />;
}
