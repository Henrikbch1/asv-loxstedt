import { useQuery } from '@tanstack/react-query';
import { getBoardRoles } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { useFeaturesConfig } from '@/core/config/FeaturesContext';

export function useBoardRolesQuery() {
  const features = useFeaturesConfig();
  return useQuery({
    queryKey: queryKeys.boardRoles,
    queryFn: ({ signal }) => getBoardRoles(signal),
    enabled: features.board,
  });
}
