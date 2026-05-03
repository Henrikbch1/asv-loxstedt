import type {
  CmsPage,
  GlobalSettings,
  NewsItem,
  Role,
} from '@/shared/types/domain';
import type { NavigationRecord } from '@/shared/types/navigation';
import type { DirectusListResponse } from '@/shared/types/directus';

/**
 * CmsAdapter – uniform interface over any CMS backend.
 * Implementations: DirectusAdapter, JsonAdapter, MockAdapter
 */
export interface CmsAdapter {
  getSiteSettings(signal?: AbortSignal): Promise<GlobalSettings>;
  getNavigation(signal?: AbortSignal): Promise<NavigationRecord[]>;
  getPages(signal?: AbortSignal): Promise<CmsPage[]>;
  getPageBySlug(slug: string, signal?: AbortSignal): Promise<CmsPage | null>;
  getLegalPages(
    signal?: AbortSignal,
  ): Promise<{ imprint: string | null; dataProtection: string | null }>;
  getFeatureData?<T>(
    featureKey: string,
    query?: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<DirectusListResponse<T>>;
  getNewsList?(
    page?: number,
    signal?: AbortSignal,
  ): Promise<DirectusListResponse<NewsItem>>;
  getNewsById?(id: string | number, signal?: AbortSignal): Promise<NewsItem>;
  getBoardRoles?(signal?: AbortSignal): Promise<Role[]>;
}
