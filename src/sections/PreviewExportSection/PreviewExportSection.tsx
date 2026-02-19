import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PreviewButton } from "../../components/PreviewButton/PreviewButton";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { PreviewInput } from "../../components/PreviewInput/PreviewInput";
import { cssVarsFromString } from "../../core/css-var";
import "./PreviewExportSection.css";
import { BadgeCheck } from "lucide-react";

type Props = {
  css: string;
  canDownload: boolean;
  onDownload: () => void;
  onCopy: () => Promise<void>;
};

export function PreviewExportSection({ css, canDownload, onDownload, onCopy }: Props) {
  const { t } = useTranslation();
  const [copyFeedback, setCopyFeedback] = useState<"idle" | "success" | "error">("idle");

  const handleCopy = async () => {
    if (!canDownload) return;
    try {
      await onCopy();
      setCopyFeedback("success");
    } catch {
      setCopyFeedback("error");
    }
    setTimeout(() => setCopyFeedback("idle"), 2000);
  };

  return (
    <section className="card" aria-labelledby="preview-title">
      <h2 id="preview-title">{t("preview.title")}</h2>
      <p className="hint">{t("preview.intro")}</p>

      <div className="previewGrid">
        <div className="previewSide" style={cssVarsFromString(css)}>
          <div className="previewRow">
            <PreviewButton>{t("preview.buttonLabel")}</PreviewButton>
            <div className="previewInputField">
              <label htmlFor="previewInput">{t("preview.inputLabel")}</label>
              <PreviewInput id="previewInput" placeholder={t("preview.inputPlaceholder")} />
            </div>
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
              onClick={handleCopy}
              disabled={!canDownload}
              aria-disabled={!canDownload}
              aria-label={canDownload ? t("preview.copy") : t("preview.copyDisabled")}
              title={canDownload ? t("preview.copy") : t("preview.copyDisabled")}
            >
              {t("preview.copy")}
            </button>

            <span className="exportStatus" aria-live="polite" aria-atomic="true">
              {copyFeedback === "success" ? (
                t("preview.copySuccess")
              ) : copyFeedback === "error" ? (
                t("preview.copyError")
              ) : canDownload ? (
                <>
                  <BadgeCheck size={15} aria-hidden="true" /> {t("preview.exportReady")}
                </>
              ) : (
                t("preview.exportBlocked")
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
