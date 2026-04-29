import { useQuery } from '@tanstack/react-query';
import { getCalendarSettings } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { mapRawSettingsToCalendarSettings } from './model/calendar.mapper';

export function useCalendarSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.calendarSettings,
    queryFn: ({ signal }) => getCalendarSettings(signal),
    select: mapRawSettingsToCalendarSettings,
  });
}
