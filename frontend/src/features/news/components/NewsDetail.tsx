import type { NewsItem } from '../../../types/domain';
import { getCmsAssetLabel, getNewsDetailUrl } from '../../../utils/assets';
import { formatDate } from '../../../utils/date';
import { cn } from '../../../lib/cn';
import { newsClasses } from '../styles/news.classes';
import { BackButton } from '../../../components/ui/BackButton';

interface NewsDetailProps {
  item: NewsItem;
}

export function NewsDetail({ item }: NewsDetailProps) {
  const dateLabel = formatDate(item.date);
  const imageUrl = getNewsDetailUrl(item.image);

  return (
    <article className={cn(newsClasses.card.root, 'prose')}>
      <div className="p-4">
        <BackButton />
      </div>
      {imageUrl ? (
        <div className={newsClasses.card.media}>
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
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
