import "./ColorInput.css";

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
