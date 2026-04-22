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
    width: 400,
    height: 300,
  });

  return (
    <article
      className={`news-list-item${imageUrl ? " news-list-item--has-image" : ""}`}
    >
      {/* invisible full-card link overlay */}
      <Link
        aria-label={item.title}
        className="news-list-item__link"
        tabIndex={-1}
        to={detailHref}
      />

      {/* Mobile-only top image */}
      {imageUrl ? (
        <div
          className="news-list-item__thumbnail news-list-item__thumbnail--top"
          aria-hidden="true"
        >
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
        </div>
      ) : null}

      <div className="news-list-item__row">
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

          {preview ? (
            <p className="news-list-item__preview">{preview}</p>
          ) : null}
        </div>

        {/* Desktop-only right thumbnail */}
        {imageUrl ? (
          <div
            className="news-list-item__thumbnail news-list-item__thumbnail--right"
            aria-hidden="true"
          >
            <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
