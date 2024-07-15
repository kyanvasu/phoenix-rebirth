import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/global.css"],
    outDir: "dist",
  },
  {
    dts: true,
    entry: [
      "src/config",
      "src/lib",
      "src/store"
    ],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist",
    splitting: true,
    external: ["react", "react-dom", "next/link", "next/image", "next"],
    tsconfig: "./tsconfig.json",
    bundle: true,
    cjsInterop: true,
  },
  {
    dts: true,
    entry: ["src/components/ui"],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist/components/base",
    splitting: true,
    external: ["react", "react-dom", "next/link", "next/image", "next"],
    tsconfig: "./tsconfig.json",
    bundle: true,
    cjsInterop: true,
  },
  {
    dts: true,
    entry: ["src/components/icons"],
    format: ["esm", "cjs"],
    minify: true,
    target: "esnext",
    outDir: "dist/components/icons",
    splitting: true,
    external: ["react", "react-dom", "next/link", "next/image", "next"],
    tsconfig: "./tsconfig.json",
    bundle: true,
    cjsInterop: true,
  },
]);
