import { useCalendarSettingsQuery } from '../useCalendarQueries';
import { CalendarEmbed } from './CalendarEmbed';
import type { CalendarEmbedProps } from '../model/calendar.types';

type CalendarProps = Omit<CalendarEmbedProps, 'calendarId'>;

export function Calendar(props: CalendarProps) {
  const { data: settings } = useCalendarSettingsQuery();

  if (!settings) return null;

  return <CalendarEmbed calendarId={settings.calendarId} {...props} />;
}
