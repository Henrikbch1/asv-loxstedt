import { Link } from 'react-router-dom';
import type { NewsItem } from '../../types/domain';
import { getCmsAssetLabel, getNewsPreviewUrl } from '../../utils/assets';
import { formatDate } from '../../utils/date';
import { getExcerpt } from '../../utils/text';
import { routes } from '../../config/routes';
import { expandDirectusRelation } from '../../utils/directus';
import type { Category } from '../../types/domain';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const styles = {
  card: 'group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-card transition-shadow hover:shadow-soft',
  media: 'overflow-hidden',
  mediaImage:
    'h-48 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105',
  body: 'flex flex-1 flex-col gap-3 p-5',
  meta: 'flex items-center gap-2 text-xs text-muted',
  date: '',
  title: 'm-0 text-xl font-semibold',
  excerpt: 'text-muted',
} as const;

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const imageUrl = getNewsPreviewUrl(item.image);
  const excerpt = getExcerpt(item.text);
  const dateLabel = formatDate(item.date);
  const detailHref = routes.newsDetail(item.id);
  const categoryName =
    expandDirectusRelation<Category>(item.category)?.name?.trim() ?? null;

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <Link className={styles.media} to={detailHref}>
          <img
            className={styles.mediaImage}
            alt={getCmsAssetLabel(item.image)}
            src={imageUrl}
          />
        </Link>
      ) : null}

      <div className={styles.body}>
        <div className={styles.meta}>
          {dateLabel ? <span className={styles.date}>{dateLabel}</span> : null}
          {categoryName ? <Badge>{categoryName}</Badge> : null}
        </div>
        <h2 className={styles.title}>
          <Link to={detailHref}>{item.title}</Link>
        </h2>
        {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
        <Button
          as="link"
          to={detailHref}
          variant="ghost"
          className="justify-self-start"
        >
          Weiterlesen
        </Button>
      </div>
    </article>
  );
}
