import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NewsCard } from "../features/news/NewsCard";
import { usePublicNewsListQuery } from "../features/news/useNewsQueries";
import { useSiteTitle } from "../hooks/useSiteTitle";

const PAGE_SIZE = 5;

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
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
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
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            className="button button--ghost"
            disabled={!hasPrev}
            onClick={() => {
              setSearchParams({ page: String(page - 1) });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            type="button"
          >
            ← Zurück
          </button>
          <span className="meta-text">
            Seite {page} von {totalPages}
          </span>
          <button
            className="button button--ghost"
            disabled={!hasNext}
            onClick={() => {
              setSearchParams({ page: String(page + 1) });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            type="button"
          >
            Weiter →
          </button>
        </div>
      ) : null}
    </section>
  );
}
