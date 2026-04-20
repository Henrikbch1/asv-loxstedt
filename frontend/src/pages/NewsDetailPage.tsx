import { useParams } from "react-router-dom";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NotFoundState } from "../components/ui/NotFoundState";
import { RichText } from "../components/ui/RichText";
import { usePublicNewsBySlugQuery } from "../features/news/useNewsQueries";
import { getCmsAssetLabel, getCmsAssetUrl } from "../utils/assets";
import { formatDate } from "../utils/date";
import { useSiteTitle } from "../hooks/useSiteTitle";

export function NewsDetailPage() {
  const { slug = "" } = useParams();
  const newsQuery = usePublicNewsBySlugQuery(slug);
  useSiteTitle(newsQuery.data?.title);

  if (!slug) {
    return <NotFoundState />;
  }

  if (newsQuery.isPending) {
    return <LoadingState title="News-Beitrag wird geladen" />;
  }

  if (newsQuery.isError) {
    return (
      <ErrorState
        message="Der News-Beitrag konnte nicht geladen werden."
        onRetry={() => {
          void newsQuery.refetch();
        }}
      />
    );
  }

  if (!newsQuery.data) {
    return <NotFoundState title="News-Beitrag nicht gefunden" />;
  }

  const imageUrl = getCmsAssetUrl(newsQuery.data.image, {
    fit: "cover",
    height: 900,
    width: 1600,
  });
  const dateLabel = formatDate(newsQuery.data.date);
  const categoryName =
    newsQuery.data.category && typeof newsQuery.data.category === "object"
      ? newsQuery.data.category.name
      : null;

  return (
    <article className="content-page">
      <header className="page-hero page-hero--content">
        <div className="page-hero__copy">
          <span className="eyebrow">News-Detail</span>
          <h1>{newsQuery.data.title}</h1>
          <p className="meta-text">
            {[dateLabel, categoryName].filter(Boolean).join(" · ")}
          </p>
        </div>
        {imageUrl ? (
          <div className="page-hero__media">
            <img
              className="w-full h-full object-cover"
              alt={getCmsAssetLabel(newsQuery.data.image)}
              src={imageUrl}
            />
          </div>
        ) : null}
      </header>

      <RichText
        className="rich-text content-page__body prose prose-lg"
        html={newsQuery.data.text}
      />
    </article>
  );
}
