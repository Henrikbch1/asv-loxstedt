import { ErrorState } from '@/core/ui/ErrorState';
import { LoadingState } from '@/core/ui/LoadingState';
import { NotFoundState } from '@/core/ui/NotFoundState';
import { RichText } from '@/core/ui/RichText';
import { SectionHeading } from '@/core/ui/SectionHeading';
import { ContentPage } from '@/core/ui/ContentPage';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import { useLegalPagesQuery } from './useCmsPageQueries';

const styles = {
  section: 'flex flex-col gap-6',
} as const;

interface LegalPageProps {
  field: 'dataProtection' | 'imprint';
  title: string;
  eyebrow?: string;
}

export function LegalPage({
  field,
  title,
  eyebrow = 'Rechtliches',
}: LegalPageProps) {
  const legalQuery = useLegalPagesQuery();
  useSiteTitle(title);

  if (legalQuery.isPending) {
    return <LoadingState />;
  }

  if (legalQuery.isError) {
    return (
      <ErrorState
        message={`${title} konnte nicht geladen werden.`}
        onRetry={() => {
          void legalQuery.refetch();
        }}
      />
    );
  }

  const content = legalQuery.data?.[field] ?? null;

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
