import { useQuery } from '@tanstack/react-query';
import { getGlobalSettings } from '../api/cms';
import { queryKeys } from '../api/queryKeys';

export function useGlobalSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.globalSettings,
    queryFn: ({ signal }) => getGlobalSettings(signal),
  });
}
