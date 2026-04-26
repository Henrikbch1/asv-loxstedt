import { useQuery } from '@tanstack/react-query';
import { getBoardRoles } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';

export function useBoardRolesQuery() {
  return useQuery({
    queryKey: queryKeys.boardRoles,
    queryFn: ({ signal }) => getBoardRoles(signal),
  });
}
