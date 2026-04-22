import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { NotFoundState } from "../components/ui/NotFoundState";
import { RichText } from "../components/ui/RichText";
import { useGlobalSettingsQuery } from "../hooks/useGlobalSettingsQuery";
import { useSiteTitle } from "../hooks/useSiteTitle";

export function DatenschutzPage() {
  const settingsQuery = useGlobalSettingsQuery();
  useSiteTitle("Datenschutz");

  if (settingsQuery.isPending) {
    return <LoadingState />;
  }

  if (settingsQuery.isError) {
    return (
      <ErrorState
        message="Die Datenschutzerklärung konnte nicht geladen werden."
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );
  }

  const dataProtection = settingsQuery.data?.data_protection ?? null;

  if (!dataProtection) {
    return <NotFoundState />;
  }

  return (
    <section className="section-stack shell">
      <div className="section-heading">
        <span className="eyebrow">Rechtliches</span>
        <h1>Datenschutz</h1>
      </div>

      <div className="content-page">
        <RichText
          className="rich-text content-page__body"
          html={dataProtection}
        />
      </div>
    </section>
  );
}
