import { useMemo, useState } from "react";
import "C:\Users\Natho\Documents\TeamRockett\04-Solo Rush\08-a11y-ds-generator\src\styles\App.css";
import "./styles/App.css";
import "./styles/controls.css";
import "./styles/layout.css";
import "./styles/preview.css";

import { uiTexts } from "./content/ui-texts";
import { getContrastRatio, normalizeHex, passesAA, pickOnAccent } from "./core/contrast";
import { downloadZip, tokensToCssVariables } from "./core/exporters";
import { buildTokens } from "./core/tokens";
import type { Checks, Tokens } from "./core/types";
import { ColorsSection } from "./sections/ColorSection/ColorsSection";
import { PreviewExportSection } from "./sections/PreviewExportSection/PreviewExportSection";
import { TypographySection } from "./sections/TypographySection/TypographySection";

export default function App() {
  // Colors
  const [bg, setBg] = useState("#0a0a12");
  const [bgCard, setBgCard] = useState("#14151b");
  const [text, setText] = useState("#f3f3f7");
  const [textSecondary, setTextSecondary] = useState("#c7c2d6");
  const [accent, setAccent] = useState("#7c5cff");

  // Typography / radius (inputs in px, export in rem)
  const [minPx, setMinPx] = useState(15);
  const [preferredPx, setPreferredPx] = useState(16);
  const [maxPx, setMaxPx] = useState(18);
  const [fluidVw, setFluidVw] = useState(0.2);
  const [lineHeight, setLineHeight] = useState(1.55);

  const [rSm, setRSm] = useState(10);
  const [rMd, setRMd] = useState(14);
  const [rLg, setRLg] = useState(18);

  const presets = {
    Default: {
      accent: "#7c5cff",
      bg: "#0a0a12",
      bgCard: "#14151b",
      text: "#f3f3f7",
      textSecondary: "#c7c2d6",
    },
    "High contrast dark": {
      accent: "#00E5FF",
      bg: "#0B0F14",
      bgCard: "#121A22",
      text: "#F6F8FF",
      textSecondary: "#C9D4FF",
    },
  } as const;

  const computed = useMemo((): { tokens: Tokens; css: string; checks: Checks } => {
    const _bg = normalizeHex(bg) ?? bg;
    const _bgCard = normalizeHex(bgCard) ?? bgCard;
    const _text = normalizeHex(text) ?? text;
    const _textSecondary = normalizeHex(textSecondary) ?? textSecondary;
    const _accent = normalizeHex(accent) ?? accent;

    const onAccent = pickOnAccent(_accent);

    const ratioTextOnBg = getContrastRatio(_text, _bg);
    const ratioTextSecondaryOnCard = getContrastRatio(_textSecondary, _bgCard);
    const ratioOnAccent = getContrastRatio(onAccent, _accent);

    const tokens = buildTokens({
      colors: {
        bg: _bg,
        bgCard: _bgCard,
        text: _text,
        textSecondary: _textSecondary,
        accent: _accent,
        onAccent,
      },
      typography: {
        base: { minPx, preferredPx, maxPx, fluidVw },
        lineHeight,
      },
      radius: { sm: rSm, md: rMd, lg: rLg },
    });

    const css = tokensToCssVariables(tokens);

    return {
      tokens,
      css,
      checks: {
        textOnBg: { ratio: ratioTextOnBg, pass: passesAA(ratioTextOnBg, false) },
        textSecondaryOnCard: {
          ratio: ratioTextSecondaryOnCard,
          pass: passesAA(ratioTextSecondaryOnCard, false),
        },
        onAccent: { ratio: ratioOnAccent, pass: passesAA(ratioOnAccent, false) },
      },
    };
  }, [
    bg,
    bgCard,
    text,
    textSecondary,
    accent,
    minPx,
    preferredPx,
    maxPx,
    fluidVw,
    lineHeight,
    rSm,
    rMd,
    rLg,
  ]);

  const canDownload =
    computed.checks.textOnBg.pass &&
    computed.checks.textSecondaryOnCard.pass &&
    computed.checks.onAccent.pass;

  return (
    <div className="page">
      <div className="shell">
        <header className="header">
          <h1>{uiTexts.header.title}</h1>
          <p className="subtitle">
            {uiTexts.header.subtitle[0]}
            <br />
            {uiTexts.header.subtitle[1]}
            <br />
            {uiTexts.header.subtitle[2]}
          </p>
        </header>

        <main className="grid">
          <ColorsSection
            tokens={computed.tokens}
            presets={presets}
            values={{ accent, bg, bgCard, text, textSecondary }}
            setters={{ setAccent, setBg, setBgCard, setText, setTextSecondary }}
          />

          <TypographySection
            checks={computed.checks}
            values={{ minPx, preferredPx, maxPx, fluidVw, lineHeight, rSm, rMd, rLg }}
            setters={{
              setMinPx,
              setPreferredPx,
              setMaxPx,
              setFluidVw,
              setLineHeight,
              setRSm,
              setRMd,
              setRLg,
            }}
          />

          <PreviewExportSection
            css={computed.css}
            canDownload={canDownload}
            onDownload={() => downloadZip({ tokens: computed.tokens, css: computed.css })}
            onCopy={() => navigator.clipboard.writeText(computed.css)}
          />
        </main>
      </div>
    </div>
  );
}
