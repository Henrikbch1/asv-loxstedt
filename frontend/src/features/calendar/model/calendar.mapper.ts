import type { CalendarData } from './calendar.types';

// Map global settings (CMS response) to CalendarData used by the feature.
export function mapSettingsToCalendarData(settings: any): CalendarData | null {
  if (!settings) return null;

  // Example mapping: try to read a calendarId from settings.calendar_id
  const calendarId = settings?.calendar_id ?? settings?.calendarId ?? null;

  if (!calendarId) return null;

  const showCalendars = Boolean(
    settings?.showCalendars ?? settings?.calendar_showCalendars,
  );
  const showTabs = Boolean(settings?.showTabs ?? settings?.calendar_showTabs);
  return { calendarId, showCalendars, showTabs };
}

export default mapSettingsToCalendarData;
