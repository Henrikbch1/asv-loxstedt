import {
  useCalendarSettingsQuery,
  useCalendarFeatureEnabledQuery,
} from '../useCalendarQueries';
import { CalendarEmbed } from './CalendarEmbed';
import type { CalendarEmbedProps } from '../model/calendar.types';

type CalendarProps = Omit<CalendarEmbedProps, 'calendarId'>;

export function Calendar(props: CalendarProps) {
  const { data: enabled } = useCalendarFeatureEnabledQuery();
  const { data: settings } = useCalendarSettingsQuery();

  if (!enabled || !settings) return null;

  return <CalendarEmbed calendarId={settings.calendarId} {...props} />;
}
