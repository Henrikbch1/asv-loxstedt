import { useQuery } from '@tanstack/react-query';
import { getBoardRoles } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { featureConfig } from '@/core/config/feature-config';

export function useBoardRolesQuery() {
  return useQuery({
    queryKey: queryKeys.boardRoles,
    queryFn: ({ signal }) => getBoardRoles(signal),
    enabled: featureConfig.board.enabled,
  });
}
