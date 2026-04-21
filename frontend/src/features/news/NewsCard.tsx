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
  const detailHref = `/news/${item.id}`;
  const categoryName =
    item.category && typeof item.category === "object"
      ? (item.category.name?.trim() ?? null)
      : null;

  return (
    <article className="news-card group">
      {imageUrl ? (
        <Link className="news-card__media overflow-hidden" to={detailHref}>
          <img
            className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            alt={getCmsAssetLabel(item.image)}
            src={imageUrl}
          />
        </Link>
      ) : null}

      <div className="news-card__body">
        <div className="news-card__meta">
          {dateLabel ? (
            <span className="news-card__date">{dateLabel}</span>
          ) : null}
          {categoryName ? (
            <span className="news-card__badge">{categoryName}</span>
          ) : null}
        </div>
        <h2 className="m-0 text-xl font-semibold">
          <Link to={detailHref}>{item.title}</Link>
        </h2>
        {excerpt ? <p className="text-muted">{excerpt}</p> : null}
        <Link
          className="button button--ghost inline-flex items-center gap-2 justify-self-start"
          to={detailHref}
        >
          Weiterlesen
        </Link>
      </div>
    </article>
  );
}
