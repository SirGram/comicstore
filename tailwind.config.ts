import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
          colors: {
            main: '#A3E636',
            mainAccent: '#88cc19', // not needed for shadcn components
            overlay: 'rgba(0,0,0,0.8)', 
            // background color overlay for alert dialogs, modals, etc.
      
            // light mode
            bg: '#E0E7F1',
            text: '#000',
            border: '#000',
      
            // dark mode
            darkBg: '#111903',
            darkText: '#eeefe9',
            darkBorder: '#000',
          },
          borderRadius: {
            base: '10px'
          },
          boxShadow: {
            light: '6px 6px 0px 0px #000',
            dark: '6px 6px 0px 0px #000',
          },
          translate: {
            boxShadowX: '6px',
            boxShadowY: '6px',
            reverseBoxShadowX: '-6px',
            reverseBoxShadowY: '-6px',
          },
          fontWeight: {
            base: '800',
            heading: '800',
          },
        },
  },
  plugins: [],
};
export default config;
