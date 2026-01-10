import { PreviewButton } from "../../components/PreviewButton/PreviewButton";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { PreviewInput } from "../../components/PreviewInput/PreviewInput";
import { uiTexts } from "../../content/ui-texts";
import { cssVarsFromString } from "../../core/css-var";
import "./PreviewExportSection.css";

type Props = {
  css: string;
  canDownload: boolean;
  onDownload: () => void;
  onCopy: () => void;
};

export function PreviewExportSection({ css, canDownload, onDownload, onCopy }: Props) {
  return (
    <section className="card span-12" aria-labelledby="preview-title">
      <h2 id="preview-title">{uiTexts.preview.title}</h2>
      <p className="hint">{uiTexts.preview.intro}</p>

      <div className="previewGrid">
        <div className="previewSide" style={cssVarsFromString(css)}>
          <div className="previewRow">
            <PreviewButton>{uiTexts.preview.buttonLabel}</PreviewButton>
            <PreviewInput
              placeholder={uiTexts.preview.inputPlaceholder}
              aria-label="Champ accessible"
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
              {uiTexts.preview.download}
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
              aria-label={
                canDownload ? uiTexts.preview.copy : "Copie désactivée: contraste WCAG AA requis"
              }
              title={
                canDownload ? uiTexts.preview.copy : "Copie désactivée: contraste WCAG AA requis"
              }
            >
              {uiTexts.preview.copy}
            </button>

            <span className="exportStatus">
              {canDownload ? uiTexts.preview.exportReady : uiTexts.preview.exportBlocked}
            </span>
          </div>
        </div>

        <aside className="previewAside" aria-label="Espace réservé"></aside>
      </div>
    </section>
  );
}
