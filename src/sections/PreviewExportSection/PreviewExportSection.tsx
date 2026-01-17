import { useTranslation } from "react-i18next";
import { PreviewButton } from "../../components/PreviewButton/PreviewButton";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { PreviewInput } from "../../components/PreviewInput/PreviewInput";
import { cssVarsFromString } from "../../core/css-var";
import "./PreviewExportSection.css";

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
        <div className="previewSide" style={cssVarsFromString(css)}>
          <div className="previewRow">
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