import type { Tokens } from "./types";

export function buildTokens(input: Omit<Tokens, "meta"> & { meta?: Tokens["meta"] }): Tokens {
  return {
    meta: input.meta ?? { name: "A11Y DS Generator", version: "0.1.0" },
    colors: input.colors,
    typography: input.typography,
    radius: input.radius,
  };
}
