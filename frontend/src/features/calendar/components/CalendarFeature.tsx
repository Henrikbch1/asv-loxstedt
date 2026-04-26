import React from 'react';
import { CalendarEmbed } from './CalendarEmbed';
import { useCalendar } from '../useCalendar';
import { mapSettingsToCalendarData } from '../model/calendar.mapper';
import type { CalendarProps } from '../model/calendar.types';

interface CalendarFeatureProps extends Partial<CalendarProps> {
  settings?: unknown;
}

export function CalendarFeature({ settings, ...rest }: CalendarFeatureProps) {
  const { calendarId } = useCalendar();
  const mapped = mapSettingsToCalendarData(settings as any) ?? { calendarId };

  return <CalendarEmbed {...mapped} {...(rest as CalendarProps)} />;
}

export default CalendarFeature;
