import { routes } from '@/core/shell/routing/staticRoutes';

/**
 * Returns true when the calendar section should be rendered at the given
 * pathname. The check respects the feature flag so the calendar
 * can be disabled without touching the layout.
 */
export function shouldShowCalendar(
  pathname: string,
  calendarEnabled: boolean,
): boolean {
  return calendarEnabled && pathname === routes.home;
}
