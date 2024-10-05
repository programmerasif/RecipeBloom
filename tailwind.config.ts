
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
const {
	default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1340px",
          xl: "1340px",
        },
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#b66055",
      },
      fontSize: {
        sub: ["1.25rem", { lineHeight: "1.75rem" }], // Define the default font size for "text-sub"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
	  boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }
export default config;
