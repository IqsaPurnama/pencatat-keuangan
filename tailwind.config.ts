import type { Config } from "tailwindcss";

// Konfigurasi Tailwind CSS untuk mengatur tema warna dan palet aplikasi Ojol Finance
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna khas identitas aplikasi Ojol (Hijau segar untuk pendapatan, Merah untuk pengeluaran)
        ojol: {
          green: "#00AA13",
          darkGreen: "#00880F",
          lightGreen: "#E6F7E8",
          amber: "#F59E0B",
          slate: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
