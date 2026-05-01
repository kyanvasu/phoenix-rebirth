#!/usr/bin/env node
import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const TMP = join(ROOT, ".tmp/themes");
const OUT = join(ROOT, "src/themes");
const STYLES = ["vega", "nova", "maia", "lyra", "mira", "luma", "sera"];

// Per-style font configuration: matches what `pnpm dlx shadcn@latest init --preset X` ships.
// Lyra deliberately maps --font-sans to JetBrains Mono so existing components (which use
// font-sans semantically) render mono without changes to global.css.
const FONT_CONFIG = {
  vega: { imports: [], vars: {} },
  nova: {
    imports: ["@fontsource-variable/geist"],
    vars: {
      "--font-sans": "'Geist Variable', sans-serif",
      "--font-heading": "'Geist Variable', sans-serif",
    },
  },
  maia: {
    imports: ["@fontsource-variable/figtree"],
    vars: {
      "--font-sans": "'Figtree Variable', sans-serif",
      "--font-heading": "'Figtree Variable', sans-serif",
    },
  },
  lyra: {
    imports: ["@fontsource-variable/jetbrains-mono"],
    vars: {
      "--font-sans": "'JetBrains Mono Variable', monospace",
      "--font-mono": "'JetBrains Mono Variable', monospace",
      "--font-heading": "'JetBrains Mono Variable', monospace",
    },
  },
  mira: {
    imports: ["@fontsource-variable/inter"],
    vars: {
      "--font-sans": "'Inter Variable', sans-serif",
      "--font-heading": "'Inter Variable', sans-serif",
    },
  },
  luma: {
    imports: ["@fontsource-variable/inter"],
    vars: {
      "--font-sans": "'Inter Variable', sans-serif",
      "--font-heading": "'Inter Variable', sans-serif",
    },
  },
  sera: {
    imports: [
      "@fontsource-variable/noto-sans",
      "@fontsource-variable/playfair-display",
    ],
    vars: {
      "--font-sans": "'Noto Sans Variable', sans-serif",
      "--font-heading": "'Playfair Display Variable', serif",
    },
  },
};

const FONT_VARS = new Set([
  "--font-sans",
  "--font-mono",
  "--font-heading",
  "--font-serif",
]);

function extractBlock(css, headerRegex) {
  const m = css.match(headerRegex);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1;
  let i = start;
  while (i < css.length && depth > 0) {
    const c = css[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

function parseDecls(body) {
  if (!body) return [];
  return body
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("--"))
    .map((s) => {
      const idx = s.indexOf(":");
      return { name: s.slice(0, idx).trim(), value: s.slice(idx + 1).trim() };
    });
}

function ensureSandbox(style) {
  const dir = join(TMP, style);
  const cssPath = join(dir, style, "src/index.css");
  if (existsSync(cssPath)) return cssPath;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  console.log(`  ↳ initializing shadcn sandbox (preset=${style})…`);
  execSync(
    `pnpm dlx shadcn@latest init --preset ${style} --name ${style} -y --template vite --silent`,
    { cwd: dir, stdio: "inherit" },
  );
  return cssPath;
}

function buildTheme(style) {
  console.log(`→ ${style}`);
  const cssPath = ensureSandbox(style);
  const css = readFileSync(cssPath, "utf8");

  const root = extractBlock(css, /:root\s*\{/);
  const dark = extractBlock(css, /\.dark\s*\{/);

  // Strip the sandbox's font vars; we re-emit our own from FONT_CONFIG so the
  // theme is a single source of truth and Lyra can override --font-sans to mono.
  const rootDecls = parseDecls(root).filter((d) => !FONT_VARS.has(d.name));
  const darkDecls = parseDecls(dark).filter((d) => !FONT_VARS.has(d.name));

  const { imports, vars } = FONT_CONFIG[style];
  const fontDecls = Object.entries(vars).map(([name, value]) => ({
    name,
    value,
  }));

  const lines = [
    `/* Auto-generated from shadcn preset "${style}". Do not edit by hand. */`,
    `/* Run: pnpm build:themes */`,
    "",
    ...imports.map((p) => `@import "${p}";`),
    imports.length ? "" : null,
    `[data-theme="${style}"] {`,
    ...rootDecls.map((d) => `  ${d.name}: ${d.value};`),
    ...fontDecls.map((d) => `  ${d.name}: ${d.value};`),
    `}`,
    "",
    `[data-theme="${style}"].dark {`,
    ...darkDecls.map((d) => `  ${d.name}: ${d.value};`),
    `}`,
    "",
  ].filter((l) => l !== null);
  writeFileSync(join(OUT, `${style}.css`), lines.join("\n"));
}

mkdirSync(OUT, { recursive: true });
for (const s of STYLES) buildTheme(s);

// CSS @import rules must come before any other rule, so the index.css hoists
// all unique font imports to the top, then re-imports each theme file.
const allFontImports = [
  ...new Set(STYLES.flatMap((s) => FONT_CONFIG[s].imports)),
];
const indexCss = [
  "/* Auto-generated barrel. Imports every theme variant. */",
  ...allFontImports.map((p) => `@import "${p}";`),
  ...STYLES.map((s) => `@import "./${s}.css";`),
  "",
].join("\n");
writeFileSync(join(OUT, "index.css"), indexCss);

console.log(`\n✓ wrote ${STYLES.length + 1} files to src/themes/`);
console.log("  tip: 'rm -rf .tmp' to clear sandbox cache");
