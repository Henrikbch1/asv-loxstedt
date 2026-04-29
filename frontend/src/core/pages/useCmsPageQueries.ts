import { useQuery } from '@tanstack/react-query';
import { getLegalPages, getPublicPageByPath, getPublicPages } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { normalizeCmsPagePath } from '@/shared/utils/cmsPagePaths';

export function usePublicPagesQuery() {
  return useQuery({
    queryKey: queryKeys.pages,
    queryFn: ({ signal }) => getPublicPages(signal),
  });
}

export function usePublicPageByPathQuery(path: string) {
  const normalizedPath = normalizeCmsPagePath(path);

  return useQuery({
    enabled: Boolean(normalizedPath),
    queryKey: queryKeys.pageByPath(normalizedPath),
    queryFn: ({ signal }) => getPublicPageByPath(normalizedPath, signal),
  });
}

export function useLegalPagesQuery() {
  return useQuery({
    queryKey: queryKeys.globalSettings,
    queryFn: ({ signal }) => getLegalPages(signal),
  });
}
