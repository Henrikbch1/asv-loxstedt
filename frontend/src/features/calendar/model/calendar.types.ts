export type CalendarProps = {
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
  className?: string;
};

export type CalendarData = {
  calendarId?: string;
} & Partial<CalendarProps>;

export default CalendarProps;
