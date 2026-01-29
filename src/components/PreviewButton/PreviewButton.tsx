import "./PreviewButton.css";

/**
 * Props du composant
 * React.ReactNode est le type pour "n'importe quel contenu React valide" :
 * - string ("texte")
 * - number (42)
 * - JSX (<span>element</span>)
 * - tableau de ces elements
 * - null ou undefined
 */
type Props = { children: React.ReactNode };

export function PreviewButton({ children }: Props) {
  return (
    <button type="button" className="previewButton">
      {children}
    </button>
  );
}
