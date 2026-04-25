import { useState } from 'react';

// Starter hook for calendar-related logic (fetching events, settings, etc.)
export function useCalendar() {
  const [calendarId] = useState<string | undefined>(undefined);

  // TODO: add fetching of events or settings
  return {
    calendarId,
  } as const;
}

export default useCalendar;
