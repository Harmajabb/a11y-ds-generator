import { useTranslation } from "react-i18next";
import { ColorInput } from "../../components/ColorInput/ColorInput";
import { ColorSwatch } from "../../components/ColorSwatch/ColorSwatch";
import type { Tokens } from "../../core/types";
import "./ColorsSection.css";

type ColorValues = {
  accent: string;
  bg: string;
  bgCard: string;
  text: string;
  textSecondary: string;
};

type ColorSetters = {
  setAccent: (v: string) => void;
  setBg: (v: string) => void;
  setBgCard: (v: string) => void;
  setText: (v: string) => void;
  setTextSecondary: (v: string) => void;
};

type Presets = Record<string, ColorValues>;

type Props = {
  tokens: Tokens;
  values: ColorValues;
  setters: ColorSetters;
  presets: Presets;
};

export function ColorsSection({ tokens, values, setters, presets }: Props) {
  const { t } = useTranslation();

  const applyPreset = (name: string) => {
    const p = presets[name];
    if (!p) return;
    setters.setAccent(p.accent);
    setters.setBg(p.bg);
    setters.setBgCard(p.bgCard);
    setters.setText(p.text);
    setters.setTextSecondary(p.textSecondary);
  };

  return (
    <section className="card" aria-labelledby="colors-title">
      <div className="cardHeaderRow">
        <h2 id="colors-title">{t("colors.title")}</h2>
      </div>

      <p className="hint">{t("colors.intro")}</p>

      <section className="presetRow" aria-label={t("colors.presetsTitle")}>
        <button className="btn" type="button" onClick={() => applyPreset("Default")}>
          {t("colors.applyDefault")}
        </button>
        <button className="btn" type="button" onClick={() => applyPreset("High contrast dark")}>
          {t("colors.applyHighContrast")}
        </button>
      </section>

      <div className="controls">
        <ColorInput
          id="accent"
          label="Accent"
          value={values.accent}
          onChange={setters.setAccent}
          displayValue={tokens.colors.accent}
          hint={t("colors.accent")}
        />

        <ColorInput
          id="bg"
          label="Background"
          value={values.bg}
          onChange={setters.setBg}
          displayValue={tokens.colors.bg}
          hint={t("colors.bg")}
        />

        <ColorInput
          id="bgCard"
          label="Card"
          value={values.bgCard}
          onChange={setters.setBgCard}
          displayValue={tokens.colors.bgCard}
          hint={t("colors.card")}
        />

        <ColorInput
          id="text"
          label="Text"
          value={values.text}
          onChange={setters.setText}
          displayValue={tokens.colors.text}
          hint={t("colors.text")}
        />

        <ColorInput
          id="textSecondary"
          label="Text secondary"
          value={values.textSecondary}
          onChange={setters.setTextSecondary}
          displayValue={tokens.colors.textSecondary}
          hint={t("colors.textSecondary")}
        />
      </div>

      <section className="swatchGroup" aria-labelledby={t("colors.derivedTitle")}>
        <ColorSwatch
          label="onAccent"
          value={tokens.colors.onAccent}
          rightText={tokens.colors.onAccent}
          description={t("colors.onAccent")}
        />
        <ColorSwatch
          label="accentHover"
          value="var(--color-accentHover)"
          rightText="CSS dérivé"
          description={t("colors.accentHover")}
        />
        <ColorSwatch
          label="border"
          value="var(--color-border)"
          rightText="CSS dérivé"
          description={t("colors.border")}
        />
      </section>
    </section>
  );
}