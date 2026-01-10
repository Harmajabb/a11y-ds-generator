import "./TypographySection.css";
import { StatusBadge } from "../../components/StatusBadge/StatusBadge";
import { uiTexts } from "../../content/ui-texts";
import type { Checks } from "../../core/types";

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
  checks: Checks;
};

export function TypographySection({ values, setters, checks }: Props) {
  return (
    <section className="card span-6" aria-labelledby="typo-title">
      <h2 id="typo-title">{uiTexts.typography.title}</h2>
      <p className="hint">
        {uiTexts.typography.intro}
        <br />
        {uiTexts.typography.clampHelp}
      </p>

      <div className="controls">
        <div className="field">
          <div className="labelRow">
            <label htmlFor="bFs">Base font size (clamp)</label>
            <span>
              {values.minPx}px → {values.preferredPx}px → {values.maxPx}px / {values.fluidVw}vw
            </span>
          </div>
          <p className="hintInline">{uiTexts.typography.minLimit}</p>

          <div className="row" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              id="bFs"
              className="numberInput"
              type="number"
              min={12}
              max={20}
              value={values.minPx}
              onChange={(e) => setters.setMinPx(Number(e.target.value))}
              aria-label="Taille min (px)"
            />
            <input
              className="numberInput"
              type="number"
              min={12}
              max={22}
              value={values.preferredPx}
              onChange={(e) => setters.setPreferredPx(Number(e.target.value))}
              aria-label="Taille préférée (px)"
            />
          </div>

          <div className="row" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              className="numberInput"
              type="number"
              min={14}
              max={28}
              value={values.maxPx}
              onChange={(e) => setters.setMaxPx(Number(e.target.value))}
              aria-label="Taille max (px)"
            />
            <input
              className="numberInput"
              type="number"
              step={0.05}
              min={0}
              max={1.2}
              value={values.fluidVw}
              onChange={(e) => setters.setFluidVw(Number(e.target.value))}
              aria-label="Facteur vw"
            />
          </div>
        </div>

        <div className="field">
          <div className="labelRow">
            <label htmlFor="lineHeight">Interligne</label>
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
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <label htmlFor="rSm">Rayons sm / md / lg</label>
            <span>
              {values.rSm}px • {values.rMd}px • {values.rLg}px
            </span>
          </div>
          <p className="hintInline">{uiTexts.typography.radiusHelp}</p>

          <div className="row" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              id="rSm"
              className="numberInput"
              type="number"
              min={0}
              max={30}
              value={values.rSm}
              onChange={(e) => setters.setRSm(Number(e.target.value))}
              aria-label="Radius sm"
            />
            <input
              className="numberInput"
              type="number"
              min={0}
              max={30}
              value={values.rMd}
              onChange={(e) => setters.setRMd(Number(e.target.value))}
              aria-label="Radius md"
            />
          </div>

          <input
            className="numberInput"
            type="number"
            min={0}
            max={30}
            value={values.rLg}
            onChange={(e) => setters.setRLg(Number(e.target.value))}
            aria-label="Radius lg"
          />
        </div>
      </div>

      <hr className="divider" />

      <h3 className="cardSubTitle">{uiTexts.typography.wcagTitle}</h3>
      <p className="hint">{uiTexts.typography.wcagIntro}</p>

      <div className="stack">
        <StatusBadge
          label="Texte sur background"
          value={checks.textOnBg.ratio ? checks.textOnBg.ratio.toFixed(2) : "-"}
          ok={checks.textOnBg.pass}
        />
        <StatusBadge
          label="Texte secondaire sur card"
          value={
            checks.textSecondaryOnCard.ratio ? checks.textSecondaryOnCard.ratio.toFixed(2) : "-"
          }
          ok={checks.textSecondaryOnCard.pass}
        />
        <StatusBadge
          label="onAccent sur accent"
          value={checks.onAccent.ratio ? checks.onAccent.ratio.toFixed(2) : "-"}
          ok={checks.onAccent.pass}
        />
        <p className="hint" style={{ marginTop: 2 }}>
          {uiTexts.typography.aaRule}
        </p>
      </div>
    </section>
  );
}
