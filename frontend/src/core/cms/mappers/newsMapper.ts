import type { NewsItem } from '@/shared/types/domain';

function getNewsTimestamp(newsItem: NewsItem): number {
  if (!newsItem.date) return Number.NEGATIVE_INFINITY;
  // Directus can return a date string (ISO) or a numeric ms timestamp
  const raw = newsItem.date as unknown;
  if (typeof raw === 'number') return raw;
  const timestamp = Date.parse(newsItem.date);
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

export function compareNewsItems(a: NewsItem, b: NewsItem): number {
  const dateDiff = getNewsTimestamp(b) - getNewsTimestamp(a);
  if (dateDiff !== 0) return dateDiff;
  return String(b.id).localeCompare(String(a.id), 'de-DE', { numeric: true });
}
