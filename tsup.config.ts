import { defineConfig } from "tsup";

export default defineConfig([
  {
    dts: true,
    entry: [
      "src/views",
      "src/theme",
      "src/translate",
      "src/model",
      "src/client",
    ],
    format: ["esm"],
    minify: true,
    target: "esnext",
    outDir: "dist",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    dts: false,
    entry: ["src/legacy"],
    format: ["esm"],
    minify: true,
    target: "esnext",
    outDir: "dist/legacy",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
  },
  {
    entry: ["src/components/ui"],
    format: ["esm"],
    minify: true,
    target: "esnext",
    outDir: "dist/ui",
    splitting: true,
    external: ["react", "react-dom"],
    tsconfig: "./tsconfig.json",
    dts: true,
  },
]);
