/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error": "#690005",
        "surface-container-highest": "#353534",
        "inverse-primary": "#005eb2",
        "surface": "#131313",
        "secondary-container": "#3e495d",
        "on-primary-container": "#002a55",
        "secondary-fixed-dim": "#bcc7de",
        "error": "#ffb4ab",
        "surface-dim": "#131313",
        "inverse-on-surface": "#313030",
        "surface-variant": "#353534",
        "surface-container-low": "#1c1b1b",
        "secondary": "#bcc7de",
        "on-secondary-container": "#aeb9d0",
        "surface-container-lowest": "#0e0e0e",
        "secondary-fixed": "#d8e3fb",
        "tertiary": "#ffb785",
        "on-primary-fixed-variant": "#004788",
        "on-tertiary-container": "#461f00",
        "surface-container-high": "#2a2a2a",
        "on-tertiary": "#502500",
        "primary-fixed": "#d5e3ff",
        "outline-variant": "#414753",
        "primary-container": "#3291ff",
        "surface-container": "#201f1f",
        "on-secondary-fixed-variant": "#3c475a",
        "on-primary-fixed": "#001b3c",
        "primary": "#a7c8ff",
        "error-container": "#93000a",
        "on-background": "#e5e2e1",
        "on-secondary": "#263143",
        "on-tertiary-fixed-variant": "#713700",
        "background": "#131313",
        "tertiary-container": "#e07302",
        "on-secondary-fixed": "#111c2d",
        "on-primary": "#003061",
        "outline": "#8a919f",
        "surface-bright": "#393939",
        "primary-fixed-dim": "#a7c8ff",
        "on-tertiary-fixed": "#301400",
        "inverse-surface": "#e5e2e1",
        "tertiary-fixed": "#ffdcc6",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#c0c6d5",
        "tertiary-fixed-dim": "#ffb785",
        "surface-tint": "#a7c8ff",
        "on-error-container": "#ffdad6"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        "margin-mobile": "16px",
        "margin-desktop": "48px",
        "container-max": "1280px",
        "base": "8px"
      },
      fontFamily: {
        "label-sm": ["JetBrains Mono"],
        "display-lg-mobile": ["Hanken Grotesk"],
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "body-md": ["Inter"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  },
  plugins: [],
}
