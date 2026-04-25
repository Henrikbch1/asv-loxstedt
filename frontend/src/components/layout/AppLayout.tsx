import { Outlet, useLocation } from 'react-router-dom';
import type { NavigationTreeNode } from '../../types/navigation';
import {
  useGlobalSettingsQuery,
  useNavigationTreeQuery,
} from '../../features/navigation/useNavigationQuery';
import { ErrorState } from '../ui/ErrorState';
import { LoadingState } from '../ui/LoadingState';
import { routes } from '../../config/routes';
import { Footer } from '@/features/footer';
import { Header } from '@/features/header';
import { Calendar } from '@/features/calendar';

const styles = {
  shell: 'min-h-screen flex flex-col',
  container: 'mx-auto w-[min(1120px,calc(100vw-1.75rem))]',
  main: 'mx-auto w-[min(1120px,calc(100vw-1.75rem))] flex-1 pt-9 pb-20',
  calendarSection: 'mx-auto w-[min(1120px,calc(100vw-1.75rem))] py-8',
  calendarIframe: 'w-full border-0 h-[600px]',
} as const;

const NEWS_NAV_ITEM: NavigationTreeNode = {
  key: 'label:news',
  sort: 9999,
  label: 'News',
  href: routes.newsList,
  page: null,
  parentKey: null,
  children: [],
};

export function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === routes.home;
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
        navigationItems={[
          ...(navigationQuery.data ?? []).slice(0, 1),
          NEWS_NAV_ITEM,
          ...(navigationQuery.data ?? []).slice(1),
        ]}
        settings={settingsQuery.data}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      {isHome && <Calendar settings={settingsQuery.data} />}
      <Footer settings={settingsQuery.data} />
    </div>
  );
}
