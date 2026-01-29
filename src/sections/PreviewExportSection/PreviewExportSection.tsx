/**
 * Cette section permet a l'utilisateur de :
 * - Voir un apercu en temps reel des couleurs choisies
 * - Telecharger le CSS genere (fichier ZIP)
 * - Copier le CSS dans le presse-papiers
 *
 * CONCEPT CLE : APPLICATION DYNAMIQUE DES STYLES
 * Le CSS genere est applique dynamiquement via l'attribut style.
 * Cela permet de voir l'apercu sans recharger la page.
 */

import { useTranslation } from "react-i18next";
import { PreviewButton } from "../../components/PreviewButton/PreviewButton";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { PreviewInput } from "../../components/PreviewInput/PreviewInput";
import { cssVarsFromString } from "../../core/css-var";
import "./PreviewExportSection.css";

/**
 * Props du composant
 * - css : Le code CSS genere (string de variables CSS)
 * - canDownload : true si toutes les verifications WCAG passent
 * - onDownload : Fonction appelee au clic sur "Telecharger"
 * - onCopy : Fonction appelee au clic sur "Copier"
 */
type Props = {
  css: string;
  canDownload: boolean;
  onDownload: () => void;
  onCopy: () => void;
};

export function PreviewExportSection({ css, canDownload, onDownload, onCopy }: Props) {
  const { t } = useTranslation();

  return (
    <section className="card" aria-labelledby="preview-title">
      <h2 id="preview-title">{t("preview.title")}</h2>
      <p className="hint">{t("preview.intro")}</p>

      <div className="previewGrid">
        {/*
          cssVarsFromString(css) convertit le string CSS en objet de style React
          Exemple : "--color-bg: #0a0a12;" devient { "--color-bg": "#0a0a12" }

          Ces variables CSS sont ensuite utilisees par les composants enfants
          via var(--color-bg) dans leur CSS
        */}
        <div className="previewSide" style={cssVarsFromString(css)}>
          <div className="previewRow">
            {/*
              children : Le texte entre les balises devient la prop "children"
              <PreviewButton>Texte</PreviewButton>
              Dans PreviewButton, on accede a "Texte" via props.children
            */}
            <PreviewButton>{t("preview.buttonLabel")}</PreviewButton>
            <PreviewInput
              placeholder={t("preview.inputPlaceholder")}
              aria-label={t("preview.inputPlaceholder")}
            />
          </div>

          <div className="previewCard">
            <PreviewCard />
          </div>

          <div className="downloadRow">
            {/*
              disabled={!canDownload}
              Si canDownload est false, le bouton est desactive (grise, non cliquable)

              aria-disabled pour l'accessibilite : informe les lecteurs d'ecran
              que le bouton est desactive
            */}
            <button
              type="button"
              className="btn btnPrimary"
              onClick={onDownload}
              disabled={!canDownload}
              aria-disabled={!canDownload}
            >
              {t("preview.download")}
            </button>

            <button
              className="btn"
              type="button"
              onClick={() => {
                if (!canDownload) return;
                onCopy();
              }}
              disabled={!canDownload}
              aria-disabled={!canDownload}
              aria-label={canDownload ? t("preview.copy") : t("preview.copyDisabled")}
              title={canDownload ? t("preview.copy") : t("preview.copyDisabled")}
            >
              {t("preview.copy")}
            </button>

            <span className="exportStatus">
              {canDownload ? t("preview.exportReady") : t("preview.exportBlocked")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
