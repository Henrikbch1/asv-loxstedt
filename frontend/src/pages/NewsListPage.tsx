import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NewsCard } from "../features/news/NewsCard";
import { usePublicNewsListQuery } from "../features/news/useNewsQueries";
import { useSiteTitle } from "../hooks/useSiteTitle";
import { NEWS_PAGE_SIZE } from "../config/constants";

export function NewsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const newsQuery = usePublicNewsListQuery(page);
  useSiteTitle("Aktuelle Meldungen");

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
        message="Sobald neue veroeffentlichte Eintraege vorhanden sind, erscheinen sie hier automatisch."
        title="Noch keine News vorhanden"
      />
    );
  }

  const totalCount = newsQuery.data.meta?.filter_count ?? 0;
  const totalPages = Math.ceil(totalCount / NEWS_PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <section className="section-stack py-8">
      <div className="section-heading">
        <span className="eyebrow">News</span>
        <h1>Aktuelle Meldungen</h1>
        <p>
          Hier findest du aktuelle Meldungen, Berichte und Hinweise aus dem
          Vereinsleben.
        </p>
      </div>

      <div className="news-grid">
        {newsQuery.data.data.map((item) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="grid grid-cols-3 items-center gap-2 pt-4">
          <div className="flex justify-center">
            {hasPrev && (
              <button
                className="button button--ghost"
                onClick={() => {
                  setSearchParams({ page: String(page - 1) });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
              >
                ← Zurück
              </button>
            )}
          </div>

          <div className="flex justify-center">
            <span className="meta-text">
              Seite {page} von {totalPages}
            </span>
          </div>

          <div className="flex justify-center">
            {hasNext && (
              <button
                className="button button--ghost"
                onClick={() => {
                  setSearchParams({ page: String(page + 1) });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
              >
                Weiter →
              </button>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
