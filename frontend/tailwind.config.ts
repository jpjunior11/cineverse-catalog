// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    // ... suas paths de content
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ...
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('@tailwindcss/typography'), // Adicionado
    require('@tailwindcss/line-clamp'),  // Adicionado
  ],
};
export default config;