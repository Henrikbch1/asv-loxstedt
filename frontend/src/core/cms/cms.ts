/**
 * Public CMS API surface – thin delegation layer over the active ICmsClient.
 * The concrete implementation (Directus or StaticFileCmsClient) is selected
 * at build time via the VITE_CMS_MODE environment variable.
 *
 * All call-sites remain unchanged: they continue to import named functions
 * from this module.
 */
import { cmsClient } from './cmsClient';
import type {
  CmsPage,
  GlobalSettings,
  NewsItem,
  Role,
} from '@/shared/types/domain';
import type { NavigationRecord } from '@/shared/types/navigation';
import type { DirectusListResponse } from '@/shared/types/directus';

export async function getGlobalSettings(
  signal?: AbortSignal,
): Promise<GlobalSettings> {
  return cmsClient.getGlobalSettings(signal);
}

export async function getNavigation(
  signal?: AbortSignal,
): Promise<NavigationRecord[]> {
  return cmsClient.getNavigation(signal);
}

export async function getPublicPages(signal?: AbortSignal): Promise<CmsPage[]> {
  return cmsClient.getPublicPages(signal);
}

export async function getPublicPageByPath(
  path: string,
  signal?: AbortSignal,
): Promise<CmsPage | null> {
  return cmsClient.getPublicPageByPath(path, signal);
}

export async function getPublicNewsList(
  page = 1,
  signal?: AbortSignal,
): Promise<DirectusListResponse<NewsItem>> {
  return cmsClient.getPublicNewsList(page, signal);
}

export async function getPublicNewsById(
  id: string | number,
  signal?: AbortSignal,
): Promise<NewsItem> {
  return cmsClient.getPublicNewsById(id, signal);
}

export async function getBoardRoles(signal?: AbortSignal): Promise<Role[]> {
  return cmsClient.getBoardRoles(signal);
}
