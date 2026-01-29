/**
 * Ce fichier est le "chef d'orchestre" de l'application. Il :
 * - Gere tous les etats (states) des couleurs et de la typographie
 * - Calcule les tokens et verifie l'accessibilite WCAG
 * - Coordonne toutes les sections de l'interface
 *
 * CONCEPTS CLES UTILISES :
 * - useState : Creer des variables reactives (qui mettent a jour l'affichage)
 * - useMemo : Optimiser les calculs couteux (ne recalculer que si necessaire)
 * - Props : Passer des donnees aux composants enfants
 */

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDocumentLang } from "./hooks/useDocumentLang";
import "./styles/App.css";
import "./styles/controls.css";
import "./styles/layout.css";
import "./styles/preview.css";

import Footer from "./components/Footer/Footer";
import { LanguageSwitcher } from "./components/LanguageSwitcher/LanguageSwitcher";
import { getContrastRatio, normalizeHex, passesAA, pickOnAccent } from "./core/contrast";
import { downloadZip, tokensToCssVariables } from "./core/exporters";
import { buildTokens } from "./core/tokens";
import type { Checks, Tokens } from "./core/types";
import { ColorsSection } from "./sections/ColorSection/ColorsSection";
import { PreviewExportSection } from "./sections/PreviewExportSection/PreviewExportSection";
import { TypographySection } from "./sections/TypographySection/TypographySection";
import { WcagChecksSection } from "./sections/WcagChecksSection/WcagChecksSection";

export default function App() {
  const { t } = useTranslation();
  useDocumentLang();

  // Chaque useState retourne un tableau : [valeurActuelle, fonctionPourModifier]
  // Quand on appelle la fonction (ex: setBg), React re-render le composant

  // --- Etats des couleurs ---
  // Ces valeurs sont au format hexadecimal (#RRGGBB)
  const [bg, setBg] = useState("#0a0a12"); // Couleur de fond principale
  const [bgCard, setBgCard] = useState("#14151b"); // Couleur de fond des cartes
  const [text, setText] = useState("#f3f3f7"); // Couleur du texte principal
  const [textSecondary, setTextSecondary] = useState("#c7c2d6"); // Couleur du texte secondaire
  const [accent, setAccent] = useState("#7c5cff"); // Couleur d'accent (boutons, liens...)

  // --- Etats de la typographie ---
  // Ces valeurs permettent de creer une taille de police "fluide" avec clamp()
  const [minPx, setMinPx] = useState(15); // Taille minimale de la police (en px)
  const [preferredPx, setPreferredPx] = useState(16); // Taille preferee (en px)
  const [maxPx, setMaxPx] = useState(18); // Taille maximale (en px)
  const [fluidVw, setFluidVw] = useState(0.2); // Facteur de fluidite (en vw)
  const [lineHeight, setLineHeight] = useState(1.55); // Hauteur de ligne (ratio)

  // --- Etats des border-radius ---
  // Trois tailles de coins arrondis : small, medium, large
  const [rSm, setRSm] = useState(10); // Petit rayon (en px)
  const [rMd, setRMd] = useState(14); // Rayon moyen (en px)
  const [rLg, setRLg] = useState(18); // Grand rayon (en px)

  // Permet a l'utilisateur d'appliquer un theme complet en un clic
  // "as const" garantit que TypeScript traite l'objet comme immuable
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

  /**
   * useMemo memorise le resultat d'un calcul couteux.
   *
   * POURQUOI ?
   * Sans useMemo, ces calculs seraient refaits a chaque re-render, meme si
   * les valeurs n'ont pas change. Avec useMemo, React ne recalcule que si
   * une des dependances (le tableau a la fin) change.
   *
   * RETOURNE :
   * - tokens : Les design tokens calcules (couleurs, typo, radius)
   * - css : Le code CSS genere avec les variables CSS
   * - checks : Les resultats des verifications WCAG (accessibilite)
   */
  const computed = useMemo((): { tokens: Tokens; css: string; checks: Checks } => {
    // Normalise les couleurs hexadecimales (s'assure qu'elles sont valides)
    const _bg = normalizeHex(bg) ?? bg;
    const _bgCard = normalizeHex(bgCard) ?? bgCard;
    const _text = normalizeHex(text) ?? text;
    const _textSecondary = normalizeHex(textSecondary) ?? textSecondary;
    const _accent = normalizeHex(accent) ?? accent;

    // Calcule la couleur de texte optimale sur l'accent (noir ou blanc)
    const onAccent = pickOnAccent(_accent);

    // Calcule les ratios de contraste pour verifier l'accessibilite WCAG
    // Un ratio >= 4.5:1 est requis pour le texte normal (niveau AA)
    const ratioTextOnBg = getContrastRatio(_text, _bg);
    const ratioTextSecondaryOnCard = getContrastRatio(_textSecondary, _bgCard);
    const ratioOnAccent = getContrastRatio(onAccent, _accent);

    // Construit les design tokens a partir des valeurs saisies
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

    // Convertit les tokens en variables CSS
    const css = tokensToCssVariables(tokens);

    // Retourne tout : tokens, CSS et resultats des verifications
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
    // Tableau des dependances : useMemo recalcule uniquement si une de ces valeurs change
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

  // Determine si l'export est autorise (toutes les verifications WCAG doivent passer)
  const canDownload =
    computed.checks.textOnBg.pass &&
    computed.checks.textSecondaryOnCard.pass &&
    computed.checks.onAccent.pass;

  return (
    <div className="page">
      <div className="shell">
        <header className="header">
          <div className="header-top">
            <div className="header-content">
              <h1>{t("header.title")}</h1>
              <p className="subtitle">
                {t("header.subtitle.line1")}
                <br />
                {t("header.subtitle.line2")}
                <br />
                {t("header.subtitle.line3")}
              </p>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="grid">
          <div className="grid-left">
            <ColorsSection
              tokens={computed.tokens}
              presets={presets}
              values={{ accent, bg, bgCard, text, textSecondary }}
              setters={{ setAccent, setBg, setBgCard, setText, setTextSecondary }}
            />

            <TypographySection
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
          </div>
          <div className="grid-right">
            <WcagChecksSection checks={computed.checks} />

            <PreviewExportSection
              css={computed.css}
              canDownload={canDownload}
              onDownload={() => downloadZip({ tokens: computed.tokens, css: computed.css })}
              onCopy={() => navigator.clipboard.writeText(computed.css)}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
