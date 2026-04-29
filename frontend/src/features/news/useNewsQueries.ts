import { useQuery } from '@tanstack/react-query';
import {
  getPublicNewsById,
  getPublicNewsList,
  getFeatureEnabled,
  getNewsSettings,
} from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { featureConfig } from '@/core/config/feature-config';
import { mapRawSettingsToNewsSettings } from './model/news.mapper';
import { NEWS_PAGE_SIZE } from '@/core/config/constants';

export function useNewsFeatureEnabledQuery() {
  return useQuery({
    queryKey: queryKeys.featureEnabled('news'),
    queryFn: ({ signal }) =>
      getFeatureEnabled('news', featureConfig.news.enabled, signal),
  });
}

export function useNewsSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.newsSettings,
    queryFn: ({ signal }) => getNewsSettings(signal),
    select: mapRawSettingsToNewsSettings,
  });
}

export function usePublicNewsListQuery(
  page: number,
  pageSize = NEWS_PAGE_SIZE,
) {
  return useQuery({
    queryKey: queryKeys.newsList(page, pageSize),
    queryFn: ({ signal }) => getPublicNewsList(page, pageSize, signal),
  });
}

export function usePublicNewsByIdQuery(id: string) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: queryKeys.newsById(id),
    queryFn: ({ signal }) => getPublicNewsById(id, signal),
  });
}
