import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { NotFoundState } from '@/shared/ui/NotFoundState';
import { RichText } from '@/shared/ui/RichText';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { ContentPage } from '@/shared/ui/ContentPage';
import { useGlobalSettingsQuery } from '@/core/settings/useGlobalSettingsQuery';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

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
