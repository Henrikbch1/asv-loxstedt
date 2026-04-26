import type { CmsPage } from '@/shared/types/cms';
import type { CmsId, DirectusRelation } from '@/shared/types/directus';

function normalizePathSegment(value: string | null | undefined): string | null {
  const normalizedValue = value?.trim().replace(/^\/+|\/+$/g, '') ?? '';

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function getRelationId<T extends { id: CmsId }>(
  relation: DirectusRelation<T> | undefined,
): CmsId | null {
  if (relation == null) {
    return null;
  }

  if (typeof relation === 'object' && 'id' in relation) {
    return relation.id;
  }

  return relation;
}

function warnPathIssue(message: string, details: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.warn(message, details);
  }
}

export function normalizeCmsPagePath(path: string): string {
  return path.trim().replace(/^\/+|\/+$/g, '');
}

export function buildCmsPagePathMap(pages: CmsPage[]): Map<string, string> {
  const pagesById = new Map<string, CmsPage>(
    pages.map((page) => [String(page.id), page]),
  );
  const pathCache = new Map<string, string | null>();

  const resolvePagePath = (
    page: CmsPage,
    visitedPageIds: Set<string>,
  ): string | null => {
    const pageId = String(page.id);
    const cachedPath = pathCache.get(pageId);

    if (cachedPath !== undefined) {
      return cachedPath;
    }

    if (visitedPageIds.has(pageId)) {
      warnPathIssue('Cycle detected while resolving CMS page path.', {
        pageId: page.id,
        slug: page.slug,
      });
      pathCache.set(pageId, null);
      return null;
    }

    const ownSegment = normalizePathSegment(page.slug);

    if (!ownSegment) {
      warnPathIssue('Skipping CMS page with empty slug while resolving path.', {
        pageId: page.id,
      });
      pathCache.set(pageId, null);
      return null;
    }

    visitedPageIds.add(pageId);

    const parentId = getRelationId(page.parent_page);
    let fullPath = ownSegment;

    if (parentId != null) {
      const parentPage = pagesById.get(String(parentId));

      if (!parentPage) {
        warnPathIssue(
          'Skipping CMS page because parent_page could not be resolved.',
          {
            pageId: page.id,
            parentId,
            slug: page.slug,
          },
        );
        visitedPageIds.delete(pageId);
        pathCache.set(pageId, null);
        return null;
      }

      const parentPath = resolvePagePath(parentPage, visitedPageIds);

      if (!parentPath) {
        visitedPageIds.delete(pageId);
        pathCache.set(pageId, null);
        return null;
      }

      fullPath = `${parentPath}/${ownSegment}`;
    }

    visitedPageIds.delete(pageId);
    pathCache.set(pageId, fullPath);
    return fullPath;
  };

  const pathsById = new Map<string, string>();
  const seenPaths = new Map<string, string>();

  pages.forEach((page) => {
    const pagePath = resolvePagePath(page, new Set<string>());

    if (!pagePath) {
      return;
    }

    const existingPageId = seenPaths.get(pagePath);

    if (existingPageId && existingPageId !== String(page.id)) {
      warnPathIssue('Duplicate CMS page path detected.', {
        duplicatePath: pagePath,
        pageId: page.id,
        existingPageId,
      });
      return;
    }

    seenPaths.set(pagePath, String(page.id));
    pathsById.set(String(page.id), pagePath);
  });

  return pathsById;
}

export function findCmsPageByPath(
  path: string,
  pages: CmsPage[],
): CmsPage | null {
  const normalizedPath = normalizeCmsPagePath(path);

  if (!normalizedPath) {
    return null;
  }

  const pathByPageId = buildCmsPagePathMap(pages);

  return (
    pages.find(
      (page) => pathByPageId.get(String(page.id)) === normalizedPath,
    ) ?? null
  );
}

export function getCmsPageHref(
  pageId: CmsId,
  pathsByPageId: Map<string, string>,
): string | null {
  const pagePath = pathsByPageId.get(String(pageId));

  return pagePath ? `/${pagePath}` : null;
}
