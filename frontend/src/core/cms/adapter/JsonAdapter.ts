import type {
  DirectusListResponse,
  DirectusSingletonResponse,
} from '@/shared/types/directus';

import demoManifestRaw from '../../../../public/demo/cms.json?raw';

type DemoFileEntry = {
  path: string;
  filename_download: string;
};

type DemoCmsManifest = {
  global_settings: DirectusSingletonResponse<unknown>;
  navigation: DirectusListResponse<unknown>;
  pages: DirectusListResponse<unknown>;
  news: DirectusListResponse<unknown>;
  downloads: DirectusListResponse<unknown>;
  features: DirectusListResponse<unknown>;
  roles: DirectusListResponse<unknown>;
  files: Record<string, DemoFileEntry>;
};

const demoManifest = JSON.parse(demoManifestRaw) as DemoCmsManifest;

async function loadDemoManifest(): Promise<DemoCmsManifest> {
  return Promise.resolve(demoManifest);
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

export function getDemoFilePath(assetId: string): string | null {
  const entry = demoManifest.files?.[assetId];
  return entry?.path ?? null;
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
