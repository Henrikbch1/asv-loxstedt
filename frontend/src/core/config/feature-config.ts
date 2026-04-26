/**
 * Central feature flags. Read from Vite env at runtime so the starter
 * project can disable optional modules without code changes.
 *
 * Use env vars: `VITE_FEATURE_NEWS`, `VITE_FEATURE_CALENDAR`, `VITE_FEATURE_BOARD`
 * accepted values: `true|false|1|0|yes|no` (case-insensitive). Defaults are `false`.
 */
function parseEnvBool(value: unknown, fallback = false): boolean {
  if (value === undefined || value === null) return fallback;
  const s = String(value).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes';
}

const env = (import.meta.env ?? {}) as Record<string, unknown>;

export const featureConfig = {
  news: {
    enabled: parseEnvBool(env.VITE_FEATURE_NEWS, true),
  },
  calendar: {
    enabled: parseEnvBool(env.VITE_FEATURE_CALENDAR, true),
  },
  board: {
    enabled: parseEnvBool(env.VITE_FEATURE_BOARD, true),
  },
} as const;

export type FeatureConfig = typeof featureConfig;
