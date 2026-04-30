import type { CmsPage } from '@/shared/types/cms';
import { ContentPage } from '@/shared/ui/ContentPage';
import { RichText } from '@/shared/ui/RichText';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

interface Props {
  page: CmsPage;
}

/** Single narrow column – ideal for legal or text-heavy pages. */
export function NarrowContentTemplate({ page }: Props) {
  useSiteTitle(page.title);

  return (
    <ContentPage>
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Seite" title={page.title} />
        <RichText className={ContentPage.bodyClass} html={page.content} />
      </div>
    </ContentPage>
  );
}
