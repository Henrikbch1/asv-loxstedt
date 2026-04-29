import type { NewsItem } from '@/shared/types/domain';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';

export type { NewsItem };

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
}

export interface NewsSettings {
  itemsPerPage: number;
}

export const DEFAULT_NEWS_SETTINGS: NewsSettings = {
  itemsPerPage: NEWS_PAGE_SIZE,
};
