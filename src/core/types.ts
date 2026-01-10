export type Tokens = {
  meta: { name: string; version: string };
  colors: {
    bg: string;
    bgCard: string;
    text: string;
    textSecondary: string;
    accent: string;
    onAccent: string;
  };
  typography: {
    base: {
      minPx: number;
      preferredPx: number;
      maxPx: number;
      fluidVw: number;
    };
    lineHeight: number;
  };
  radius: { sm: number; md: number; lg: number };
};

export type Checks = {
  textOnBg: { ratio: number | null; pass: boolean };
  textSecondaryOnCard: { ratio: number | null; pass: boolean };
  onAccent: { ratio: number | null; pass: boolean };
};
