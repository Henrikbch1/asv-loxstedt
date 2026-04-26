import { useQuery } from '@tanstack/react-query';
import { getGlobalSettings } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';

export function useGlobalSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.globalSettings,
    queryFn: ({ signal }) => getGlobalSettings(signal),
  });
}
