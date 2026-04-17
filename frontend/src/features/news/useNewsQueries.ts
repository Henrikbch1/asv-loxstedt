import { useQuery } from "@tanstack/react-query";
import { getPublicNewsBySlug, getPublicNewsList } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";

export function usePublicNewsListQuery() {
  return useQuery({
    queryKey: queryKeys.newsList,
    queryFn: ({ signal }) => getPublicNewsList(signal),
  });
}

export function usePublicNewsBySlugQuery(slug: string) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: queryKeys.newsBySlug(slug),
    queryFn: ({ signal }) => getPublicNewsBySlug(slug, signal),
  });
}
