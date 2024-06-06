import { Config } from "tailwindcss";

// Define the base Tailwind CSS configuration
const baseConfig: Config = {
  darkMode: ["class"],
  content: [
    "./node_modules/@kanvas/phoenix-rebirth/**/*.{js,ts,jsx,tsx,mdx,mjs,cjs}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

// Utility function to deeply merge two objects, preserving base properties
function deepMerge(base: any, custom: any): any {
  const result = { ...base };
  for (const key in custom) {
    if (custom.hasOwnProperty(key)) {
      if (typeof custom[key] === "object" && !Array.isArray(custom[key])) {
        result[key] = deepMerge(base[key] || {}, custom[key]);
      } else if (!base.hasOwnProperty(key)) {
        result[key] = custom[key];
      }
    }
  }
  return result;
}

// Function to create the Tailwind configuration
export function createTailwindConfig(
  customConfig: Partial<Config> = {}
): Config {
  const mergedConfig = deepMerge(baseConfig, customConfig);
  return {
    ...baseConfig,
    ...mergedConfig,
    //@ts-ignore
    content: [...baseConfig.content, ...customConfig.content],
    theme: {
      ...baseConfig.theme,
      ...mergedConfig.theme,
      extend: {
        ...baseConfig.theme?.extend,
        ...mergedConfig.theme?.extend,
      },
    },
    plugins: [...(baseConfig.plugins || []), ...(customConfig.plugins || [])],
  };
}
