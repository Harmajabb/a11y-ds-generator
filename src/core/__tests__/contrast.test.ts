import { describe, expect, it } from "vitest";
import { getContrastRatio, passesAA, pickOnAccent } from "../contrast";

describe("WCAG contrast helpers", () => {
  it("computes a valid ratio for black on white", () => {
    const ratio = getContrastRatio("#000000", "#ffffff");
    expect(ratio).not.toBeNull();
    expect(ratio as number).toBeGreaterThanOrEqual(21);
  });

  it("passes AA for normal text when ratio >= 4.5", () => {
    expect(passesAA(4.5, false)).toBe(true);
    expect(passesAA(4.49, false)).toBe(false);
  });

  describe("pickOnAccent", () => {
    it("returns black for light accent colors", () => {
      expect(pickOnAccent("#ffff00")).toBe("#000000"); // yellow
      expect(pickOnAccent("#00ff00")).toBe("#000000"); // green
      expect(pickOnAccent("#ffffff")).toBe("#000000"); // white
    });

    it("returns white for dark accent colors", () => {
      expect(pickOnAccent("#0000ff")).toBe("#ffffff"); // blue
      expect(pickOnAccent("#8b0000")).toBe("#ffffff"); // dark red
      expect(pickOnAccent("#000000")).toBe("#ffffff"); // black
    });

    it("handles medium contrast colors correctly", () => {
      expect(pickOnAccent("#7c5cff")).toBe("#000000"); // light purple
      expect(pickOnAccent("#4a90e2")).toBe("#000000"); // medium blue
    });

    it("returns black for invalid colors (fallback)", () => {
      // When both contrasts are 0 (invalid color), >= makes it return black (first branch)
      expect(pickOnAccent("invalid")).toBe("#000000");
      expect(pickOnAccent("")).toBe("#000000");
      expect(pickOnAccent("not-a-color")).toBe("#000000");
    });
  });

  it("returns null for invalid colors in getContrastRatio", () => {
    expect(getContrastRatio("invalid", "#ffffff")).toBeNull();
    expect(getContrastRatio("#ffffff", "invalid")).toBeNull();
    expect(getContrastRatio("invalid", "invalid")).toBeNull();
  });

  it("handles large text threshold correctly", () => {
    expect(passesAA(3, false)).toBe(false); // Normal text KO
    expect(passesAA(3, true)).toBe(true); // Large text OK
    expect(passesAA(4.5, true)).toBe(true); // Large text OK
  });

  it("returns false when ratio is null", () => {
    expect(passesAA(null, false)).toBe(false);
    expect(passesAA(null, true)).toBe(false);
  });
});
