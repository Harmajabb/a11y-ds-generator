import "./PreviewInput.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function PreviewInput(props: Props) {
  return <input {...props} className={`previewInput ${props.className ?? ""}`} />;
}
