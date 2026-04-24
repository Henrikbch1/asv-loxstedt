import type { NewsItem } from '../../types/domain';

export type { NewsItem };

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
}
