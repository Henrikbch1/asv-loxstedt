import { Outlet, useLocation } from 'react-router-dom';
import {
  useGlobalSettingsQuery,
  useNavigationTreeQuery,
} from '@/core/navigation/useNavigationQuery';
import { buildHeaderNavItems } from '@/core/navigation/navigation.service';
import { shouldShowCalendar } from '@/core/routing/routeResolver';
import { ErrorState } from '../ui/ErrorState';
import { LoadingState } from '../ui/LoadingState';
import { Footer } from '@/core/footer';
import { Header } from '@/core/layout/header/index';
import { Calendar } from '@/features/calendar';

const styles = {
  shell: 'min-h-screen flex flex-col',
  main: 'mx-auto w-[min(1120px,calc(100vw-1.75rem))] flex-1 pt-9 pb-20',
} as const;

export function AppLayout() {
  const { pathname } = useLocation();
  const settingsQuery = useGlobalSettingsQuery();
  const navigationQuery = useNavigationTreeQuery();

  if (settingsQuery.isPending || navigationQuery.isPending) {
    return (
      <div className={styles.main}>
        <LoadingState />
      </div>
    );
  }

  if (settingsQuery.isError || navigationQuery.isError || !settingsQuery.data) {
    return (
      <div className={styles.main}>
        <ErrorState
          message="Header und Footer konnten nicht geladen werden."
          onRetry={() => {
            void settingsQuery.refetch();
            void navigationQuery.refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <Header
        navigationItems={buildHeaderNavItems(navigationQuery.data ?? [])}
        settings={settingsQuery.data}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      {shouldShowCalendar(pathname) && <Calendar settings={settingsQuery.data} />}
      <Footer settings={settingsQuery.data} />
    </div>
  );
}
