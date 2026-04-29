import { useQuery } from '@tanstack/react-query';
import { getCalendarSettings, getFeatureEnabled } from '@/core/cms/cms';
import { queryKeys } from '@/core/cms/queryKeys';
import { featureConfig } from '@/core/config/feature-config';
import { mapRawSettingsToCalendarSettings } from './model/calendar.mapper';

export function useCalendarSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.calendarSettings,
    queryFn: ({ signal }) => getCalendarSettings(signal),
    select: mapRawSettingsToCalendarSettings,
  });
}

export function useCalendarFeatureEnabledQuery() {
  return useQuery({
    queryKey: queryKeys.featureEnabled('calendar'),
    queryFn: ({ signal }) =>
      getFeatureEnabled('calendar', featureConfig.calendar.enabled, signal),
  });
}
