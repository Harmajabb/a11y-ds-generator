import { describe, expect, it } from "vitest";
import { tokensToCssVariables } from "../exporters";
import type { Tokens } from "../types";

describe("CSS export", () => {
  it("includes required CSS variables", () => {
    const tokens: Tokens = {
      meta: { name: "test", version: "0" },
      colors: {
        bg: "#0a0a12",
        bgCard: "#14151b",
        text: "#f3f3f7",
        textSecondary: "#c7c2d6",
        accent: "#7c5cff",
        onAccent: "#000000",
      },
      typography: {
        base: { minPx: 15, preferredPx: 16, maxPx: 18, fluidVw: 0.2 },
        lineHeight: 1.55,
      },
      radius: { sm: 10, md: 14, lg: 18 },
    };

    const css = tokensToCssVariables(tokens);

    expect(css).toContain("--color-bg:");
    expect(css).toContain("--color-accent:");
    expect(css).toContain("--color-onAccent:");
    expect(css).toContain("--color-border:");
    expect(css).toContain("--font-size-base:");
    expect(css).toContain("--radius-md:");
    expect(css).toContain("clamp(");
  });
});
