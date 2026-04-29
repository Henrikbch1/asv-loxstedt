import React from 'react';
import type { CalendarEmbedProps } from '../model/calendar.types';
import { calendarClasses } from '../styles/calendar.classes';
import { CALENDAR_TOKENS } from '../styles/calendar.tokens';

const DEFAULT_CALENDAR_ID =
  '6f6b625f83f9c81cb5376f8cf22dcf12d864148213cb05687e13276ef07b2f35@group.calendar.google.com';

export function CalendarEmbed({
  calendarId,
  src,
  mode = 'AGENDA',
  height = CALENDAR_TOKENS.sizes.defaultHeight,
  tz = 'Europe/Berlin',
  color = CALENDAR_TOKENS.colors.primary,
  showCalendars = false,
  showDate = false,
  showNav = false,
  showTitle = false,
  showTabs = false,
  className,
}: CalendarEmbedProps) {
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

  return (
    <div className={className ?? calendarClasses.layout.root}>
      <iframe
        title="Google Calendar"
        src={iframeSrc}
        className={calendarClasses.layout.iframe}
        style={{ height }}
        frameBorder={0}
        scrolling="no"
      />
    </div>
  );
}
