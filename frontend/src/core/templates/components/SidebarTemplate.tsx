import type { CmsPage } from '@/shared/types/cms';
import { ContentPage } from '@/shared/ui/ContentPage';
import { RichText } from '@/shared/ui/RichText';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

interface Props {
  page: CmsPage;
}

/** Two-column layout with a narrow sidebar on the right. */
export function SidebarTemplate({ page }: Props) {
  useSiteTitle(page.title);

  return (
    <ContentPage>
      <SectionHeading eyebrow="Seite" title={page.title} />
      <div className="flex gap-8">
        <main className="min-w-0 flex-1">
          <RichText className={ContentPage.bodyClass} html={page.content} />
        </main>
        <aside className="hidden w-64 shrink-0 lg:block">
          {page.intro ? (
            <p className="text-sm text-gray-600">{page.intro}</p>
          ) : null}
        </aside>
      </div>
    </ContentPage>
  );
}
