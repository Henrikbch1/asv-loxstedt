import type { NavigationRecord, NavigationTreeNode } from "../../types/cms";

function isValidNavigationItem(item: NavigationRecord): boolean {
  return Boolean(item.page?.slug);
}

function compareNavigation(a: NavigationRecord, b: NavigationRecord): number {
  const sortDiff =
    (a.sort ?? Number.MAX_SAFE_INTEGER) - (b.sort ?? Number.MAX_SAFE_INTEGER);

  if (sortDiff !== 0) {
    return sortDiff;
  }

  return a.label.localeCompare(b.label, "de-DE");
}

export function buildNavigationTree(
  items: NavigationRecord[],
): NavigationTreeNode[] {
  const validItems = items
    .filter(isValidNavigationItem)
    .sort(compareNavigation);
  const nodes = new Map<NavigationRecord["key"], NavigationTreeNode>();

  validItems.forEach((item) => {
    nodes.set(item.key, {
      ...item,
      href: item.page?.slug ? `/${item.page.slug}` : null,
      children: [],
    });
  });

  const roots: NavigationTreeNode[] = [];

  validItems.forEach((item) => {
    const node = nodes.get(item.key);

    if (!node) {
      return;
    }

    if (item.parentKey) {
      const parentNode = nodes.get(item.parentKey);

      if (parentNode) {
        parentNode.children.push(node);
        parentNode.children.sort(compareNavigation);
        return;
      }
    }

    roots.push(node);
  });

  return roots;
}
