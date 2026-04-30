import { useQuery } from '@tanstack/react-query';
import { getPublicDownloads } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { featureConfig } from '@/core/config/feature-config';

export function usePublicDownloadsQuery() {
  return useQuery({
    queryKey: queryKeys.downloads,
    queryFn: ({ signal }) => getPublicDownloads(signal),
    enabled: featureConfig.downloads.enabled,
  });
}
