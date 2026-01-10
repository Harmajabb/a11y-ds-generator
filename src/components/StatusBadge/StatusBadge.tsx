import "./StatusBadge.css";

type Props = { label: string; value: string; ok: boolean };

export function StatusBadge({ label, value, ok }: Props) {
  return (
    <div className={`statusBadge ${ok ? "isOk" : "isFail"}`}>
      <span className="statusLabel">{label}</span>
      <strong className="statusValue">
        {value} — {ok ? "AA PASS" : "AA FAIL"}
      </strong>
    </div>
  );
}
