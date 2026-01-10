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
