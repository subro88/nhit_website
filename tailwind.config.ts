import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nhit: {
          crimson: "#C10A0C",
          heading: "#9E0B0F",
          flame: "#FF3115",
          ink: "#0F172A",
          charcoal: "#212121",
          slate: "#334155",
          muted: "#64748B",
          surface: "#F8FAFC",
        },
        dept: {
          cst: "#0EA5E9",
          me: "#F97316",
          etce: "#8B5CF6",
          ee: "#F59E0B",
          ce: "#0284C7",
          ae: "#EF4444",
          itiEle: "#10B981",
          itiFit: "#6366F1",
        },
      },
      borderRadius: {
        stadium: "60px",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      boxShadow: {
        faculty: "0 6px 22px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(193, 10, 12, 0.04)",
        facultyHover: "0 18px 40px rgba(15, 23, 42, 0.12), 0 0 24px rgba(193, 10, 12, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
