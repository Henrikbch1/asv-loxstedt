import { Link } from 'react-router-dom';
import type { NewsItem } from '@/shared/types/domain';
import { getCmsAssetLabel, getNewsPreviewUrl } from '@/shared/utils/assets';
import { formatDate } from '@/shared/utils/date';
import { getExcerpt } from '@/shared/utils/text';
import { routes } from '@/core/shell/routing/staticRoutes';
import { expandDirectusRelation } from '@/shared/utils/directus';
import type { Category } from '@/shared/types/domain';
import { Badge } from '@/shared/ui/Badge';
import { cn } from '@/shared/lib/cn';

const styles = {
  item: 'relative rounded-lg border border-border bg-white p-4 transition-shadow hover:shadow-card',
  itemHasImage: '',
  link: 'absolute inset-0 z-0',
  thumbnailTop: 'mb-3 overflow-hidden rounded-md md:hidden',
  thumbnailRight:
    'hidden shrink-0 overflow-hidden rounded-md md:block md:h-24 md:w-32',
  row: 'flex items-start gap-4',
  body: 'flex min-w-0 flex-1 flex-col gap-1',
  meta: 'flex items-center gap-2 text-xs text-muted',
  date: '',
  title: 'text-lg font-semibold leading-snug',
  preview: 'line-clamp-2 text-sm text-muted',
  icon: 'ml-3 flex items-center text-muted',
} as const;

interface NewsListItemProps {
  item: NewsItem;
}

export function NewsListItem({ item }: NewsListItemProps) {
  const detailHref = routes.newsDetail(item.id);
  const dateLabel = formatDate(item.date);
  const preview = getExcerpt(item.text, 200);
  const categoryName =
    expandDirectusRelation<Category>(item.category)?.name?.trim() ?? null;
  const imageUrl = getNewsPreviewUrl(item.image);

  return (
    <article className={cn(styles.item, imageUrl && styles.itemHasImage)}>
      <Link
        aria-label={item.title}
        className={styles.link}
        tabIndex={-1}
        to={detailHref}
      />

      {imageUrl ? (
        <div className={styles.thumbnailTop} aria-hidden="true">
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
        </div>
      ) : null}

      <div className={styles.row}>
        <div className={styles.body}>
          <div className={styles.meta}>
            {dateLabel ? (
              <span className={styles.date}>{dateLabel}</span>
            ) : null}
            {categoryName ? <Badge>{categoryName}</Badge> : null}
          </div>

          <h2 className={styles.title}>
            <Link to={detailHref}>{item.title}</Link>
          </h2>

          {preview ? <p className={styles.preview}>{preview}</p> : null}
        </div>

        {imageUrl ? (
          <div className={styles.thumbnailRight} aria-hidden="true">
            <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
          </div>
        ) : null}

        <div className={styles.icon} aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
