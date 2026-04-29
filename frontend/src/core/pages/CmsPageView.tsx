import { RichText } from '@/core/ui/RichText';
import { SectionHeading } from '@/core/ui/SectionHeading';
import { ContentPage } from '@/core/ui/ContentPage';
import type { Page } from '@/core/cms/types';
import { getCmsAssetUrl } from '@/shared/utils/assets';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import { BoardPageView } from '@/features/board/BoardPageView';
import { featureConfig } from '@/core/config/feature-config';

interface CmsPageViewProps {
  page: Page;
}

export function CmsPageView({ page }: CmsPageViewProps) {
  if (page.template === 'board') {
    if (!featureConfig.board.enabled) {
      // Feature disabled: fall back to default page rendering so the
      // starter project doesn't need to remove CMS content.
      return <DefaultPageView page={page} />;
    }

    return <BoardPageView page={page} />;
  }

  return <DefaultPageView page={page} />;
}

function DefaultPageView({ page }: CmsPageViewProps) {
  useSiteTitle(page.title);
  const imageUrl = getCmsAssetUrl(page.featuredImage?.id ?? null, {
    fit: 'cover',
    width: 1600,
  });

  return (
    <ContentPage>
      <SectionHeading eyebrow="Seite" title={page.title}>
        {imageUrl ? (
          <img
            alt={page.featuredImage?.title ?? 'Seite Bild'}
            className="mt-6 rounded-lg"
            src={imageUrl}
          />
        ) : null}
      </SectionHeading>

      <RichText className={ContentPage.bodyClass} html={page.content} />
    </ContentPage>
  );
}
