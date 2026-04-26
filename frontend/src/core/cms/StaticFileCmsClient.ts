import type { ICmsClient } from './ICmsClient';
import type {
  CmsPage,
  GlobalSettings,
  NewsItem,
  Role,
} from '@/shared/types/domain';
import type {
  NavigationRecord,
  NavigationRecordRaw,
} from '@/shared/types/navigation';
import type { DirectusListResponse } from '@/shared/types/directus';
import { findCmsPageByPath } from '@/shared/utils/cmsPagePaths';
import { normalizeNavigationRecord, compareNewsItems } from './transformers';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';
import { appConfig } from '@/core/config/env';

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const base = appConfig.staticDataBasePath.replace(/\/+$/, '');
  const url = `${base}/${path.replace(/^\/+/, '')}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(
      `Failed to load static CMS file "${url}": ${response.status} ${response.statusText}`,
    );
  }
  return response.json() as Promise<T>;
}

export class StaticFileCmsClient implements ICmsClient {
  async getGlobalSettings(signal?: AbortSignal): Promise<GlobalSettings> {
    return fetchJson<GlobalSettings>('global_settings.json', signal);
  }

  async getNavigation(signal?: AbortSignal): Promise<NavigationRecord[]> {
    const raw = await fetchJson<NavigationRecordRaw[]>(
      'navigation.json',
      signal,
    );
    return raw.map(normalizeNavigationRecord);
  }

  async getPublicPages(signal?: AbortSignal): Promise<CmsPage[]> {
    return fetchJson<CmsPage[]>('pages.json', signal);
  }

  async getPublicPageByPath(
    path: string,
    signal?: AbortSignal,
  ): Promise<CmsPage | null> {
    const pages = await this.getPublicPages(signal);
    return findCmsPageByPath(path, pages);
  }

  async getPublicNewsList(
    page = 1,
    signal?: AbortSignal,
  ): Promise<DirectusListResponse<NewsItem>> {
    const all = await fetchJson<NewsItem[]>('news.json', signal);
    const sorted = [...all].sort(compareNewsItems);
    const start = (page - 1) * NEWS_PAGE_SIZE;
    const data = sorted.slice(start, start + NEWS_PAGE_SIZE);
    return {
      data,
      meta: { filter_count: all.length },
    };
  }

  async getPublicNewsById(
    id: string | number,
    signal?: AbortSignal,
  ): Promise<NewsItem> {
    const all = await fetchJson<NewsItem[]>('news.json', signal);
    const item = all.find((n) => String(n.id) === String(id));
    if (!item) {
      throw new Error(`News item with id "${id}" not found in static data.`);
    }
    return item;
  }

  async getBoardRoles(signal?: AbortSignal): Promise<Role[]> {
    return fetchJson<Role[]>('roles.json', signal);
  }
}
