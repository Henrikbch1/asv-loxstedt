import React from 'react';
import type { CalendarProps } from '../model/calendar.types';

const DEFAULT_WRAPPER = 'mx-auto w-[min(1120px,calc(100vw-1.75rem))] py-8';
const DEFAULT_CALENDAR_ID =
  '6f6b625f83f9c81cb5376f8cf22dcf12d864148213cb05687e13276ef07b2f35@group.calendar.google.com';

export function CalendarEmbed({
  calendarId,
  src,
  mode = 'AGENDA',
  height = 600,
  tz = 'Europe/Berlin',
  color = '#0b8043',
  showCalendars = false,
  showDate = false,
  showNav = false,
  showTitle = false,
  showTabs = false,
  className,
}: CalendarProps) {
  const iframeSrc = React.useMemo(() => {
    if (src) return src;
    const id = calendarId ?? DEFAULT_CALENDAR_ID;
    const params = new URLSearchParams({
      height: String(height),
      wkst: '2',
      ctz: tz,
      mode,
      showPrint: '0',
      showTz: '0',
      showCalendars: showCalendars ? '1' : '0',
      showDate: showDate ? '1' : '0',
      showNav: showNav ? '1' : '0',
      showTitle: showTitle ? '1' : '0',
      showTabs: showTabs ? '1' : '0',
      src: id,
      color,
    });

    return `https://calendar.google.com/calendar/embed?${params.toString()}`;
  }, [
    src,
    calendarId,
    mode,
    height,
    tz,
    color,
    showCalendars,
    showDate,
    showNav,
    showTitle,
    showTabs,
  ]);

  // no external Open-in-Google button; the embed iframe controls display

  return (
    <div className={className ?? DEFAULT_WRAPPER}>
      <iframe
        title="Google Calendar"
        src={iframeSrc}
        className="w-full border-0"
        style={{ height }}
        frameBorder={0}
        scrolling="no"
      />
    </div>
  );
}

export default CalendarEmbed;
