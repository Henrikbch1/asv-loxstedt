import { routes } from '@/core/config/routes';
import { featureConfig } from '@/core/config/feature-config';
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
 * returned from the CMS. Respects `featureConfig.news.enabled` so the
 * starter project can disable News entirely.
 */
export function buildHeaderNavItems(
  tree: NavigationTreeNode[],
): NavigationTreeNode[] {
  if (!featureConfig.news.enabled) return tree;

  if (tree.length === 0) return [NEWS_NAV_ITEM];

  return [...tree.slice(0, 1), NEWS_NAV_ITEM, ...tree.slice(1)];
}
