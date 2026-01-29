/**
 * Ce composant combine deux methodes de saisie de couleur :
 * 1. Un color picker natif (la roue de couleurs du navigateur)
 * 2. Un champ texte pour taper directement le code hexadecimal
 *
 * Les deux inputs sont synchronises : modifier l'un met a jour l'autre.
 *
 * CONCEPT CLE : COMPOSANT REUTILISABLE
 * Ce composant est utilise 5 fois dans ColorsSection avec des props differentes.
 * Au lieu de copier-coller le meme code 5 fois, on cree un composant
 * parametrable via ses props.
 * 
 * Props du composant
 * - id : Identifiant unique pour lier le label a l'input (accessibilite)
 * - label : Le nom de la couleur affiche (ex: "Accent", "Background")
 * - value : La valeur actuelle de la couleur (code hex comme "#7c5cff")
 * - onChange : Fonction appelee quand l'utilisateur modifie la couleur
 * - displayValue : Valeur normalisee a afficher (peut differer de value)
 * - hint : Texte d'aide optionnel (le "?" indique que c'est optionnel)
 */
type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  displayValue: string;
  hint?: string;
};

export function ColorInput({ id, label, value, onChange, displayValue, hint }: Props) {
  return (
    <div className="field">
      <div className="labelRow">
        <label htmlFor={id}>{label}</label>
        <span>{displayValue}</span>
      </div>
      {hint && <p className="hintInline">{hint}</p>}

      <div className="row">
        <input
          id={id}
          className="color"
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Choisir la couleur ${label}`}
        />
        <input
          className="textInput"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Couleur ${label} (hex)`}
        />
      </div>
    </div>
  );
}
