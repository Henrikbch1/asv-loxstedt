import type {
  CmsPage,
  GlobalSettings,
  NewsItem,
  Role,
} from '@/shared/types/domain';
import type { NavigationRecord } from '@/shared/types/navigation';
import type { DirectusListResponse } from '@/shared/types/directus';

export interface ICmsClient {
  getGlobalSettings(signal?: AbortSignal): Promise<GlobalSettings>;
  getNavigation(signal?: AbortSignal): Promise<NavigationRecord[]>;
  getPublicPages(signal?: AbortSignal): Promise<CmsPage[]>;
  getPublicPageByPath(
    path: string,
    signal?: AbortSignal,
  ): Promise<CmsPage | null>;
  getPublicNewsList(
    page?: number,
    signal?: AbortSignal,
  ): Promise<DirectusListResponse<NewsItem>>;
  getPublicNewsById(
    id: string | number,
    signal?: AbortSignal,
  ): Promise<NewsItem>;
  getBoardRoles(signal?: AbortSignal): Promise<Role[]>;
}
