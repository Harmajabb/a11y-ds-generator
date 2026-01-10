import { describe, expect, it } from "vitest";
import { getContrastRatio } from "../contrast";

function pickOnAccent(accent: string): string {
  const black = "#000000";
  const white = "#ffffff";
  const cBlack = getContrastRatio(black, accent) ?? 0;
  const cWhite = getContrastRatio(white, accent) ?? 0;
  return cBlack > cWhite ? black : white;
}

describe("onAccent selection", () => {
  it("returns only black or white", () => {
    const on = pickOnAccent("#7c5cff");
    expect(["#000000", "#ffffff"]).toContain(on);
  });

  it("chooses the best contrast option", () => {
    const accent = "#7c5cff";
    const on = pickOnAccent(accent);
    const ratioChosen = getContrastRatio(on, accent) ?? 0;
    const ratioOther = getContrastRatio(on === "#000000" ? "#ffffff" : "#000000", accent) ?? 0;
    expect(ratioChosen).toBeGreaterThanOrEqual(ratioOther);
  });
});
