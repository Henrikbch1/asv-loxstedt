import { RichText } from '../../components/ui/RichText';
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
    <article className="content-page">
      <header className="section-heading">
        <span className="eyebrow">Seite</span>
        <h1>{page.title}</h1>
        {imageUrl ? (
          <img alt={getCmsAssetLabel(page.featured_image)} src={imageUrl} />
        ) : null}
      </header>

      <RichText className="rich-text content-page__body" html={page.content} />
    </article>
  );
}
