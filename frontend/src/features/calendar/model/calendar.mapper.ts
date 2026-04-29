import type { RawCalendarSettings } from '@/shared/types/domain';
import type { CalendarSettings } from './calendar.types';

export function mapRawSettingsToCalendarSettings(
  raw: RawCalendarSettings,
): CalendarSettings | null {
  const calendarId = raw.calendar_id ?? null;
  if (!calendarId) return null;
  return { calendarId };
}
