import { useQuery } from "@tanstack/react-query";
import { getPublicPages } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";
import {
  findCmsPageByPath,
  normalizeCmsPagePath,
} from "../../utils/cmsPagePaths";

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
    queryKey: queryKeys.pages,
    queryFn: ({ signal }) => getPublicPages(signal),
    select: (pages) => findCmsPageByPath(normalizedPath, pages),
  });
}
