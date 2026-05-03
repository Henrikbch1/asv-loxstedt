import type { CmsPage } from '@/shared/types/cms';
import { RichText } from '@/shared/ui/RichText';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { ContentPage } from '@/shared/ui/ContentPage';
import { getCmsAssetLabel, getCmsAssetUrl } from '@/shared/utils/assets';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

interface Props {
  page: CmsPage;
}

export function DefaultTemplate({ page }: Props) {
  useSiteTitle(page.title);
  const imageUrl = getCmsAssetUrl(page.featured_image, {
    fit: 'cover',
    width: 1600,
  });

  return (
    <ContentPage>
      <SectionHeading eyebrow="Seite" title={page.title}>
        {imageUrl ? (
          <img
            alt={getCmsAssetLabel(page.featured_image)}
            className="mt-6 rounded-lg"
            src={imageUrl}
          />
        ) : null}
      </SectionHeading>
      <RichText className={ContentPage.bodyClass} html={page.content} />
    </ContentPage>
  );
}
