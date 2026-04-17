import { Link } from "react-router-dom";
import { appConfig } from "../config/env";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { CmsPageView } from "../features/cms-pages/CmsPageView";
import { usePublicPageBySlugQuery } from "../features/cms-pages/useCmsPageQueries";
import { NewsCard } from "../features/news/NewsCard";
import { usePublicNewsListQuery } from "../features/news/useNewsQueries";

export function HomePage() {
  const homePageQuery = usePublicPageBySlugQuery(appConfig.defaultHomeSlug);
  const newsQuery = usePublicNewsListQuery();

  if (homePageQuery.isPending) {
    return <LoadingState />;
  }

  if (homePageQuery.isError) {
    return (
      <ErrorState
        message="Die Home-Seite konnte nicht aus dem CMS geladen werden."
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
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Willkommen bei ASV Loxstedt
          </h1>
          <p className="text-muted max-w-prose">
            Es wurde noch keine veroeffentlichte CMS-Seite mit dem Slug{" "}
            <strong>{appConfig.defaultHomeSlug}</strong> gefunden. Lege diese
            Seite in Directus an, um die Startseite komplett aus dem CMS zu
            steuern.
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
            <strong>Die Startseite kommt noch nicht aus Directus.</strong>
          </div>
          <div className="page-hero__stat">
            <span className="eyebrow">Naechster Schritt</span>
            <strong>
              Lege eine veroeffentlichte CMS-Seite mit dem Standardslug an.
            </strong>
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
        {newsQuery.data?.length ? (
          <div className="news-grid">
            {newsQuery.data.slice(0, 3).map((item) => (
              <NewsCard item={item} key={item.id} />
            ))}
          </div>
        ) : null}
      </section>
    </section>
  );
}
