import { useQuery } from "@tanstack/react-query";
import { getBoardRoles } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";

export function useBoardRolesQuery() {
  return useQuery({
    queryKey: queryKeys.boardRoles,
    queryFn: ({ signal }) => getBoardRoles(signal),
  });
}
