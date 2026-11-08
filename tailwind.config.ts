import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "inverse-bg": "var(--inverse-bg)",
        "inverse-text": "var(--inverse-text)",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      /* CL-6: one semantic ramp. Components pick a role, never a size. */
      fontSize: {
        display: ["clamp(2rem, 1.59rem + 3.24vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.25rem", { lineHeight: "1.3" }],
        body: ["1rem", { lineHeight: "1.65" }],
        meta: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        control: ["0.875rem", { lineHeight: "1.4" }],
      },
      maxWidth: {
        editorial: "1280px",
      },
      height: {
        header: "var(--header-h)",
      },
      inset: {
        header: "var(--header-h)",
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
