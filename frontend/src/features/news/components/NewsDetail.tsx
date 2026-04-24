import type { NewsItem } from '../../types/domain';
import { getCmsAssetLabel, getNewsFullUrl } from '../../utils/assets';
import { formatDate } from '../../utils/date';
import { cn } from '../../lib/cn';
import { newsClasses } from '../styles/news.classes';

interface NewsDetailProps {
  item: NewsItem;
}

export function NewsDetail({ item }: NewsDetailProps) {
  const dateLabel = formatDate(item.date);

  return (
    <article className={cn(newsClasses.card.root, 'prose')}>
      {item.image ? (
        <div className={newsClasses.card.media}>
          <img
            alt={getCmsAssetLabel(item.image)}
            src={getNewsFullUrl(item.image)}
          />
        </div>
      ) : null}

      <div className={newsClasses.card.body}>
        {dateLabel ? (
          <div className="text-sm text-muted">{dateLabel}</div>
        ) : null}
        <h1 className={newsClasses.card.title}>{item.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: item.text ?? '' }} />
      </div>
    </article>
  );
}
