import type { NewsItem } from '@/shared/types/domain';

export type { NewsItem };

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
}
