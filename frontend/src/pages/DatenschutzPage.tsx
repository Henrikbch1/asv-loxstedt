import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { RichText } from "../components/ui/RichText";
import { useGlobalSettingsQuery } from "../hooks/useGlobalSettingsQuery";
import { useSiteTitle } from "../hooks/useSiteTitle";

export function DatenschutzPage() {
  const settingsQuery = useGlobalSettingsQuery();
  useSiteTitle("Datenschutz");

  if (settingsQuery.isPending) return <LoadingState />;
  if (settingsQuery.isError)
    return (
      <ErrorState
        message="Die Datenschutzerklärung konnte nicht geladen werden."
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );

  const html = (settingsQuery.data as any)?.data_protection ?? null;

  return (
    <section className="section-stack shell py-8">
      <div className="section-heading">
        <h1>Datenschutz</h1>
      </div>
      <RichText html={html} />
    </section>
  );
}
