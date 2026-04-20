import { RichText } from "../../components/ui/RichText";
import type { CmsPage } from "../../types/cms";
import { getCmsAssetLabel, getCmsAssetUrl } from "../../utils/assets";
import { useSiteTitle } from "../../hooks/useSiteTitle";

interface CmsPageViewProps {
  page: CmsPage;
}

export function CmsPageView({ page }: CmsPageViewProps) {
  useSiteTitle(page.title);
  const imageUrl = getCmsAssetUrl(page.featured_image, {
    fit: "cover",
    width: 1600,
  });

  return (
    <article className="content-page">
      <header className="page-hero page-hero--content">
        <div className="page-hero__copy">
          <span className="eyebrow">Seite</span>
          <h1>{page.title}</h1>
        </div>
        {imageUrl ? (
          <div className="page-hero__media">
            <img alt={getCmsAssetLabel(page.featured_image)} src={imageUrl} />
          </div>
        ) : null}
      </header>

      <RichText className="rich-text content-page__body" html={page.content} />
    </article>
  );
}
