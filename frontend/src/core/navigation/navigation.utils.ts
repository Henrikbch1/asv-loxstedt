import type { RawNavigationRecord } from '@/shared/types/navigation';
import type { RawPage } from '@/shared/types/domain';
import type { NavigationItem } from '@/core/cms/types';
import {
  buildCmsPagePathMap,
  getCmsPageHref,
} from '@/shared/utils/cmsPagePaths';

function isValidRawNavigationItem(item: RawNavigationRecord): boolean {
  return Boolean(item.page?.slug);
}

function compareBySort(
  a: { sort: number | null; label: string },
  b: { sort: number | null; label: string },
): number {
  const sortDiff =
    (a.sort ?? Number.MAX_SAFE_INTEGER) - (b.sort ?? Number.MAX_SAFE_INTEGER);

  if (sortDiff !== 0) {
    return sortDiff;
  }

  return a.label.localeCompare(b.label, 'de-DE');
}

export function buildNavigationTree(
  items: RawNavigationRecord[],
  pages: RawPage[],
): NavigationItem[] {
  const validItems = items.filter(isValidRawNavigationItem).sort(compareBySort);
  const nodes = new Map<string, NavigationItem>();
  const pagePathsById = buildCmsPagePathMap(pages);

  validItems.forEach((item) => {
    nodes.set(item.key, {
      key: item.key,
      label: item.label,
      sort: item.sort,
      href: item.page ? getCmsPageHref(item.page.id, pagePathsById) : null,
      children: [],
    });
  });

  const roots: NavigationItem[] = [];

  validItems.forEach((item) => {
    const node = nodes.get(item.key);

    if (!node) {
      return;
    }

    if (item.parentKey) {
      const parentNode = nodes.get(item.parentKey);

      if (parentNode) {
        parentNode.children.push(node);
        parentNode.children.sort(compareBySort);
        return;
      }
    }

    roots.push(node);
  });

  return roots;
}
