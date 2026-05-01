/**
 * Type augmentations and runtime constants for the Phoenix Rebirth theme system.
 *
 * Importing this module once (typically at the app entry) augments React's
 * `HTMLAttributes` so that `data-theme` autocompletes the seven official
 * shadcn base styles while still accepting arbitrary strings.
 *
 * @example
 * ```tsx
 * import "@kanvas/phoenix-rebirth/themes";  // anywhere, once
 *
 * // Now data-theme autocompletes:
 * <html data-theme="lyra" className="dark">
 * ```
 */

export const PHOENIX_THEMES = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
] as const;

export type PhoenixTheme = (typeof PHOENIX_THEMES)[number];

declare module "react" {
  interface HTMLAttributes<T> {
    /**
     * Phoenix Rebirth visual theme. One of:
     * `vega` · `nova` · `maia` · `lyra` · `mira` · `luma` · `sera`.
     *
     * Pair with `className="dark"` for the dark variant of the same theme.
     */
    "data-theme"?: PhoenixTheme | (string & {});
  }
}
