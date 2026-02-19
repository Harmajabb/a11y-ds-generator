import "./PreviewButton.css";

type Props = { children: React.ReactNode };

export function PreviewButton({ children }: Props) {
  return (
    <button type="button" className="previewButton">
      {children}
    </button>
  );
}
