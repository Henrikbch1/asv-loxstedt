import type {
  NavigationRecord,
  NavigationRecordRaw,
} from '@/shared/types/navigation';

export function getNavigationKey(label: string, slug?: string | null): string {
  return slug ? `page:${slug}` : `label:${label.trim().toLowerCase()}`;
}

export function normalizeNavigationRecord(
  item: NavigationRecordRaw,
): NavigationRecord {
  const page =
    item.page && typeof item.page === 'object' && 'slug' in item.page
      ? item.page
      : null;

  const parentKey =
    item.parent && typeof item.parent === 'object'
      ? getNavigationKey(
          item.parent.label,
          item.parent.page && typeof item.parent.page === 'object'
            ? item.parent.page.slug
            : null,
        )
      : null;

  return {
    key: getNavigationKey(item.label, page?.slug),
    sort: item.sort,
    label: item.label,
    page,
    parentKey,
  };
}
