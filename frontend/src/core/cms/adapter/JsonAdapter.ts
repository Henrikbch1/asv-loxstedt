import { appConfig } from '@/core/config/env';
import type {
  DirectusListResponse,
  DirectusSingletonResponse,
} from '@/shared/types/directus';

type DemoCmsManifest = {
  global_settings: DirectusSingletonResponse<unknown>;
  navigation: DirectusListResponse<unknown>;
  pages: DirectusListResponse<unknown>;
  news: DirectusListResponse<unknown>;
  downloads: DirectusListResponse<unknown>;
  features: DirectusListResponse<unknown>;
  roles: DirectusListResponse<unknown>;
};

let demoManifestPromise: Promise<DemoCmsManifest> | null = null;

function getDemoManifestUrl(): string {
  const dataPath = appConfig.demoDataPath.replace(/^\/+/, '');
  return new URL(`${dataPath}/cms.json`, import.meta.env.BASE_URL).toString();
}

async function loadDemoManifest(): Promise<DemoCmsManifest> {
  if (!demoManifestPromise) {
    demoManifestPromise = fetch(getDemoManifestUrl()).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Unable to load demo CMS data: ${response.status}`);
      }

      return (await response.json()) as DemoCmsManifest;
    });
  }

  return demoManifestPromise;
}

function cloneValue<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

function isEntityPath(path: string, collection: string): boolean {
  return path === `/items/${collection}`;
}

function isSingletonPath(path: string, collection: string): boolean {
  return (
    path === `/items/${collection}` || path === `/items/${collection}/singleton`
  );
}

function resolveNewsById(
  manifest: DemoCmsManifest,
  path: string,
): DirectusSingletonResponse<unknown> | null {
  const match = path.match(/^\/items\/news\/([^/?#]+)$/);

  if (!match) {
    return null;
  }

  const id = decodeURIComponent(match[1]);
  const item = manifest.news.data.find(
    (entry) => String((entry as { id?: string | number }).id) === id,
  );

  return item ? { data: item } : null;
}

export async function fetchDemoDirectus<T>(path: string): Promise<T> {
  const manifest = await loadDemoManifest();

  if (isSingletonPath(path, 'global_settings')) {
    return cloneValue(manifest.global_settings) as T;
  }

  if (isEntityPath(path, 'navigation')) {
    return cloneValue(manifest.navigation) as T;
  }

  if (isEntityPath(path, 'pages')) {
    return cloneValue(manifest.pages) as T;
  }

  if (isEntityPath(path, 'downloads')) {
    return cloneValue(manifest.downloads) as T;
  }

  if (isEntityPath(path, 'features')) {
    return cloneValue(manifest.features) as T;
  }

  if (isEntityPath(path, 'roles')) {
    return cloneValue(manifest.roles) as T;
  }

  if (isEntityPath(path, 'news')) {
    return cloneValue(manifest.news) as T;
  }

  const newsById = resolveNewsById(manifest, path);
  if (newsById) {
    return cloneValue(newsById) as T;
  }

  throw new Error(`No demo data mapping exists for ${path}`);
}
