import type { NewsItem } from '../../../types/domain';
import './news.css';
import { NewsCard } from '../NewsCard';
import { NewsListItem } from '../NewsListItem';
import { newsClasses } from '../styles/news.classes';

interface NewsProps {
  items?: NewsItem[] | null;
  asCards?: boolean;
}

export function News({ items, asCards = false }: NewsProps) {
  const list = items ?? [];

  if (asCards) {
    return (
      <section className={newsClasses.layout.grid} aria-label="News">
        {list.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </section>
    );
  }

  return (
    <section className={newsClasses.layout.list} aria-label="News">
      {list.map((item) => (
        <NewsListItem key={item.id} item={item} />
      ))}
    </section>
  );
}
