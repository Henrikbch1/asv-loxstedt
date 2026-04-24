import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { NotFoundState } from '../components/ui/NotFoundState';
import { RichText } from '../components/ui/RichText';
import { PageHero } from '../components/ui/PageHero';
import { ContentPage } from '../components/ui/ContentPage';
import { usePublicNewsByIdQuery } from '../features/news/useNewsQueries';
import { CmsApiError } from '../api/directus';
import { getCmsAssetLabel, getNewsDetailUrl } from '../utils/assets';
import { formatDate } from '../utils/date';
import { useSiteTitle } from '../hooks/useSiteTitle';
import { ImageLightbox } from '../components/ui/ImageLightbox';
import { expandDirectusRelation } from '../utils/directus';
import type { Category } from '../types/domain';
import { cn } from '../lib/cn';

const styles = {
  layout: 'flex flex-col gap-8',
  layoutHasMedia: 'lg:flex-row',
  main: 'prose prose-lg max-w-none flex-1',
  mediaColumn: 'shrink-0 lg:w-80',
  mediaCard: 'overflow-hidden rounded-lg shadow-card',
  mediaBtn:
    'group relative block w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0',
  mediaImage: 'h-full w-full object-cover',
  mediaHint:
    'absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100',
  mediaHintIcon: 'h-8 w-8 text-white',
} as const;

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
    <ContentPage>
      <PageHero
        eyebrow="News-Detail"
        title={newsQuery.data.title}
        meta={[dateLabel, categoryName].filter(Boolean).join(' · ')}
      />

      <section className={cn(styles.layout, imageUrl && styles.layoutHasMedia)}>
        <RichText
          className={cn(ContentPage.bodyClass, styles.main)}
          html={newsQuery.data.text}
        />

        {imageUrl ? (
          <aside className={styles.mediaColumn} aria-label="Beitragsbild">
            <div className={styles.mediaCard}>
              <div>
                <button
                  aria-label="Bild in Vollbild öffnen"
                  className={styles.mediaBtn}
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    className={styles.mediaImage}
                    alt={getCmsAssetLabel(newsQuery.data.image)}
                    src={imageUrl}
                  />
                  <span className={styles.mediaHint} aria-hidden="true">
                    <svg
                      className={styles.mediaHintIcon}
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
    </ContentPage>
  );
}
