import { RichText } from '../../components/ui/RichText';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ContentPage } from '../../components/ui/ContentPage';
import type { CmsPage } from '../../types/cms';
import { getCmsAssetLabel, getCmsAssetUrl } from '../../utils/assets';
import { useSiteTitle } from '../../hooks/useSiteTitle';
import { BoardPageView } from '../board/BoardPageView';

interface CmsPageViewProps {
  page: CmsPage;
}

export function CmsPageView({ page }: CmsPageViewProps) {
  if (page.template === 'board') {
    return <BoardPageView page={page} />;
  }

  return <DefaultPageView page={page} />;
}

function DefaultPageView({ page }: CmsPageViewProps) {
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
            className="mt-4 rounded-lg"
            src={imageUrl}
          />
        ) : null}
      </SectionHeading>

      <RichText className={ContentPage.bodyClass} html={page.content} />
    </ContentPage>
  );
}
