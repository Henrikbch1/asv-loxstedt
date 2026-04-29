import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '@/core/ui/EmptyState';
import { ErrorState } from '@/core/ui/ErrorState';
import { LoadingState } from '@/core/ui/LoadingState';
import { SectionHeading } from '@/core/ui/SectionHeading';
import { ContentPage } from '@/core/ui/ContentPage';
import { Button } from '@/core/ui/Button';
import {
  NewsListItem,
  usePublicNewsListQuery,
  useNewsSettingsQuery,
} from '@/features/news';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';

const styles = {
  section: 'grid gap-8',
  newsFeed: 'flex flex-col gap-4',
  pagination: 'grid grid-cols-3 items-center gap-2 pt-4',
  paginationCenter: 'flex justify-center',
  paginationMeta: 'text-sm text-muted',
  paginationText: 'hidden sm:inline',
} as const;

export function NewsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const { data: settings } = useNewsSettingsQuery();
  const pageSize = settings?.itemsPerPage ?? NEWS_PAGE_SIZE;
  const newsQuery = usePublicNewsListQuery(page, pageSize);
  useSiteTitle('Aktuelle Meldungen');

  if (newsQuery.isPending) {
    return <LoadingState title="News werden geladen" />;
  }

  if (newsQuery.isError) {
    return (
      <ErrorState
        message="Die News-Uebersicht konnte nicht geladen werden."
        onRetry={() => {
          void newsQuery.refetch();
        }}
      />
    );
  }

  if (!newsQuery.data?.data.length) {
    return (
      <EmptyState
        ctaLabel="Zur Startseite"
        ctaTo="/"
        message="Sobald neue veroeffentlichte Einträge vorhanden sind, erscheinen sie hier automatisch."
        title="Noch keine News vorhanden"
      />
    );
  }

  const totalCount = newsQuery.data.meta?.filter_count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <ContentPage>
      <SectionHeading
        eyebrow="News"
        title="Aktuelle Meldungen"
        description="Hier findest du aktuelle Meldungen, Berichte und Hinweise aus dem Vereinsleben."
      />

      <ul className={styles.newsFeed}>
        {[...newsQuery.data.data]
          .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
          .map((item) => (
            <li key={item.id}>
              <NewsListItem item={item} />
            </li>
          ))}
      </ul>

      {totalPages > 1 ? (
        <div className={styles.pagination}>
          <div className={styles.paginationCenter}>
            {hasPrev && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchParams({ page: String(page - 1) });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span aria-hidden="true">←</span>
                <span className={styles.paginationText}> Zurück</span>
              </Button>
            )}
          </div>

          <div className={styles.paginationCenter}>
            <span className={styles.paginationMeta}>
              {page} von {totalPages}
            </span>
          </div>

          <div className={styles.paginationCenter}>
            {hasNext && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchParams({ page: String(page + 1) });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className={styles.paginationText}>Weiter </span>
                <span aria-hidden="true">→</span>
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </ContentPage>
  );
}
