export interface CalendarSettings {
  calendarId: string;
}

export interface CalendarEmbedProps {
  calendarId?: string;
  src?: string;
  mode?: 'AGENDA' | 'MONTH' | 'WEEK' | 'DAY';
  height?: number;
  tz?: string;
  color?: string;
  showCalendars?: boolean;
  showDate?: boolean;
  showNav?: boolean;
  showTitle?: boolean;
  showTabs?: boolean;
  className?: string;
}
