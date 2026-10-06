#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

// `pnpm run add [components...] [shadcn flags]`
//
// With component names this is a plain passthrough to `shadcn add`. Without
// them it adds every component published for our style.
//
// We can't lean on the CLI's own picker (or --all) for that: it lists
// components from the global registry index, which also carries ones that are
// not published for every style. `questionnaire`, for instance, only exists for
// the radix-*/base-* styles, so on new-york it 404s and aborts the whole run.
const REGISTRY = "https://ui.shadcn.com/r";
// Flags whose next argument is a value, not a component name.
const VALUE_FLAGS = new Set(["-c", "--cwd", "-p", "--path", "--diff", "--view"]);

const args = process.argv
  .slice(2)
  .filter((arg) => arg !== "-a" && arg !== "--all");
const hasComponents = args.some(
  (arg, i) => !arg.startsWith("-") && !VALUE_FLAGS.has(args[i - 1]),
);

const components = hasComponents ? [] : await publishedComponents();

const { status } = spawnSync(
  "pnpm",
  ["dlx", "shadcn@latest", "add", ...components, ...args],
  { stdio: "inherit" },
);
process.exit(status ?? 1);

async function publishedComponents() {
  const { style } = JSON.parse(readFileSync("components.json", "utf8"));
  // The CLI serves Tailwind v4 projects on "new-york" from "new-york-v4".
  const registryStyle = style === "new-york" ? "new-york-v4" : style;

  const index = await fetch(`${REGISTRY}/index.json`).then((res) => res.json());
  const names = index
    .filter((item) => item.type === "registry:ui")
    .map((item) => item.name);

  const published = [];
  const missing = [];
  await Promise.all(
    names.map(async (name) => {
      const url = `${REGISTRY}/styles/${registryStyle}/${name}.json`;
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) published.push(name);
      else if (res.status === 404) missing.push(name);
      // Anything else is a registry hiccup: fail rather than silently drop it.
      else throw new Error(`${url} responded ${res.status}`);
    }),
  );

  if (missing.length > 0) {
    console.warn(
      `Skipping (not published for ${registryStyle}): ${missing.sort().join(", ")}`,
    );
  }
  return published.sort();
}
