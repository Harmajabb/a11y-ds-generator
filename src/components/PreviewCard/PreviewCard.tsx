import "./PreviewCard.css";

type Props = {
  title?: string;
  description?: string;
  meta?: string;
};

export function PreviewCard({
  title = "Carte d'exemple",
  description = "Un bloc de contenu pour visualiser bgCard, border, radius et textSecondary.",
  meta = "Texte secondaire",
}: Props) {
  return (
    <article className="previewCard" aria-label="Aperçu de carte">
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
