import type { CalendarData } from './calendar.types';

// Map global settings (CMS response) to CalendarData used by the feature.
export function mapSettingsToCalendarData(settings: any): CalendarData | null {
  if (!settings) return null;

  // Example mapping: try to read a calendarId from settings.calendar_id
  const calendarId = settings?.calendar_id ?? settings?.calendarId ?? null;

  if (!calendarId) return null;

  return { calendarId };
}

export default mapSettingsToCalendarData;
