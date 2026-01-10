import type React from "react";

export function cssVarsFromString(css: string): React.CSSProperties {
  const vars: Record<string, string> = {};
  const lines = css.split("\n");

  for (const line of lines) {
    const m = line.trim().match(/^--([^:]+):\s*(.+);$/);
    if (m) vars[`--${m[1]}`] = m[2];
  }
  return vars as React.CSSProperties;
}
