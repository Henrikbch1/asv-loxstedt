import { appConfig } from '@/core/config/env';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { CmsPageView } from '@/core/pages/CmsPageView';
import { usePublicPageByPathQuery } from '@/core/pages/useCmsPageQueries';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

export function HomePage() {
  const homePageQuery = usePublicPageByPathQuery(appConfig.defaultHomeSlug);
  const homeTitle = homePageQuery.data
    ? homePageQuery.data.title
    : 'Startseite';
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

  return null;
}
