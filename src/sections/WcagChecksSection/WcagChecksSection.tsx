/**
 * Cette section affiche les resultats des verifications de contraste WCAG.
 *
 * LE RATIO DE CONTRASTE
 * C'est la difference de luminosite entre deux couleurs (texte et fond).
 * - Ratio 1:1 = meme couleur (invisible)
 * - Ratio 21:1 = noir sur blanc (contraste maximum)
 *
 * NIVEAU AA (le standard)
 * - Texte normal : ratio >= 4.5:1
 * - Grand texte (>18px bold ou >24px) : ratio >= 3:1
 *
 * Cette section verifie 3 combinaisons de couleurs :
 * 1. Texte principal sur fond (text on bg)
 * 2. Texte secondaire sur carte (textSecondary on bgCard)
 * 3. Texte sur couleur d'accent (onAccent on accent)
 */

import { useTranslation } from "react-i18next";
import { StatusBadge } from "../../components/StatusBadge/StatusBadge";
import type { Checks } from "../../core/types";

/**
 * Props du composant
 * checks : Objet contenant les resultats des 3 verifications WCAG
 * Chaque verification a :
 * - ratio : Le ratio de contraste calcule (ex: 7.53)
 * - pass : true si le ratio >= 4.5 (niveau AA)
 */
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
        {/*
          StatusBadge affiche le resultat d'une verification :
          - label : Description de ce qui est verifie
          - value : Le ratio calcule (arrondi a 2 decimales)
          - ok : true = vert (PASS), false = rouge (FAIL)

          L'operateur ternaire (condition ? siVrai : siFaux) permet
          d'afficher "-" si le ratio n'est pas disponible
        */}
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
