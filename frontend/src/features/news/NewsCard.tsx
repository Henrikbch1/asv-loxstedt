import { Link } from "react-router-dom";
import type { NewsItem } from "../../types/cms";
import { getCmsAssetLabel, getCmsAssetUrl } from "../../utils/assets";
import { formatDate } from "../../utils/date";
import { getExcerpt } from "../../utils/text";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const imageUrl = getCmsAssetUrl(item.image, {
    fit: "cover",
    width: 900,
    height: 640,
  });
  const excerpt = getExcerpt(item.text);
  const dateLabel = formatDate(item.date);
  const detailHref = item.slug ? `/news/${item.slug}` : null;
  const categoryName =
    item.category && typeof item.category === "object"
      ? item.category.name
      : null;

  return (
    <article className="news-card">
      {imageUrl && detailHref ? (
        <Link className="news-card__media" to={detailHref}>
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
        </Link>
      ) : imageUrl ? (
        <div className="news-card__media">
          <img alt={getCmsAssetLabel(item.image)} src={imageUrl} />
        </div>
      ) : null}

      <div className="news-card__body">
        <div className="news-card__meta">
          {dateLabel ? <span>{dateLabel}</span> : null}
          {categoryName ? <span>{categoryName}</span> : null}
        </div>
        <h2>
          {detailHref ? <Link to={detailHref}>{item.title}</Link> : item.title}
        </h2>
        {excerpt ? <p>{excerpt}</p> : null}
        {detailHref ? (
          <Link className="button button--ghost" to={detailHref}>
            Weiterlesen
          </Link>
        ) : (
          <span className="meta-text">Kein oeffentlicher Slug vorhanden</span>
        )}
      </div>
    </article>
  );
}
