import { routes } from '@/core/config/routes';
import type { NavigationTreeNode } from '@/shared/types/navigation';

const NEWS_NAV_ITEM: NavigationTreeNode = {
  key: 'label:news',
  sort: 9999,
  label: 'News',
  href: routes.newsList,
  page: null,
  parentKey: null,
  children: [],
};

/**
 * Injects fixed feature nav items (e.g. News) into the navigation tree
 * returned from the CMS.
 *
 * The News item is inserted after the first CMS item so it appears
 * as the second entry regardless of CMS sort order.
 */
export function buildHeaderNavItems(
  tree: NavigationTreeNode[],
): NavigationTreeNode[] {
  return [...tree.slice(0, 1), NEWS_NAV_ITEM, ...tree.slice(1)];
}
