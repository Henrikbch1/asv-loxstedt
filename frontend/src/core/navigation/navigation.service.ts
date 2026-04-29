import { routes } from '@/core/config/routes';
import { featureConfig } from '@/core/config/feature-config';
import type { NavigationItem } from '@/core/cms/types';

const NEWS_NAV_ITEM: NavigationItem = {
  key: 'label:news',
  sort: 9999,
  label: 'News',
  href: routes.newsList,
  children: [],
};

/**
 * Injects fixed feature nav items (e.g. News) into the navigation tree
 * returned from the CMS. Respects `featureConfig.news.enabled` so the
 * starter project can disable News entirely.
 */
export function buildHeaderNavItems(tree: NavigationItem[]): NavigationItem[] {
  // If the News feature is disabled, do nothing.
  if (!featureConfig.news.enabled) return tree;

  // If the CMS already provides a News navigation entry (by href, key or label),
  // respect the CMS and do not inject a duplicate. This prevents the core
  // navigation from hard-wiring an optional feature into the layout.
  const hasNews = tree.some(
    (n) =>
      n.href === routes.newsList ||
      n.key === NEWS_NAV_ITEM.key ||
      n.label.trim().toLowerCase() === 'news',
  );

  if (hasNews) return tree;

  if (tree.length === 0) return [NEWS_NAV_ITEM];

  return [...tree.slice(0, 1), NEWS_NAV_ITEM, ...tree.slice(1)];
}
