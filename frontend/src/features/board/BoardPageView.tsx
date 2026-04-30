import { RichText } from '@/core/ui/RichText';
import { PageHero } from '@/core/ui/PageHero';
import { ContentPage } from '@/core/ui/ContentPage';
import type { Page } from '@/core/cms/types';
import { getCmsAssetUrl } from '@/shared/utils/assets';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import {
  useBoardRolesQuery,
  useBoardFeatureEnabledQuery,
} from './useBoardQueries';
import { BoardList } from './components/BoardList';

interface BoardPageViewProps {
  page: Page;
}

export function BoardPageView({ page }: BoardPageViewProps) {
  useSiteTitle(page.title);

  const imageUrl = getCmsAssetUrl(page.featuredImage?.id ?? null, {
    fit: 'cover',
    width: 1600,
  });

  const { data: enabled } = useBoardFeatureEnabledQuery();
  const { data: groups = [], isLoading, isError } = useBoardRolesQuery();

  return (
    <ContentPage>
      <PageHero
        eyebrow="Unser"
        title={page.title}
        imageUrl={imageUrl}
        imageAlt={page.featuredImage?.title ?? 'Vorstand'}
      />

      <RichText className={ContentPage.bodyClass} html={page.content} />

      {enabled ? (
        <section>
          <BoardList groups={groups} isLoading={isLoading} isError={isError} />
        </section>
      ) : null}
    </ContentPage>
  );
}
