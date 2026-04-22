import { useQuery } from "@tanstack/react-query";
import { getNavigation, getPublicPages } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";
import { buildNavigationTree } from "./navigation.utils";

export { useGlobalSettingsQuery } from "../../hooks/useGlobalSettingsQuery";

export function useNavigationQuery() {
  return useQuery({
    queryKey: queryKeys.navigation,
    queryFn: ({ signal }) => getNavigation(signal),
  });
}

export function useNavigationTreeQuery() {
  return useQuery({
    queryKey: queryKeys.navigationTree,
    queryFn: async ({ signal }) => {
      const [navigationItems, pages] = await Promise.all([
        getNavigation(signal),
        getPublicPages(signal),
      ]);

      return buildNavigationTree(navigationItems, pages);
    },
  });
}
