import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="lang-switcher"
      aria-label={t("language.label")}
      title={t("language.label")}
    >
      <Languages size={18} />
      <span className="lang-code">{i18n.language.toUpperCase()}</span>
    </button>
  );
}
