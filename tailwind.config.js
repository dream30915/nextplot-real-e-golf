import fs from "fs";

/** @type {import('tailwindcss').Config} */

let theme = {};
try {
  const themePath = "./theme.json";

  if (fs.existsSync(themePath)) {
    theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  }
} catch (err) {
  console.error('failed to parse custom styles', err)
}
const defaultTheme = {
  container: {
    center: true,
    padding: "2rem",
  },
  extend: {
    screens: {
      coarse: { raw: "(pointer: coarse)" },
      fine: { raw: "(pointer: fine)" },
      pwa: { raw: "(display-mode: standalone)" },
    },
    colors: {
      neutral: {
        1: "var(--color-muted)",
        2: "var(--color-card)",
        3: "var(--color-popover)",
        4: "var(--color-secondary)",
        5: "var(--color-muted)",
        6: "var(--color-border)",
        7: "var(--color-border)",
        8: "var(--color-border)",
        9: "var(--color-foreground)",
        10: "var(--color-foreground)",
        11: "var(--color-foreground)",
        12: "var(--color-foreground)",
        a1: "var(--color-muted)",
        a2: "var(--color-card)",
        a3: "var(--color-popover)",
        a4: "var(--color-secondary)",
        a5: "var(--color-muted)",
        a6: "var(--color-border)",
        a7: "var(--color-border)",
        a8: "var(--color-border)",
        a9: "var(--color-foreground)",
        a10: "var(--color-foreground)",
        a11: "var(--color-foreground)",
        a12: "var(--color-foreground)",
        contrast: "var(--color-background)",
      },
      accent: {
        1: "var(--color-accent)",
        2: "var(--color-accent)",
        3: "var(--color-accent)",
        4: "var(--color-accent)",
        5: "var(--color-accent)",
        6: "var(--color-accent)",
        7: "var(--color-accent)",
        8: "var(--color-accent)",
        9: "var(--color-accent)",
        10: "var(--color-accent)",
        11: "var(--color-accent)",
        12: "var(--color-accent)",
        contrast: "var(--color-accent-foreground)",
      },
      "accent-secondary": {
        1: "var(--color-secondary)",
        2: "var(--color-secondary)",
        3: "var(--color-secondary)",
        4: "var(--color-secondary)",
        5: "var(--color-secondary)",
        6: "var(--color-secondary)",
        7: "var(--color-secondary)",
        8: "var(--color-secondary)",
        9: "var(--color-secondary)",
        10: "var(--color-secondary)",
        11: "var(--color-secondary)",
        12: "var(--color-secondary)",
        contrast: "var(--color-secondary-foreground)",
      },
      fg: {
        DEFAULT: "var(--color-foreground)",
        secondary: "var(--color-muted-foreground)",
      },
      bg: {
        DEFAULT: "var(--color-background)",
        inset: "var(--color-card)",
        overlay: "var(--color-popover)",
      },
      "focus-ring": "var(--color-ring)",
    },
    borderRadius: {
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      "2xl": "var(--radius-2xl)",
      full: "var(--radius-full)",
    },
  },
  darkMode: ["selector", '[data-appearance="dark"]'],
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { ...defaultTheme, ...theme },
};