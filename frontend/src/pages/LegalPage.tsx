import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { NotFoundState } from '../components/ui/NotFoundState';
import { RichText } from '../components/ui/RichText';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContentPage } from '../components/ui/ContentPage';
import { useGlobalSettingsQuery } from '../hooks/useGlobalSettingsQuery';
import { useSiteTitle } from '../hooks/useSiteTitle';

const styles = {
  section: 'flex flex-col gap-6',
} as const;

interface LegalPageProps {
  field: 'data_protection' | 'imprint';
  title: string;
  eyebrow?: string;
}

export function LegalPage({
  field,
  title,
  eyebrow = 'Rechtliches',
}: LegalPageProps) {
  const settingsQuery = useGlobalSettingsQuery();
  useSiteTitle(title);

  if (settingsQuery.isPending) {
    return <LoadingState />;
  }

  if (settingsQuery.isError) {
    return (
      <ErrorState
        message={`${title} konnte nicht geladen werden.`}
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );
  }

  const content = settingsQuery.data?.[field] ?? null;

  if (!content) {
    return <NotFoundState />;
  }

  return (
    <section className={styles.section}>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <ContentPage>
        <RichText className={ContentPage.bodyClass} html={content} />
      </ContentPage>
    </section>
  );
}
