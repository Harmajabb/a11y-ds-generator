import { formatHex, parse, wcagContrast } from "culori";

export function normalizeHex(color: string): string | null {
  const c = parse(color);
  if (!c) return null;
  return formatHex(c);
}

export function getContrastRatio(fg: string, bg: string): number | null {
  const f = parse(fg);
  const b = parse(bg);
  if (!f || !b) return null;
  return wcagContrast(f, b);
}

export function passesAA(ratio: number | null, isLargeText = false): boolean {
  if (ratio == null) return false;
  return ratio >= (isLargeText ? 3 : 4.5);
}

export function pickOnAccent(bgColor: string): string {
  const black = "#000000";
  const white = "#ffffff";
  const contrastBlack = getContrastRatio(black, bgColor) ?? 0;
  const contrastWhite = getContrastRatio(white, bgColor) ?? 0;
  return contrastBlack >= contrastWhite ? black : white;
}
