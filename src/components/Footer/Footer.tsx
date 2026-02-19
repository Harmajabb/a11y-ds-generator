import { useTranslation } from "react-i18next";
import "./Footer.css";
import { Star } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">{t("footer.title")}</p>
        <p className="footer-subtitle">{t("footer.subtitle")}</p>

        <a
          href="https://github.com/Harmajabb/a11y-ds-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-button"
        >
          <Star size={15} aria-hidden="true" />
          {t("footer.starButton")}
        </a>
        <p className="footer-credits">
          {t("footer.credits")}{" "}
          <a
            href="https://leafrancois.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {t("footer.author")}
          </a>
        </p>
      </div>
    </footer>
  );
}
