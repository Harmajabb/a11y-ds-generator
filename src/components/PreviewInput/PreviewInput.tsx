/**
 * Ce composant est un input utilise dans la zone de previsualisation.
 * Il montre a quoi ressemblera un champ de saisie avec les couleurs choisies.
 *
 * CONCEPT CLE : PROPS SPREADING (propagation des props)
 * Ce composant accepte TOUTES les props d'un input HTML natif et les transmet
 * automatiquement avec la syntaxe {...props} (spread operator).
 */

import "./PreviewInput.css";

/**
 * React.InputHTMLAttributes<HTMLInputElement>
 *
 * C'est un type fourni par React qui contient TOUTES les props
 * qu'un <input> HTML peut recevoir :
 * - placeholder, value, onChange, disabled, type, min, max...
 *
 * En utilisant ce type, notre composant accepte n'importe quelle
 * prop d'input sans avoir a toutes les lister manuellement.
 */
type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function PreviewInput(props: Props) {
  return (
    /*
      {...props} = SPREAD OPERATOR
      Cette syntaxe "etale" toutes les proprietes de l'objet props
      comme attributs de l'element.

      Si props = { placeholder: "Texte", disabled: true }
      Alors {...props} devient placeholder="Texte" disabled={true}

      props.className ?? "" utilise l'operateur nullish coalescing :
      Si props.className existe, on l'utilise, sinon on met une chaine vide.
      Cela permet d'ajouter des classes supplementaires sans casser le style de base.
    */
    <input {...props} className={`previewInput ${props.className ?? ""}`} />
  );
}
