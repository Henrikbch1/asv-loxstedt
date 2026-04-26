const defaultApiBaseUrl = 'http://localhost:8055';

export const appConfig = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? defaultApiBaseUrl,
  assetsPath: import.meta.env.VITE_DIRECTUS_ASSETS_PATH ?? '/assets',
  defaultHomeSlug: import.meta.env.VITE_HOME_SLUG ?? 'home',
  apiToken: import.meta.env.VITE_DIRECTUS_TOKEN?.trim() || undefined,
  /** 'directus' (default) or 'static' – switches data source at build time */
  cmsMode: (import.meta.env.VITE_CMS_MODE ?? 'directus') as
    | 'directus'
    | 'static',
  /** Base path for static JSON data files (used when cmsMode === 'static') */
  staticDataBasePath:
    import.meta.env.VITE_STATIC_DATA_BASE_PATH ?? '/mock-cms',
  /** Base path for static asset files (used when cmsMode === 'static') */
  staticAssetsBasePath:
    import.meta.env.VITE_STATIC_ASSETS_BASE_PATH ?? '/mock-assets',
} as const;
