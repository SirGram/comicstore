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
        sans: ['monospace','sans-serif'],
      },
     
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'dots': 'url(/assets/dots.png)',
      },
      colors: {
        main: "#A3E636",
        secondary: "#F5E66B",
        terciary: "#F5C6CB",
        mainAccent: "red",
        overlay: "rgb(200,210,200)",

        // light mode
        bg: "#E0E7F1",
        text: "#000",
        border: "#000",

        // dark mode
        darkBg: "#111903",
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
