import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { NotFoundState } from '../components/ui/NotFoundState';
import { RichText } from '../components/ui/RichText';
import { useGlobalSettingsQuery } from '../hooks/useGlobalSettingsQuery';
import { useSiteTitle } from '../hooks/useSiteTitle';

export function ImpressumPage() {
  const settingsQuery = useGlobalSettingsQuery();
  useSiteTitle('Impressum');

  if (settingsQuery.isPending) {
    return <LoadingState />;
  }

  if (settingsQuery.isError) {
    return (
      <ErrorState
        message="Das Impressum konnte nicht geladen werden."
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );
  }

  const imprint = settingsQuery.data?.imprint ?? null;

  if (!imprint) {
    return <NotFoundState />;
  }

  return (
    <section className="section-stack shell">
      <div className="section-heading">
        <span className="eyebrow">Rechtliches</span>
        <h1>Impressum</h1>
      </div>

      <div className="content-page">
        <RichText className="rich-text content-page__body" html={imprint} />
      </div>
    </section>
  );
}
