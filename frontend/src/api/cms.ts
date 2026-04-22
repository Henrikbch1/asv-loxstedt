import { CmsApiError, fetchDirectus } from "./directus";
import type { CmsPage, GlobalSettings, NewsItem, Role } from "../types/domain";
import type {
  NavigationRecord,
  NavigationRecordRaw,
} from "../types/navigation";
import type {
  DirectusListResponse,
  DirectusSingletonResponse,
} from "../types/directus";
import { findCmsPageByPath } from "../utils/cmsPagePaths";
import { NEWS_PAGE_SIZE } from "../config/constants";
import { normalizeNavigationRecord, compareNewsItems } from "./transformers";

const pageSummaryFields = ["id", "title", "slug", "navigation_title"];

const pageFields = [
  "id",
  "title",
  "slug",
  "navigation_title",
  "content",
  "intro",
  "featured_image",
  "parent_page",
  "template",
  "hero_title",
  "hero_text",
  "show_title",
  "show_intro",
] satisfies string[];

const newsFields = [
  "id",
  "title",
  "date",
  "text",
  "image",
  "category.name",
] satisfies string[];

const fallbackNewsFields = [
  "id",
  "title",
  "date",
  "text",
  "image",
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
    if (!(error instanceof CmsApiError) || error.code !== "FORBIDDEN") {
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

export async function getGlobalSettings(
  signal?: AbortSignal,
): Promise<GlobalSettings> {
  const response = await fetchDirectus<
    DirectusSingletonResponse<GlobalSettings>
  >("/items/global_settings", {
    query: {
      fields: [
        "id",
        "site_name",
        "logo",
        "club_name",
        "footer_note",
        "street",
        "postal_code",
        "city",
        "phone",
        "imprint",
        "data_protection",
      ],
    },
    signal,
  });

  return response.data;
}

export async function getNavigation(
  signal?: AbortSignal,
): Promise<NavigationRecord[]> {
  const response = await fetchDirectus<
    DirectusListResponse<NavigationRecordRaw>
  >("/items/navigation", {
    query: {
      fields: [
        "sort",
        "label",
        "parent",
        "parent.label",
        "parent.page.slug",
        "parent.page.title",
        ...pageSummaryFields.map((field) => `page.${field}`),
      ],
      sort: ["sort", "label"],
    },
    signal,
  });

  return response.data.map(normalizeNavigationRecord);
}

export async function getPublicPageByPath(
  path: string,
  signal?: AbortSignal,
): Promise<CmsPage | null> {
  const pages = await getPublicPages(signal);

  return findCmsPageByPath(path, pages);
}

export async function getPublicPages(signal?: AbortSignal): Promise<CmsPage[]> {
  const response = await fetchDirectus<DirectusListResponse<CmsPage>>(
    "/items/pages",
    {
      query: {
        fields: pageFields,
        sort: ["title"],
      },
      signal,
    },
  );

  return response.data;
}

export async function getPublicNewsList(
  page = 1,
  signal?: AbortSignal,
): Promise<DirectusListResponse<NewsItem>> {
  const response = await fetchPublicNewsResponse<
    DirectusListResponse<NewsItem>
  >(
    "/items/news",
    {
      sort: ["-date", "-id"],
      limit: NEWS_PAGE_SIZE,
      page,
      meta: "filter_count",
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

export async function getBoardRoles(signal?: AbortSignal): Promise<Role[]> {
  const response = await fetchDirectus<DirectusListResponse<Role>>(
    "/items/roles",
    {
      query: {
        fields: [
          "id",
          "sort",
          "role",
          "email",
          "is_vacant",
          "category.name",
          "person_link.firstname",
          "person_link.lastname",
        ],
        sort: ["sort"],
        limit: -1,
      },
      signal,
    },
  );

  return response.data;
}
