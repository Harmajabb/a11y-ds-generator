import { useTranslation } from "react-i18next";

type Props = {
  id: string;
  label: string;
  labelLang?: string;
  value: string;
  onChange: (value: string) => void;
  displayValue: string;
  hint?: string;
};

export function ColorInput({ id, label, labelLang, value, onChange, displayValue, hint }: Props) {
  const { t } = useTranslation();

  return (
    <div className="field">
      <div className="labelRow">
        <label htmlFor={id} {...(labelLang ? { lang: labelLang } : {})}>
          {label}
        </label>
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
          aria-label={t("colors.ariaChooseColor", { label })}
        />
        <input
          id={`${id}-hex`}
          className="textInput"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={t("colors.ariaColorHex", { label })}
        />
      </div>
    </div>
  );
}
