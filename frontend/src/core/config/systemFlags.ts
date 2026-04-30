/**
 * systemFlags.ts – read-only runtime flags derived from build-time env vars.
 * Extends feature-config.ts with system-level flags (not feature toggles).
 */
export const systemFlags = {
  /** True when running in a Vite dev server. */
  isDev: import.meta.env.DEV,
  /** True when building for production. */
  isProd: import.meta.env.PROD,
} as const;
