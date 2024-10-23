import MillionLint from "@million/lint";

interface LinterOptions {
  optimizeDOM?: boolean;
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export function createLintConfig(
  opts: LinterOptions,
  nxtConfig: typeof nextConfig,
) {
  return MillionLint.next({
    rsc: true,
    ...opts,
  })(nxtConfig);
}
