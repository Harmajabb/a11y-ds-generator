import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
  buttonTemplate,
  componentsIndexTemplate,
  inputTemplate,
  tailwindConfigTemplate,
} from "./templates";
import type { Tokens } from "./types";

function pxToRem(px: number, rootPx = 16) {
  return `${px / rootPx}rem`;
}

function clampFont(minPx: number, preferredPx: number, maxPx: number, fluidVw: number) {
  return `clamp(${pxToRem(minPx)}, ${pxToRem(preferredPx)} + ${fluidVw}vw, ${pxToRem(maxPx)})`;
}

export function tokensToCssVariables(tokens: Tokens): string {
  const { colors, typography, radius } = tokens;

  const lines: string[] = [];
  lines.push(":root {");

  // Base colors (5 inputs + onAccent)
  Object.entries(colors).forEach(([k, v]) => {
    lines.push(`  --color-${k}: ${v};`);
  });

  // Derived colors
  lines.push(`  --color-border: color-mix(in srgb, var(--color-text) 18%, transparent);`);
  lines.push(`  --color-accentHover: color-mix(in srgb, var(--color-accent) 84%, white);`);

  // Typography
  lines.push(
    `  --font-size-base: ${clampFont(
      typography.base.minPx,
      typography.base.preferredPx,
      typography.base.maxPx,
      typography.base.fluidVw,
    )};`,
  );
  lines.push(`  --line-height-base: ${typography.lineHeight};`);

  // Radius (rem)
  Object.entries(radius).forEach(([k, v]) => {
    lines.push(`  --radius-${k}: ${pxToRem(v)};`);
  });

  // Shadow token
  lines.push(`  --shadow-soft: 0 12px 40px rgba(0, 0, 0, 0.35);`);

  lines.push("}");
  return lines.join("\n");
}

export async function downloadZip(args: { tokens: Tokens; css: string }): Promise<void> {
  const zip = new JSZip();

  zip.file("tokens.json", JSON.stringify(args.tokens, null, 2));
  zip.file("theme.css", args.css);
  zip.file("tailwind.config.cjs", tailwindConfigTemplate());

  const folder = zip.folder("components");
  folder?.file("Button.tsx", buttonTemplate());
  folder?.file("Input.tsx", inputTemplate());
  folder?.file("index.ts", componentsIndexTemplate());

  const readme = [
    "# A11Y Design System Generator (React)",
    "",
    "Generate an A11Y-first design system for React apps, with WCAG 2.2 AA guarantees.",
    "",
    "- CSS variables (`theme.css`)",
    "- Tokens (`tokens.json`)",
    "- React components",
    "- Tailwind config",
    "",
    "## Usage (CSS only)",
    "",
    "```css",
    '@import "./theme.css";',
    "",
    ".card {",
    "  background: var(--color-bgCard);",
    "  color: var(--color-text);",
    "  border: 1px solid var(--color-border);",
    "}",
    "```",
    "",
    "## Usage with Tailwind",
    "",
    "Tailwind classes are mapped to CSS variables generated in `theme.css`.",
    "",
    "1. Import `theme.css` globally",
    "2. Copy `tailwind.config.cjs`",
    "",
    "```jsx",
    '<button className="bg-accent text-white rounded-md shadow-soft">',
    "  Primary action",
    "</button>",
    "```",
    "",
    "## React components",
    "",
    "```ts",
    'import { Button, Input } from "./components";',
    "```",
    "",
    "## Accessibility (WCAG 2.2 AA)",
    "",
    "WCAG AA checks enforced:",
    "- text on background",
    "- secondary text on card",
    "- onAccent on accent",
    "",
    "**Derived tokens are generated automatically:**",
    "- border",
    "- accentHover",
    "",
  ].join("\n");

  zip.file("README.md", readme);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "design-system.zip");
}
