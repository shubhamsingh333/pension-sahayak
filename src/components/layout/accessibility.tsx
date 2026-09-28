"use client";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
export function Accessibility() {
  const { t } = useI18n();
  const [large, setLarge] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={large}
      onClick={() => {
        setLarge(!large);
        document.documentElement.style.fontSize = large ? "16px" : "19px";
      }}
      className="text-sm font-semibold underline-offset-4 hover:underline"
    >
      A{large ? "−" : "+"}{" "}
      <span className="sr-only">{t.topBar.largerText}</span>
    </button>
  );
}
