import { useQuery } from '@tanstack/react-query';
import { getPublicDownloads } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { useFeaturesConfig } from '@/core/config/FeaturesContext';

export function usePublicDownloadsQuery() {
  const features = useFeaturesConfig();
  return useQuery({
    queryKey: queryKeys.downloads,
    queryFn: ({ signal }) => getPublicDownloads(signal),
    enabled: features.downloads,
  });
}
