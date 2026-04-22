import { Link } from "react-router-dom";
import type { NewsItem } from "../../types/domain";
import { getCmsAssetUrl, getCmsAssetLabel } from "../../utils/assets";
import { formatDate } from "../../utils/date";
import { getExcerpt } from "../../utils/text";
import { routes } from "../../config/routes";
import { expandDirectusRelation } from "../../utils/directus";
import type { Category } from "../../types/domain";

interface NewsListItemProps {
  item: NewsItem;
}

export function NewsListItem({ item }: NewsListItemProps) {
  const detailHref = routes.newsDetail(item.id);
  const dateLabel = formatDate(item.date);
  const preview = getExcerpt(item.text, 200);
  const categoryName =
    expandDirectusRelation<Category>(item.category)?.name?.trim() ?? null;
  const imageUrl = getCmsAssetUrl(item.image, {
    fit: "cover",
    width: 240,
    height: 180,
  });

  return (
    <article className="news-list-item">
      {/* invisible full-card link overlay */}
      <Link
        aria-label={item.title}
        className="news-list-item__link"
        tabIndex={-1}
        to={detailHref}
      />

      <div className="news-list-item__body">
        <div className="news-list-item__meta">
          {dateLabel ? (
            <span className="news-list-item__date">{dateLabel}</span>
          ) : null}
          {categoryName ? (
            <span className="news-card__badge">{categoryName}</span>
          ) : null}
        </div>

        <h2 className="news-list-item__title">
          <Link to={detailHref}>{item.title}</Link>
        </h2>

        {preview ? <p className="news-list-item__preview">{preview}</p> : null}
      </div>

      {imageUrl ? (
        <div className="news-list-item__thumbnail" aria-hidden="true">
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
        </div>
      ) : null}
    </article>
  );
}
