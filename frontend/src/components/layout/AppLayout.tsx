import { Outlet, useLocation } from 'react-router-dom';
import type { NavigationTreeNode } from '../../types/navigation';
import {
  useGlobalSettingsQuery,
  useNavigationTreeQuery,
} from '../../features/navigation/useNavigationQuery';
import { ErrorState } from '../ui/ErrorState';
import { LoadingState } from '../ui/LoadingState';
import { routes } from '../../config/routes';
import { Footer } from './Footer';
import { Header } from './Header';

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
  const isHome = location.pathname === '/';
  const settingsQuery = useGlobalSettingsQuery();
  const navigationQuery = useNavigationTreeQuery();

  if (settingsQuery.isPending || navigationQuery.isPending) {
    return (
      <div className="shell shell--main">
        <LoadingState />
      </div>
    );
  }

  if (settingsQuery.isError || navigationQuery.isError || !settingsQuery.data) {
    return (
      <div className="shell shell--main">
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
    <div className="app-shell">
      <Header
        navigationItems={[
          ...(navigationQuery.data ?? []).slice(0, 1),
          NEWS_NAV_ITEM,
          ...(navigationQuery.data ?? []).slice(1),
        ]}
        settings={settingsQuery.data}
      />
      <main className="shell shell--main">
        <Outlet />
      </main>
      {isHome && (
        <div className="shell py-8">
          <iframe
            title="Google Calendar Agenda"
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FBerlin&mode=AGENDA&showPrint=0&showTz=0&title&showCalendars=0&showDate=0&showNav=0&showTitle=0&showTabs=0&src=NmY2YjYyNWY4M2Y5YzgxY2I1Mzc2ZjhjZjIyZGNmMTJkODY0MTQ4MjEzY2IwNTY4N2UxMzI3NmVmMDdiMmYzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%230b8043"
            className="w-full"
            style={{ border: 0, height: '600px' }}
            frameBorder={0}
            scrolling="no"
          />
        </div>
      )}
      <Footer settings={settingsQuery.data} />
    </div>
  );
}
