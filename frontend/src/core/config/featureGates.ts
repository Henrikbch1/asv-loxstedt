import type { FeatureFlags } from './FeaturesContext';
import type { NavigationTreeNode } from '@/shared/types/navigation';

export const FISH_REGULATIONS_PATH = 'gewaesser/schonzeiten-mindestmasse';

function normalizePath(path: string): string {
  return path
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
}

export function isFeatureEnabled(
  featureKey: keyof FeatureFlags,
  flags: FeatureFlags,
): boolean {
  return Boolean(flags[featureKey]);
}

export function isPathAllowed(path: string, flags: FeatureFlags): boolean {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === FISH_REGULATIONS_PATH) {
    return isFeatureEnabled('fish_regulations', flags);
  }

  return true;
}

export function filterNavigationTreeByFeatures(
  items: NavigationTreeNode[],
  flags: FeatureFlags,
): NavigationTreeNode[] {
  return items.reduce<NavigationTreeNode[]>((acc, item) => {
    const hrefPath = item.href ? normalizePath(item.href) : '';

    if (hrefPath && !isPathAllowed(hrefPath, flags)) {
      return acc;
    }

    acc.push({
      ...item,
      children: filterNavigationTreeByFeatures(item.children, flags),
    });

    return acc;
  }, []);
}
