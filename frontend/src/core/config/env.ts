const defaultApiBaseUrl = 'http://localhost:8055';
const defaultCmsMode = 'auto';

export const appConfig = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? defaultApiBaseUrl,
  assetsPath: import.meta.env.VITE_DIRECTUS_ASSETS_PATH ?? '/assets',
  demoAssetsPath: import.meta.env.VITE_DEMO_ASSETS_PATH ?? '/demo/assets',
  demoDataPath: import.meta.env.VITE_DEMO_DATA_PATH ?? '/demo',
  defaultHomeSlug: import.meta.env.VITE_HOME_SLUG ?? 'home',
  apiToken: import.meta.env.VITE_DIRECTUS_TOKEN?.trim() || undefined,
  cmsMode:
    (import.meta.env.VITE_CMS_MODE?.trim() ?? defaultCmsMode) === 'demo'
      ? 'demo'
      : (import.meta.env.VITE_CMS_MODE?.trim() ?? defaultCmsMode) === 'directus'
        ? 'directus'
        : 'auto',
} as const;
