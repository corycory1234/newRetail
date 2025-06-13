/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xlg: '1280px',
    },
    extend: {},
  },
  plugins: [],
};

export default config;

