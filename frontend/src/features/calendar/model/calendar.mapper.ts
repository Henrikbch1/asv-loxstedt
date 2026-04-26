import type { CalendarData } from './calendar.types';

// Map global settings (CMS response) to CalendarData used by the feature.
export function mapSettingsToCalendarData(settings: unknown): CalendarData | null {
  if (!settings || typeof settings !== 'object') return null;

  const s = settings as Record<string, unknown>;
  // Example mapping: try to read a calendarId from settings.calendar_id
  const calendarId = s['calendar_id'] ?? s['calendarId'] ?? null;

  if (!calendarId) return null;

  const showCalendars = Boolean(
    s['showCalendars'] ?? s['calendar_showCalendars'],
  );
  const showTabs = Boolean(s['showTabs'] ?? s['calendar_showTabs']);
  return { calendarId: calendarId as string, showCalendars, showTabs };
}

export default mapSettingsToCalendarData;
