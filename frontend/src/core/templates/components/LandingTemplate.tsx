import type { CmsPage } from '@/shared/types/cms';
import { ContentPage } from '@/shared/ui/ContentPage';
import { RichText } from '@/shared/ui/RichText';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

interface Props {
  page: CmsPage;
}

/** Full-width landing layout – hero takes full width, content below. */
export function LandingTemplate({ page }: Props) {
  useSiteTitle(page.title);

  return (
    <ContentPage>
      {page.hero_title ? (
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold">{page.hero_title}</h1>
          {page.hero_text ? (
            <p className="mt-4 text-lg">{page.hero_text}</p>
          ) : null}
        </div>
      ) : null}
      <RichText className={ContentPage.bodyClass} html={page.content} />
    </ContentPage>
  );
}
