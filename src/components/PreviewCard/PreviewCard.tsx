/**
 *
 * Ce composant affiche une carte complete avec :
 * - Un titre
 * - Un texte descriptif
 * - Des boutons d'action
 *
 * Il permet de visualiser plusieurs aspects du design system :
 * - Couleur de fond de carte (bgCard)
 * - Couleur de bordure
 * - Border-radius
 * - Couleur du texte secondaire
 *
 * CONCEPT CLE : VALEURS PAR DEFAUT DES PROPS
 * On peut definir des valeurs par defaut directement dans la destructuration.
 * Si le parent ne fournit pas la prop, la valeur par defaut est utilisee.
 */

import "./PreviewCard.css";

type Props = {
  title?: string;
  description?: string;
  meta?: string;
};

/**
 * VALEURS PAR DEFAUT DANS LA DESTRUCTURATION
 *
 * { title = "Valeur par defaut" } signifie :
 * - Si title est fourni par le parent : utiliser cette valeur
 * - Sinon : utiliser "Valeur par defaut"
 *
 * C'est plus concis que d'ecrire :
 * const title = props.title ?? "Valeur par defaut";
 */
export function PreviewCard({
  title = "Carte d'exemple",
  description = "Un bloc de contenu pour visualiser bgCard, border, radius et textSecondary.",
  meta = "Texte secondaire",
}: Props) {
  return (
    <article className="previewCard" aria-label="Apercu de carte">
      <header className="previewCardHeader">
        <h3 className="previewCardTitle">{title}</h3>
        <span className="previewCardMeta">{meta}</span>
      </header>

      <p className="previewCardDesc">{description}</p>

      <div className="previewCardActions">
        <button className="previewCardBtn" type="button">
          Action
        </button>
        <button type="button" className="previewCardLink" onClick={(e) => e.preventDefault()}>
          Lien secondaire
        </button>
      </div>
    </article>
  );
}
