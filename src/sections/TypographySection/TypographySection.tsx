import { useTranslation } from "react-i18next";
import "./TypographySection.css";

type Props = {
  values: {
    minPx: number;
    preferredPx: number;
    maxPx: number;
    fluidVw: number;
    lineHeight: number;
    rSm: number;
    rMd: number;
    rLg: number;
  };
  setters: {
    setMinPx: (v: number) => void;
    setPreferredPx: (v: number) => void;
    setMaxPx: (v: number) => void;
    setFluidVw: (v: number) => void;
    setLineHeight: (v: number) => void;
    setRSm: (v: number) => void;
    setRMd: (v: number) => void;
    setRLg: (v: number) => void;
  };
};

export function TypographySection({ values, setters }: Props) {
  const { t } = useTranslation();

  return (
    <section className="card" aria-labelledby="typo-title">
      <h2 id="typo-title">{t("typography.title")}</h2>
      <p className="hint">
        {t("typography.intro")}
        <br />
        {t("typography.clampHelp")}
      </p>

      <div className="controls">
        <div className="field">
          <div className="labelRow">
            <label htmlFor="bFs">{t("typography.baseFontSize")}</label>
            <span>
              {values.minPx}px → {values.preferredPx}px → {values.maxPx}px / {values.fluidVw}vw
            </span>
          </div>
          <p className="hintInline">{t("typography.minLimit")}</p>

          <div className="typography-row">
            <input
              id="bFs"
              className="numberInput"
              type="number"
              min={12}
              max={20}
              value={values.minPx}
              onChange={(e) => setters.setMinPx(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.minSize")}
            />
            <input
              className="numberInput"
              type="number"
              min={12}
              max={22}
              value={values.preferredPx}
              onChange={(e) => setters.setPreferredPx(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.preferredSize")}
            />
          </div>

          <div className="typography-row">
            <input
              className="numberInput"
              type="number"
              min={14}
              max={28}
              value={values.maxPx}
              onChange={(e) => setters.setMaxPx(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.maxSize")}
            />
            <input
              className="numberInput"
              type="number"
              step={0.05}
              min={0}
              max={1.2}
              value={values.fluidVw}
              onChange={(e) => setters.setFluidVw(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.fluidFactor")}
            />
          </div>
        </div>

        <div className="field">
          <div className="labelRow">
            <label htmlFor="lineHeight">{t("typography.lineHeight")}</label>
            <span>{values.lineHeight}</span>
          </div>

          <input
            id="lineHeight"
            className="numberInput"
            type="number"
            step={0.05}
            min={1.2}
            max={2}
            value={values.lineHeight}
            onChange={(e) => setters.setLineHeight(Number(e.target.value))}
            aria-label={t("typography.ariaLabels.lineHeight")}
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <label htmlFor="rSm">{t("typography.radiusTitle")}</label>
            <span>
              {values.rSm}px • {values.rMd}px • {values.rLg}px
            </span>
          </div>
          <p className="hintInline">{t("typography.radiusHelp")}</p>

          <div className="typography-row">
            <input
              id="rSm"
              className="numberInput"
              type="number"
              min={0}
              max={30}
              value={values.rSm}
              onChange={(e) => setters.setRSm(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.radiusSm")}
            />
            <input
              className="numberInput"
              type="number"
              min={0}
              max={30}
              value={values.rMd}
              onChange={(e) => setters.setRMd(Number(e.target.value))}
              aria-label={t("typography.ariaLabels.radiusMd")}
            />
          </div>

          <input
            className="numberInput"
            type="number"
            min={0}
            max={30}
            value={values.rLg}
            onChange={(e) => setters.setRLg(Number(e.target.value))}
            aria-label={t("typography.ariaLabels.radiusLg")}
          />
        </div>
      </div>
    </section>
  );
}