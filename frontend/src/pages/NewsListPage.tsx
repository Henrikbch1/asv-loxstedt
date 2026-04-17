import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NewsCard } from "../features/news/NewsCard";
import { usePublicNewsListQuery } from "../features/news/useNewsQueries";

export function NewsListPage() {
  const newsQuery = usePublicNewsListQuery();

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

  if (!newsQuery.data?.length) {
    return (
      <EmptyState
        ctaLabel="Zur Startseite"
        ctaTo="/"
        message="Sobald neue veroeffentlichte Eintraege im CMS vorhanden sind, erscheinen sie hier automatisch."
        title="Noch keine News vorhanden"
      />
    );
  }

  return (
    <section className="section-stack">
      <div className="section-heading">
        <span className="eyebrow">News</span>
        <h1>Aktuelle Meldungen</h1>
        <p>
          Diese Uebersicht wird direkt aus der Collection <strong>news</strong>{" "}
          geladen und zeigt nur veroeffentlichte Inhalte.
        </p>
      </div>

      <div className="news-grid">
        {newsQuery.data.map((item) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
