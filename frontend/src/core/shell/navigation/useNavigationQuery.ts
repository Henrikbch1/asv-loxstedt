import { useQuery } from '@tanstack/react-query';
import { getNavigation, getPublicPages } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { buildNavigationTree } from './navGuards';

export { useGlobalSettingsQuery } from '@/core/settings/useGlobalSettingsQuery';

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
