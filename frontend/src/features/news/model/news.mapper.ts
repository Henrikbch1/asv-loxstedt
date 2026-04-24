import type { NewsItem } from '../../../types/domain';

export function mapCmsNewsToNewsItem(raw: any): NewsItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const item: NewsItem = {
    id: raw.id,
    title: raw.title,
    slug: raw.slug ?? null,
    date: raw.date ?? null,
    image: raw.image ?? null,
    text: raw.text ?? null,
    category: raw.category ?? null,
  } as NewsItem;

  return item;
}

export function mapCmsNewsList(rawList: any[] | null): NewsItem[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapCmsNewsToNewsItem).filter(Boolean) as NewsItem[];
}
