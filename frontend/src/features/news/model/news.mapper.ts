import type { NewsItem } from '@/shared/types/domain';

export function mapCmsNewsToNewsItem(raw: unknown): NewsItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const r = raw as Record<string, unknown>;
  const item: NewsItem = {
    id: r['id'],
    title: r['title'],
    slug: r['slug'] ?? null,
    date: r['date'] ?? null,
    image: r['image'] ?? null,
    text: r['text'] ?? null,
    category: r['category'] ?? null,
  } as NewsItem;

  return item;
}

export function mapCmsNewsList(rawList: unknown): NewsItem[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapCmsNewsToNewsItem).filter(Boolean) as NewsItem[];
}
