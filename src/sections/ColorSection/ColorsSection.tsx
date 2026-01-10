import { ColorInput } from "../../components/ColorInput/ColorInput";
import { ColorSwatch } from "../../components/ColorSwatch/ColorSwatch";
import { uiTexts } from "../../content/ui-texts";
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
    <section className="card span-6" aria-labelledby="colors-title">
      <div className="cardHeaderRow">
        <h2 id="colors-title">{uiTexts.colors.title}</h2>
      </div>

      <p className="hint">{uiTexts.colors.intro}</p>

      <section className="presetRow" aria-label={uiTexts.colors.presetsTitle}>
        <button className="btn" type="button" onClick={() => applyPreset("Default")}>
          Appliquer par défaut
        </button>
        <button className="btn" type="button" onClick={() => applyPreset("High contrast dark")}>
          Contraste élevé
        </button>
      </section>

      <div className="controls">
        <ColorInput
          id="accent"
          label="Accent"
          value={values.accent}
          onChange={setters.setAccent}
          displayValue={tokens.colors.accent}
          hint={uiTexts.colors.accent}
        />

        <ColorInput
          id="bg"
          label="Background"
          value={values.bg}
          onChange={setters.setBg}
          displayValue={tokens.colors.bg}
          hint={uiTexts.colors.bg}
        />

        <ColorInput
          id="bgCard"
          label="Card"
          value={values.bgCard}
          onChange={setters.setBgCard}
          displayValue={tokens.colors.bgCard}
          hint={uiTexts.colors.card}
        />

        <ColorInput
          id="text"
          label="Text"
          value={values.text}
          onChange={setters.setText}
          displayValue={tokens.colors.text}
          hint={uiTexts.colors.text}
        />

        <ColorInput
          id="textSecondary"
          label="Text secondary"
          value={values.textSecondary}
          onChange={setters.setTextSecondary}
          displayValue={tokens.colors.textSecondary}
          hint={uiTexts.colors.textSecondary}
        />
      </div>

      <section className="swatchGroup" aria-labelledby={uiTexts.colors.derivedTitle}>
        <ColorSwatch
          label="onAccent"
          value={tokens.colors.onAccent}
          rightText={tokens.colors.onAccent}
          description={uiTexts.colors.onAccent}
        />
        <ColorSwatch
          label="accentHover"
          value="var(--color-accentHover)"
          rightText="CSS dérivé"
          description={uiTexts.colors.accentHover}
        />
        <ColorSwatch
          label="border"
          value="var(--color-border)"
          rightText="CSS dérivé"
          description={uiTexts.colors.border}
        />
      </section>
    </section>
  );
}
