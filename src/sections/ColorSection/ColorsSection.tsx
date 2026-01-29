/**

 * Cette section permet a l'utilisateur de :
 * - Choisir les 5 couleurs principales du design system
 * - Appliquer des presets (configurations pre-definies)
 * - Voir les couleurs derivees automatiquement (onAccent, hover, border)
 *
 * CONCEPTS CLES :
 * - Props : Donnees recues du composant parent (App.tsx)
 * - Types TypeScript : Definition stricte des donnees attendues
 * - Fonctions de callback : Les setters permettent de modifier l'etat du parent
 */

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

/**
 * Les fonctions pour modifier chaque couleur
 * Chaque fonction prend une nouvelle valeur (string) et ne retourne rien (void)
 */
type ColorSetters = {
  setAccent: (v: string) => void;
  setBg: (v: string) => void;
  setBgCard: (v: string) => void;
  setText: (v: string) => void;
  setTextSecondary: (v: string) => void;
};

/**
 * Structure des presets : un objet ou chaque cle est le nom du preset
 * et la valeur est un ensemble de couleurs (ColorValues)
 * Record<K, V> = objet avec des cles de type K et des valeurs de type V
 */
type Presets = Record<string, ColorValues>;

/**
 * Les props (proprietes) que ce composant attend de son parent
 * - tokens : Les tokens calcules (pour afficher les valeurs normalisees)
 * - values : Les valeurs actuelles des couleurs
 * - setters : Les fonctions pour modifier les couleurs
 * - presets : Les configurations pre-definies disponibles
 */
type Props = {
  tokens: Tokens;
  values: ColorValues;
  setters: ColorSetters;
  presets: Presets;
};

/**
 * ColorsSection - Affiche et gere la configuration des couleurs
 *
 * La destructuration { tokens, values, setters, presets } extrait directement
 * les proprietes de l'objet props. C'est equivalent a :
 * const tokens = props.tokens;
 * const values = props.values;
 * etc.
 */
export function ColorsSection({ tokens, values, setters, presets }: Props) {
  // Hook de traduction pour l'internationalisation
  const { t } = useTranslation();

  /**
   * Applique un preset en modifiant toutes les couleurs d'un coup
   *
   * @param name - Le nom du preset a appliquer (ex: "Default")
   *
   * Cette fonction :
   * 1. Recupere le preset par son nom dans l'objet presets
   * 2. Si le preset existe, appelle chaque setter avec la couleur correspondante
   */
  const applyPreset = (name: string) => {
    const p = presets[name];
    // Guard clause : si le preset n'existe pas, on sort de la fonction
    if (!p) return;
    // Applique chaque couleur du preset
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
        {/*
          onClick={() => applyPreset("Default")}
          Cree une fonction anonyme qui appelle applyPreset avec l'argument "Default"
          On ne peut pas ecrire onClick={applyPreset("Default")} car cela
          executerait la fonction immediatement au lieu d'attendre le clic
        */}
        <button className="btn" type="button" onClick={() => applyPreset("Default")}>
          {t("colors.applyDefault")}
        </button>
        <button className="btn" type="button" onClick={() => applyPreset("High contrast dark")}>
          {t("colors.applyHighContrast")}
        </button>
      </section>

      <div className="controls">
        {/*
          ColorInput est un composant reutilisable pour saisir une couleur.
          Il recoit :
          - id : Identifiant unique pour le label/input
          - label : Texte affiche a cote du champ
          - value : La valeur actuelle (code hex)
          - onChange : Fonction appelee quand l'utilisateur change la couleur
          - displayValue : La valeur normalisee a afficher
          - hint : Texte d'aide optionnel
        */}
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
        {/*
          ColorSwatch affiche un apercu visuel d'une couleur
          Ces couleurs sont "derivees" = calculees a partir des couleurs principales
        */}
        <ColorSwatch
          label="onAccent"
          value={tokens.colors.onAccent}
          rightText={tokens.colors.onAccent}
          description={t("colors.onAccent")}
        />
        <ColorSwatch
          label="accentHover"
          value="var(--color-accentHover)"
          rightText="CSS derive"
          description={t("colors.accentHover")}
        />
        <ColorSwatch
          label="border"
          value="var(--color-border)"
          rightText="CSS derive"
          description={t("colors.border")}
        />
      </section>
    </section>
  );
}
