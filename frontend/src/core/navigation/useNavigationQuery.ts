import { useQuery } from '@tanstack/react-query';
import { getNavigation } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';

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
    queryFn: ({ signal }) => getNavigation(signal),
  });
}
