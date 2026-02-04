import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        keyColor: "var(--keyColor)",
      },
      height: {
        '1/12': '8.33%',
        '2/12': '16.66%',
        '3/12': '25%',
        '4/12': '33.33%',
        '5/12': '41.66%',
        '6/12': '50%',
        '7/12': '58.33%',
        '8/12': '66.66%',
        '9/12': '75%',
        '10/12': '83.33%',
        '11/12': '91.66%',
        '12/12': '100%',
      }
    },
  },
  plugins: [],
};
export default config;
