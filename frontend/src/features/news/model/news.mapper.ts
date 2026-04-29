import type { NewsItem, RawNewsSettings } from '@/shared/types/domain';
import type { NewsSettings } from './news.types';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';

export function mapRawSettingsToNewsSettings(
  raw: RawNewsSettings,
): NewsSettings {
  return {
    itemsPerPage: raw.items_per_page ?? NEWS_PAGE_SIZE,
  };
}

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
