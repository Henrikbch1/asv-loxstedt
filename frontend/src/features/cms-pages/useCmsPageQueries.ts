import { useQuery } from "@tanstack/react-query";
import { getPublicPageBySlug, getPublicPages } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";

export function usePublicPagesQuery() {
  return useQuery({
    queryKey: queryKeys.pages,
    queryFn: ({ signal }) => getPublicPages(signal),
  });
}

export function usePublicPageBySlugQuery(slug: string) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: queryKeys.pageBySlug(slug),
    queryFn: ({ signal }) => getPublicPageBySlug(slug, signal),
  });
}
