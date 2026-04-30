import { useQuery } from '@tanstack/react-query';
import { getBoardRoles, getFeatureEnabled } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { featureConfig } from '@/core/config/feature-config';
import { mapRoleToBoardRole, groupBoardRoles } from './model/board.mapper';

export function useBoardRolesQuery() {
  return useQuery({
    queryKey: queryKeys.boardRoles,
    queryFn: ({ signal }) => getBoardRoles(signal),
    select: (roles) => groupBoardRoles(roles.map(mapRoleToBoardRole)),
    enabled: featureConfig.board.enabled,
  });
}

export function useBoardFeatureEnabledQuery() {
  return useQuery({
    queryKey: queryKeys.featureEnabled('board'),
    queryFn: ({ signal }) =>
      getFeatureEnabled('board', featureConfig.board.enabled, signal),
  });
}
