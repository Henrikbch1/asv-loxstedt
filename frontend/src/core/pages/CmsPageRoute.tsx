import { useParams } from 'react-router-dom';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { NotFoundState } from '@/shared/ui/NotFoundState';
import { CmsPageView } from './CmsPageView';
import { usePublicPageByPathQuery } from './useCmsPageQueries';

export function CmsPageRoute() {
  const params = useParams();
  const path = params['*'] ?? '';
  const pageQuery = usePublicPageByPathQuery(path);

  if (!path) {
    return <NotFoundState />;
  }

  if (pageQuery.isPending) {
    return <LoadingState />;
  }

  if (pageQuery.isError) {
    return (
      <ErrorState
        message="Die Seite konnte nicht geladen werden."
        onRetry={() => {
          void pageQuery.refetch();
        }}
      />
    );
  }

  if (!pageQuery.data) {
    return <NotFoundState />;
  }

  return <CmsPageView page={pageQuery.data} />;
}
