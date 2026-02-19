import { Languages } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [announcement, setAnnouncement] = useState("");

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    setAnnouncement(
      newLang === "en" ? t("language.announcedEn") : t("language.announcedFr")
    );
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleLanguage}
        className="lang-switcher"
        aria-label={t("language.label")}
        title={t("language.label")}
      >
        <Languages size={18} aria-hidden="true" />
        <span className="lang-code">{i18n.language.toUpperCase()}</span>
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </>
  );
}
