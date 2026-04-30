import { routes } from '@/core/shell/routing/staticRoutes';
import { featureConfig } from '@/core/config/feature-config';

/**
 * Returns true when the calendar section should be rendered at the given
 * pathname. The check respects the global feature flag so the calendar
 * can be disabled without touching the layout.
 */
export function shouldShowCalendar(pathname: string): boolean {
  return featureConfig.calendar.enabled && pathname === routes.home;
}
