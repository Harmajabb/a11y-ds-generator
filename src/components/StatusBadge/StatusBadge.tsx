/**
 *
 * Ce composant affiche le resultat d'une verification d'accessibilite :
 * - Vert avec "AA PASS" si le contraste est suffisant
 * - Rouge avec "AA FAIL" si le contraste est insuffisant
 *
 * CONCEPT CLE : CLASSES CSS CONDITIONNELLES
 * On utilise un operateur ternaire pour ajouter dynamiquement une classe CSS
 * selon l'etat du composant. Cela change l'apparence sans JavaScript supplementaire.
 */

import "./StatusBadge.css";

/**
 * Props du composant (definition sur une seule ligne car simple)
 * - label : Description de la verification (ex: "Text on Background")
 * - value : Le ratio de contraste calcule (ex: "7.53")
 * - ok : true si la verification passe, false sinon
 */
type Props = { label: string; value: string; ok: boolean };

export function StatusBadge({ label, value, ok }: Props) {
  return (
    /*
      CLASSES CSS DYNAMIQUES avec template literals (backticks)
      `statusBadge ${ok ? "isOk" : "isFail"}`

      Si ok est true : className = "statusBadge isOk"
      Si ok est false : className = "statusBadge isFail"

      Dans le CSS, .isOk a un fond vert et .isFail a un fond rouge
    */
    <div className={`statusBadge ${ok ? "isOk" : "isFail"}`}>
      <span className="statusLabel">{label}</span>
      <strong className="statusValue">
        {value} — {ok ? "AA PASS" : "AA FAIL"}
      </strong>
    </div>
  );
}
