import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["monospace", "sans-serif"],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        dots: "url(/assets/dots.png)",
      },
      colors: {
        main: "#7a7ad8",
        secondary: "#93d0fc",
        terciary: "#F5C6CB",
        mainAccent: "#ff7863",
        overlay: "#6fcb9f",

        // light mode
        bg: "#f0b51f",
        text: "#000",
        border: "#000",

        // dark mode
        darkBg: "#f0b51f",
        darkText: "#eeefe9",
        darkBorder: "#000",
      },
      borderRadius: {
        base: "12px",
      },
      boxShadow: {
        light: "6px 6px 0px 0px #000",
        dark: "6px 6px 0px 0px #000",
      },
      translate: {
        boxShadowX: "6px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-6px",
        reverseBoxShadowY: "-6px",
      },
      fontWeight: {
        base: "800",
        heading: "800",
      },
    },
  },
  plugins: [],
};
export default config;
