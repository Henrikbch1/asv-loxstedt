import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { NotFoundState } from '../components/ui/NotFoundState';
import { RichText } from '../components/ui/RichText';
import { usePublicNewsByIdQuery } from '../features/news/useNewsQueries';
import { CmsApiError } from '../api/directus';
import { getCmsAssetLabel, getNewsDetailUrl } from '../utils/assets';
import { formatDate } from '../utils/date';
import { useSiteTitle } from '../hooks/useSiteTitle';
import { ImageLightbox } from '../components/ui/ImageLightbox';
import { expandDirectusRelation } from '../utils/directus';
import type { Category } from '../types/domain';

export function NewsDetailPage() {
  const { id = '' } = useParams();
  const newsQuery = usePublicNewsByIdQuery(id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  useSiteTitle(newsQuery.data?.title);

  if (!id) {
    return <NotFoundState />;
  }

  if (newsQuery.isPending) {
    return <LoadingState title="News-Beitrag wird geladen" />;
  }

  if (newsQuery.isError) {
    if (
      newsQuery.error instanceof CmsApiError &&
      newsQuery.error.statusCode === 404
    ) {
      return <NotFoundState title="News-Beitrag nicht gefunden" />;
    }
    return (
      <ErrorState
        message="Der News-Beitrag konnte nicht geladen werden."
        onRetry={() => {
          void newsQuery.refetch();
        }}
      />
    );
  }

  const imageUrl = getNewsDetailUrl(newsQuery.data.image);
  const dateLabel = formatDate(newsQuery.data.date);
  const categoryName =
    expandDirectusRelation<Category>(newsQuery.data.category)?.name ?? null;

  return (
    <article className="content-page news-detail">
      <header className="page-hero page-hero--content">
        <div className="page-hero__copy">
          <span className="eyebrow">News-Detail</span>
          <h1>{newsQuery.data.title}</h1>
          <p className="meta-text">
            {[dateLabel, categoryName].filter(Boolean).join(' · ')}
          </p>
        </div>
      </header>

      <section
        className={`news-detail__layout${imageUrl ? ' news-detail__layout--has-media' : ''}`}
      >
        <RichText
          className="rich-text content-page__body news-detail__main prose prose-lg"
          html={newsQuery.data.text}
        />

        {imageUrl ? (
          <aside
            className="news-detail__media-column"
            aria-label="Beitragsbild"
          >
            <div className="news-detail__media-card">
              <div className="page-hero__media news-detail__media">
                <button
                  aria-label="Bild in Vollbild öffnen"
                  className="news-detail__media-btn"
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    className="w-full h-full object-cover"
                    alt={getCmsAssetLabel(newsQuery.data.image)}
                    src={imageUrl}
                  />
                  <span className="news-detail__media-hint" aria-hidden="true">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </aside>
        ) : null}
      </section>

      {lightboxOpen && imageUrl ? (
        <ImageLightbox
          alt={getCmsAssetLabel(newsQuery.data.image)}
          src={imageUrl}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </article>
  );
}
