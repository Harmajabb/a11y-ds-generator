import { useTranslation } from "react-i18next";
import { StatusBadge } from "../../components/StatusBadge/StatusBadge";
import type { Checks } from "../../core/types";

type Props = {
  checks: Checks;
};

export function WcagChecksSection({ checks }: Props) {
  const { t } = useTranslation();

  return (
    <section className="card" aria-labelledby="wcag-checks-title">
      <h2 id="wcag-checks-title">{t("typography.wcagTitle")}</h2>
      <p className="hint">{t("typography.wcagIntro")}</p>

      <div className="stack">
        <StatusBadge
          label={t("typography.textOnBg")}
          value={checks.textOnBg.ratio ? checks.textOnBg.ratio.toFixed(2) : "-"}
          ok={checks.textOnBg.pass}
        />
        <StatusBadge
          label={t("typography.textSecondaryOnCard")}
          value={
            checks.textSecondaryOnCard.ratio ? checks.textSecondaryOnCard.ratio.toFixed(2) : "-"
          }
          ok={checks.textSecondaryOnCard.pass}
        />
        <StatusBadge
          label={t("typography.onAccent")}
          value={checks.onAccent.ratio ? checks.onAccent.ratio.toFixed(2) : "-"}
          ok={checks.onAccent.pass}
        />
        <p className="hint" style={{ marginTop: 2 }}>
          {t("typography.aaRule")}
        </p>
      </div>
    </section>
  );
}
