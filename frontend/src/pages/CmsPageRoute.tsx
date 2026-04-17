import { useParams } from "react-router-dom";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NotFoundState } from "../components/ui/NotFoundState";
import { CmsPageView } from "../features/cms-pages/CmsPageView";
import { usePublicPageBySlugQuery } from "../features/cms-pages/useCmsPageQueries";

export function CmsPageRoute() {
  const { slug = "" } = useParams();
  const pageQuery = usePublicPageBySlugQuery(slug);

  if (!slug) {
    return <NotFoundState />;
  }

  if (pageQuery.isPending) {
    return <LoadingState />;
  }

  if (pageQuery.isError) {
    return (
      <ErrorState
        message="Die CMS-Seite konnte nicht geladen werden."
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
