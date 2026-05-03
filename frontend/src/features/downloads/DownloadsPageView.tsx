import type { CmsPage, Category, DownloadItem } from '@/shared/types/domain';
import { ContentPage } from '@/shared/ui/ContentPage';
import { PageHero } from '@/shared/ui/PageHero';
import { RichText } from '@/shared/ui/RichText';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Badge } from '@/shared/ui/Badge';
import { getCmsAssetLabel, getCmsAssetUrl } from '@/shared/utils/assets';
import { expandDirectusRelation } from '@/shared/utils/directus';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import { usePublicDownloadsQuery } from './useDownloadsQueries';
import { DownloadListItem } from './DownloadListItem';

const styles = {
  list: 'grid gap-3',
  categorySection: 'col-span-full mt-4 first:mt-0',
} as const;

interface DownloadsPageViewProps {
  page?: CmsPage | null;
}

export function DownloadsPageView({ page }: DownloadsPageViewProps) {
  useSiteTitle(page?.title ?? 'Downloads');

  const imageUrl = page
    ? getCmsAssetUrl(page.featured_image, { fit: 'cover', width: 1600 })
    : null;

  const { data: downloads, isLoading, isError } = usePublicDownloadsQuery();

  const grouped = groupByCategory(downloads ?? []);

  return (
    <ContentPage>
      <PageHero
        eyebrow="Downloads"
        imageAlt={page ? getCmsAssetLabel(page.featured_image) : undefined}
        imageUrl={imageUrl}
        title={page?.title ?? 'Downloads'}
      />

      {page?.content ? (
        <RichText className={ContentPage.bodyClass} html={page.content} />
      ) : null}

      <section>
        {isLoading ? <LoadingState title="Downloads werden geladen" /> : null}
        {isError ? (
          <ErrorState message="Downloads konnten nicht geladen werden." />
        ) : null}
        {!isLoading && !isError && grouped.length === 0 ? (
          <EmptyState
            message="Es sind noch keine Downloads vorhanden."
            title="Keine Downloads"
          />
        ) : null}
        {grouped.map(({ category, items }) => (
          <div key={category ?? '__none'} className={styles.categorySection}>
            {category ? <Badge className="mb-3">{category}</Badge> : null}
            <ul className={styles.list}>
              {items.map((item) => (
                <DownloadListItem key={String(item.id)} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </ContentPage>
  );
}

interface GroupedDownloads {
  category: string | null;
  items: DownloadItem[];
}

function groupByCategory(items: DownloadItem[]): GroupedDownloads[] {
  const map = new Map<string, GroupedDownloads>();

  for (const item of items) {
    const cat = expandDirectusRelation<Category>(item.category);
    const key = cat?.name ?? '__none';

    if (!map.has(key)) {
      map.set(key, { category: cat?.name ?? null, items: [] });
    }
    map.get(key)!.items.push(item);
  }

  // Sort: named categories first (alphabetically), then uncategorized
  return [...map.values()].sort((a, b) => {
    if (a.category === null) return 1;
    if (b.category === null) return -1;
    return a.category.localeCompare(b.category, 'de-DE');
  });
}
