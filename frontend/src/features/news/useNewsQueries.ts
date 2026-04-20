import { useQuery } from "@tanstack/react-query";
import {
  getPublicNewsById,
  getPublicNewsBySlug,
  getPublicNewsList,
} from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";

export function usePublicNewsListQuery(page: number) {
  return useQuery({
    queryKey: queryKeys.newsList(page),
    queryFn: ({ signal }) => getPublicNewsList(page, signal),
  });
}

export function usePublicNewsBySlugQuery(slug: string) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: queryKeys.newsBySlug(slug),
    queryFn: ({ signal }) => getPublicNewsBySlug(slug, signal),
  });
}

export function usePublicNewsByIdQuery(id: string) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: queryKeys.newsById(id),
    queryFn: ({ signal }) => getPublicNewsById(id, signal),
  });
}
