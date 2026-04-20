import { Link } from "react-router-dom";
import { appConfig } from "../config/env";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { CmsPageView } from "../features/cms-pages/CmsPageView";
import { usePublicPageByPathQuery } from "../features/cms-pages/useCmsPageQueries";
import { NewsCard } from "../features/news/NewsCard";
import { usePublicNewsListQuery } from "../features/news/useNewsQueries";
import { useSiteTitle } from "../hooks/useSiteTitle";

export function HomePage() {
  const homePageQuery = usePublicPageByPathQuery(appConfig.defaultHomeSlug);
  const newsQuery = usePublicNewsListQuery(1);
  const homeTitle = homePageQuery.data
    ? homePageQuery.data.title
    : "Startseite";
  useSiteTitle(homeTitle);

  if (homePageQuery.isPending) {
    return <LoadingState />;
  }

  if (homePageQuery.isError) {
    return (
      <ErrorState
        message="Die Startseite konnte nicht geladen werden."
        onRetry={() => {
          void homePageQuery.refetch();
        }}
      />
    );
  }

  if (homePageQuery.data) {
    return <CmsPageView page={homePageQuery.data} />;
  }

  return (
    <section className="home-fallback">
      <div className="page-hero home-fallback__hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Fallback</span>
          <h1>Willkommen bei ASV Loxstedt</h1>
          <p>
            Fuer diesen Bereich sind aktuell noch keine Inhalte hinterlegt. Bis
            die Startseite vollstaendig vorbereitet ist, findest du hier bald
            alle wichtigen Informationen auf einen Blick.
          </p>
          <div className="button-row">
            <Link
              className="button button--primary inline-flex items-center px-4 py-3 rounded-full"
              to="/news"
            >
              Zu den News
            </Link>
          </div>
        </div>
        <div className="page-hero__aside">
          <div className="page-hero__stat">
            <span className="eyebrow">Hinweis</span>
            <strong>Die Startseite wird gerade vorbereitet.</strong>
          </div>
          <div className="page-hero__stat">
            <span className="eyebrow">Naechster Schritt</span>
            <strong>Schau bis dahin gerne in die aktuellen News.</strong>
          </div>
        </div>
      </div>

      <section className="section-stack">
        <div className="section-heading">
          <span className="eyebrow">News</span>
          <h2>Aktuelle Meldungen</h2>
        </div>
        {newsQuery.isPending ? (
          <LoadingState message="Aktuelle News werden geladen." />
        ) : null}
        {newsQuery.isError ? (
          <ErrorState
            homeLink={false}
            message="Die News konnten nicht geladen werden."
            onRetry={() => {
              void newsQuery.refetch();
            }}
          />
        ) : null}
        {newsQuery.data?.data.length ? (
          <div className="news-grid">
            {newsQuery.data.data.slice(0, 3).map((item) => (
              <NewsCard item={item} key={item.id} />
            ))}
          </div>
        ) : null}
      </section>
    </section>
  );
}
