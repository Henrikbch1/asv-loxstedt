import { CmsApiError, fetchDirectus } from './directus';
import type {
  RawPage,
  RawGlobalSettings,
  NewsItem,
  Role,
} from '@/shared/types/domain';
import type { NavigationRecordRaw } from '@/shared/types/navigation';
import type {
  DirectusListResponse,
  DirectusSingletonResponse,
} from '@/shared/types/directus';
import type {
  Page,
  SiteSettings,
  LegalPages,
  NavigationItem,
} from '@/core/cms/types';
import { findCmsPageByPath } from '@/shared/utils/cmsPagePaths';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';
import { appConfig } from '@/core/config/env';
import {
  normalizeNavigationRecord,
  compareNewsItems,
  mapRawPageToPage,
  mapRawGlobalSettingsToSiteSettings,
  mapRawGlobalSettingsToLegalPages,
} from './transformers';
import { buildNavigationTree } from '@/core/navigation/navigation.utils';

const pageSummaryFields = ['id', 'title', 'slug', 'navigation_title'];

const pageFields = [
  'id',
  'title',
  'slug',
  'navigation_title',
  'content',
  'intro',
  'featured_image',
  'parent_page',
  'template',
  'hero_title',
  'hero_text',
  'show_title',
  'show_intro',
] satisfies string[];

const newsFields = [
  'id',
  'title',
  'date',
  'text',
  'image',
  'category.name',
] satisfies string[];

const fallbackNewsFields = [
  'id',
  'title',
  'date',
  'text',
  'image',
] satisfies string[];

async function fetchPublicNewsResponse<T>(
  path: string,
  query: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  try {
    return await fetchDirectus<T>(path, {
      query: {
        ...query,
        fields: newsFields,
      },
      signal,
    });
  } catch (error) {
    if (!(error instanceof CmsApiError) || error.code !== 'FORBIDDEN') {
      throw error;
    }

    return fetchDirectus<T>(path, {
      query: {
        ...query,
        fields: fallbackNewsFields,
      },
      signal,
    });
  }
}

async function fetchRawPages(signal?: AbortSignal): Promise<RawPage[]> {
  const response = await fetchDirectus<DirectusListResponse<RawPage>>(
    '/items/pages',
    {
      query: {
        fields: pageFields,
        sort: ['title'],
      },
      signal,
    },
  );

  return response.data;
}

export async function getGlobalSettings(
  signal?: AbortSignal,
): Promise<SiteSettings> {
  const response = await fetchDirectus<
    DirectusSingletonResponse<RawGlobalSettings>
  >('/items/global_settings', {
    query: {
      fields: [
        'id',
        'site_name',
        'logo',
        'club_name',
        'footer_note',
        'street',
        'postal_code',
        'city',
        'phone',
        'imprint',
        'data_protection',
      ],
    },
    signal,
  });

  return mapRawGlobalSettingsToSiteSettings(
    response.data,
    appConfig.apiBaseUrl,
  );
}

export async function getLegalPages(signal?: AbortSignal): Promise<LegalPages> {
  const response = await fetchDirectus<
    DirectusSingletonResponse<RawGlobalSettings>
  >('/items/global_settings', {
    query: {
      fields: ['imprint', 'data_protection'],
    },
    signal,
  });

  return mapRawGlobalSettingsToLegalPages(response.data);
}

export async function getNavigation(
  signal?: AbortSignal,
): Promise<NavigationItem[]> {
  const [navResponse, rawPages] = await Promise.all([
    fetchDirectus<DirectusListResponse<NavigationRecordRaw>>(
      '/items/navigation',
      {
        query: {
          fields: [
            'sort',
            'label',
            'parent',
            'parent.label',
            'parent.page.slug',
            'parent.page.title',
            ...pageSummaryFields.map((field) => `page.${field}`),
          ],
          sort: ['sort', 'label'],
        },
        signal,
      },
    ),
    fetchRawPages(signal),
  ]);

  const rawNavItems = navResponse.data.map(normalizeNavigationRecord);

  return buildNavigationTree(rawNavItems, rawPages);
}

export async function getPublicPageByPath(
  path: string,
  signal?: AbortSignal,
): Promise<Page | null> {
  const rawPages = await fetchRawPages(signal);
  const rawPage = findCmsPageByPath(path, rawPages);

  if (!rawPage) return null;

  return mapRawPageToPage(rawPage, appConfig.apiBaseUrl);
}

export async function getPublicPages(signal?: AbortSignal): Promise<Page[]> {
  const rawPages = await fetchRawPages(signal);

  return rawPages.map((raw) => mapRawPageToPage(raw, appConfig.apiBaseUrl));
}

export async function getPublicNewsList(
  page = 1,
  signal?: AbortSignal,
): Promise<DirectusListResponse<NewsItem>> {
  const response = await fetchPublicNewsResponse<
    DirectusListResponse<NewsItem>
  >(
    '/items/news',
    {
      sort: ['-date', '-id'],
      limit: NEWS_PAGE_SIZE,
      page,
      meta: 'filter_count',
    },
    signal,
  );

  return {
    ...response,
    data: [...response.data].sort(compareNewsItems),
  };
}

export async function getPublicNewsById(
  id: string | number,
  signal?: AbortSignal,
): Promise<NewsItem> {
  const response = await fetchPublicNewsResponse<
    DirectusSingletonResponse<NewsItem>
  >(`/items/news/${encodeURIComponent(String(id))}`, {}, signal);

  return response.data;
}

export async function getCalendarSettings(
  signal?: AbortSignal,
): Promise<RawGlobalSettings> {
  try {
    const response = await fetchDirectus<
      DirectusSingletonResponse<RawGlobalSettings>
    >('/items/global_settings', {
      query: { fields: ['calendar_id'] },
      signal,
    });
    return response.data;
  } catch (error) {
    if (error instanceof CmsApiError && error.code === 'FORBIDDEN') {
      return {};
    }
    throw error;
  }
}

export async function getBoardRoles(signal?: AbortSignal): Promise<Role[]> {
  const response = await fetchDirectus<DirectusListResponse<Role>>(
    '/items/roles',
    {
      query: {
        fields: [
          'id',
          'sort',
          'role',
          'email',
          'is_vacant',
          'category.name',
          'person_link.firstname',
          'person_link.lastname',
        ],
        sort: ['sort'],
        limit: -1,
      },
      signal,
    },
  );

  return response.data;
}
