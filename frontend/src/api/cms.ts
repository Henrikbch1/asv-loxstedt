import { CmsApiError, fetchDirectus } from "./directus";
import type {
  CmsPage,
  GlobalSettings,
  NavigationRecord,
  NavigationRecordRaw,
  NewsItem,
} from "../types/cms";
import type {
  DirectusListResponse,
  DirectusSingletonResponse,
} from "../types/directus";
import { findCmsPageByPath } from "../utils/cmsPagePaths";

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
  "related_role_groups",
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

function getNavigationKey(label: string, slug?: string | null): string {
  return slug ? `page:${slug}` : `label:${label.trim().toLowerCase()}`;
}

function normalizeNavigationRecord(
  item: NavigationRecordRaw,
): NavigationRecord {
  const page =
    item.page && typeof item.page === "object" && "slug" in item.page
      ? item.page
      : null;

  const parentKey =
    item.parent && typeof item.parent === "object"
      ? getNavigationKey(
          item.parent.label,
          item.parent.page && typeof item.parent.page === "object"
            ? item.parent.page.slug
            : null,
        )
      : null;

  return {
    key: getNavigationKey(item.label, page?.slug),
    sort: item.sort,
    label: item.label,
    page,
    parentKey,
  };
}

function getNewsTimestamp(newsItem: NewsItem): number {
  if (!newsItem.date) {
    return Number.NEGATIVE_INFINITY;
  }

  const timestamp = Date.parse(newsItem.date);

  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

function compareNewsItems(a: NewsItem, b: NewsItem): number {
  const dateDiff = getNewsTimestamp(b) - getNewsTimestamp(a);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return String(b.id).localeCompare(String(a.id), "de-DE", { numeric: true });
}

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

const NEWS_PAGE_SIZE = 5;

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
