/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontSize: {
      "display-xl": ["8rem", "10.875rem"],
      "display-base": ["6rem", "8.188rem"],
      "display-md": ["4.5rem", "6.125rem"],
      "heading-xl": ["3.75rem", "5.125rem"],
      "heading-lg": ["3rem", "4.063rem"],
      "heading-base": ["2.25rem", "3.063rem"],
      "heading-md": ["1.875rem", "2.563rem"],
      "heading-sm": ["1.5rem", "2.063rem"],
      "heading-xs": ["1.25rem", "1.75rem"],
      "body-lg": ["1.125rem", "1.75rem"],
      "body-base": ["1rem", "1.5rem"],
      "body-md": ["0.875rem", "1.25rem"],
      "caption-md": ["0.75rem", "1rem"],
      "caption-sm": ["0.625rem", "0.875rem"],
    },
    extend: {
      boxShadow: {
        "elevation-0": "1px 2px 3px rgba(0, 0, 0, 0.05)",
        "elevation-1":
          "-4px -4px 6px rgba(0, 0, 0, 0.04), 4px 4px 4px rgba(0, 0, 0, 0.04)",
        "elevation-2":
          "0px 15px 25px rgba(0, 0, 0, 0.06), 0px 5px 10px rgba(0, 0, 0, 0.08)",
        "elevation-3":
          "0px 20px 30px rgba(0, 0, 0, 0.06), 0px 10px 20px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: {
          100: "#111827",
        },
        base: {
          primary: {
            100: "#191863",
            90: "#2F2F72",
            80: "#464682",
            70: "#5E5D91",
            60: "#7574A1",
            50: "#8C8BB1",
            40: "#A3A2C0",
            30: "#BAB9D0",
            20: "#D1D0DF",
            10: "#E8E7EF",
          },
          neutral: {
            black: "#000000",
            white: "#FFFFFF",
            grey: {
              100: "#111827",
              90: "#1F2937",
              80: "#374151",
              70: "#4B5563",
              60: "#6B7280",
              50: "#9CA3AF",
              40: "#D1D5DB",
              30: "#E5E7EB",
              20: "#F3F4F6",
              10: "#F9FAFB",
            },
          },
          semantic: {
            success: {
              100: "#054F31",
              90: "#05603A",
              80: "#027A48",
              70: "#039855",
              60: "#12B76A",
              50: "#32D583",
              40: "#6CE9A6",
              30: "#A6F4C5",
              20: "#D1FADF",
              10: "#ECFDF3",
            },
            warning: {
              100: "#7A2E0E",
              90: "#93370D",
              80: "#B54708",
              70: "#DC6803",
              60: "#F79009",
              50: "#FDB022",
              40: "#FEC84B",
              30: "#FEDF89",
              20: "#FEF0C7",
              10: "#FFFAEB",
            },
            error: {
              100: "#7A271A",
              90: "#912018",
              80: "#B42318",
              70: "#D92D20",
              60: "#F04438",
              50: "#F97066",
              40: "#FDA29B",
              30: "#FECDCA",
              20: "#FEE4E2 ",
              10: "#FEF3F2",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
