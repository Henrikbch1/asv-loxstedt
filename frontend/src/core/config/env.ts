const defaultApiBaseUrl = 'http://localhost:8055';

export const appConfig = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? defaultApiBaseUrl,
  assetsPath: import.meta.env.VITE_DIRECTUS_ASSETS_PATH ?? '/assets',
  defaultHomeSlug: import.meta.env.VITE_HOME_SLUG ?? 'home',
  apiToken: import.meta.env.VITE_DIRECTUS_TOKEN?.trim() || undefined,
} as const;
