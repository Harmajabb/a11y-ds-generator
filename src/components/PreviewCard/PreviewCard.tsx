import { useTranslation } from "react-i18next";
import "./PreviewCard.css";

export function PreviewCard() {
  const { t } = useTranslation();

  return (
    <article className="previewCard" aria-label={t("preview.cardAriaLabel")}>
      <header className="previewCardHeader">
        <h3 className="previewCardTitle">{t("preview.cardTitle")}</h3>
        <span className="previewCardMeta">{t("preview.cardMeta")}</span>
      </header>

      <p className="previewCardDesc">{t("preview.cardDescription")}</p>

      <div className="previewCardActions">
        <button className="previewCardBtn" type="button">
          {t("preview.cardAction")}
        </button>
        <button type="button" className="previewCardSecondary">
          {t("preview.secondaryButton")}
        </button>
      </div>
    </article>
  );
}
