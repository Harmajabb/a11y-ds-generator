export const uiTexts = {
  header: {
    title: "Design System Generator (A11Y-first)",
    subtitle: [
      "Cet outil permet de générer un design system accessible à partir de quelques réglages simples (couleurs, typographie et rayons).",
      "Les contrastes sont automatiquement vérifiés selon les critères WCAG 2.2 niveau AA.",
      "Tant que l'accessibilité n'est pas respectée, l'export est volontairement bloqué.",
    ],
  },

  colors: {
    title: "Couleurs",
    intro:
      "Définissez les couleurs principales de votre interface. Les couleurs secondaires (onAccent, hover, border) sont calculées automatiquement afin de garantir un contraste suffisant. Les changements sont appliqués en temps réel : privilégiez des ajustements progressifs.",
    accent: "Couleur principale d'action (boutons, liens, éléments interactifs).",
    bg: "Couleur de fond globale. Elle influence fortement la lisibilité du texte.",
    card: "Couleur de fond des blocs de contenu (cartes, panneaux). Utile pour créer une hiérarchie visuelle.",
    text: "Couleur du texte principal. Doit toujours respecter un contraste suffisant avec le fond.",
    textSecondary:
      "Texte secondaire (aides, métadonnées). Contraste vérifié automatiquement sur la couleur Card.",
    derivedTitle: "Couleurs dérivées",
    onAccent: "Auto-choisie (noir/blanc) pour maximiser le contraste sur Accent.",
    accentHover: "Générée depuis Accent via color-mix().",
    border: "Générée depuis la couleur de texte pour des séparateurs subtils.",
    presetsTitle: "Presets",
    presetsHelp: "Applique une combinaison de couleurs prête à l'emploi.",
  },

  typography: {
    title: "Typographie & Rayons",
    intro:
      "La typographie utilise des tailles fluides (clamp) pour s'adapter aux différentes tailles d'écran. Les valeurs sont saisies en px (compréhensible), puis converties en rem dans le CSS (meilleur pour le zoom et les préférences utilisateur).",
    clampHelp:
      "On fixe une taille minimale, une taille “idéale” qui varie avec la largeur d'écran, et une taille maximale : cela évite d'écrire des media queries juste pour la typo.",
    minLimit:
      "Par accessibilité, la taille minimale est limitée à 12px : en dessous, le texte devient vite difficile à lire (malvoyance, densité de pixels, zoom navigateur).",
    radiusHelp:
      "Les rayons définissent l'arrondi des composants : sm (petits éléments), md (boutons/cartes), lg (modales/panneaux). Des rayons cohérents améliorent la hiérarchie visuelle.",
    wcagTitle: "Vérifications WCAG",
    wcagIntro:
      "Ces vérifications garantissent le respect du niveau AA pour du texte normal (seuil 4.5:1). Le confort visuel dépend ensuite du contexte et des utilisateurs finaux.",
    aaRule: "AA = 4.5:1 pour texte normal.",
  },

  preview: {
    title: "Aperçu & Export",
    intro:
      "Aperçu des composants générés à partir des tokens. Une fois toutes les règles d'accessibilité validées, l'export devient disponible.",
    exportReady: "Export prêt ✅",
    exportBlocked: "Export bloqué (contraste AA requis) ❌",
    download: "Télécharger le ZIP",
    copy: "Copier theme.css",
    buttonLabel: "Bouton Accent",
    inputPlaceholder: "Champ accessible",
  },
} as const;
