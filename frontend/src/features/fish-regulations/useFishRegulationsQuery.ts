import { useQuery } from '@tanstack/react-query';
import { getPublicFishRegulations } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { useFeaturesConfig } from '@/core/config/FeaturesContext';

export function useFishRegulationsQuery() {
  const features = useFeaturesConfig();

  return useQuery({
    queryKey: queryKeys.fishRegulations,
    queryFn: ({ signal }) => getPublicFishRegulations(signal),
    enabled: features.fish_regulations,
  });
}
