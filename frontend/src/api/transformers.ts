import type {
  NavigationRecord,
  NavigationRecordRaw,
} from '../types/navigation';
import type { NewsItem } from '../types/domain';

export function getNavigationKey(label: string, slug?: string | null): string {
  return slug ? `page:${slug}` : `label:${label.trim().toLowerCase()}`;
}

export function normalizeNavigationRecord(
  item: NavigationRecordRaw,
): NavigationRecord {
  const page =
    item.page && typeof item.page === 'object' && 'slug' in item.page
      ? item.page
      : null;

  const parentKey =
    item.parent && typeof item.parent === 'object'
      ? getNavigationKey(
          item.parent.label,
          item.parent.page && typeof item.parent.page === 'object'
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

export function compareNewsItems(a: NewsItem, b: NewsItem): number {
  const dateDiff = getNewsTimestamp(b) - getNewsTimestamp(a);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return String(b.id).localeCompare(String(a.id), 'de-DE', { numeric: true });
}
