/**
 * Ce composant affiche un apercu visuel d'une couleur avec :
 * - Un petit carre colore (le "chip")
 * - Le nom de la couleur
 * - Une valeur optionnelle (ex: le code hex)
 * - Une description optionnelle
 * - Un apercu "Aa" pour voir le rendu du texte
 *
 * CONCEPT CLE : CSS CUSTOM PROPERTIES (Variables CSS)
 * Ce composant utilise des variables CSS dynamiques definies via l'attribut style.
 * Le CSS du composant utilise ensuite ces variables avec var(--nom-variable).
 */
import "./ColorSwatch.css";

type Props = {
  label: string;
  value: string;
  rightText?: string;
  description?: string;
  textColor?: string;
};

export function ColorSwatch({ label, value, rightText, description, textColor }: Props) {
  return (
    <div
      className="swatch"
      style={
        {
          "--swatch-bg": value,
          "--swatch-text": textColor ?? "var(--color-text)",
        } as React.CSSProperties
      }
    >
      <div className="swatchLeft">
        <span className="swatchChip" aria-hidden="true" />
        <div className="swatchMeta">
          <div className="swatchTop">
            <span className="swatchLabel">{label}</span>
            {rightText ? <span className="swatchValue">{rightText}</span> : null}
          </div>
          {description ? <p className="swatchDesc">{description}</p> : null}
        </div>
      </div>

      <span className="swatchTextPreview">Aa</span>
    </div>
  );
}
