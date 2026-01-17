import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useDocumentLang() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // HTML dynamique
    document.documentElement.lang = i18n.language;

    // doc title
    document.title = t("header.title");
  }, [i18n.language, t]);
}
