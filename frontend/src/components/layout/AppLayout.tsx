import { Outlet } from "react-router-dom";
import type { NavigationTreeNode } from "../../types/navigation";
import {
  useGlobalSettingsQuery,
  useNavigationTreeQuery,
} from "../../features/navigation/useNavigationQuery";
import { ErrorState } from "../ui/ErrorState";
import { LoadingState } from "../ui/LoadingState";
import { routes } from "../../config/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";

const NEWS_NAV_ITEM: NavigationTreeNode = {
  key: "label:news",
  sort: 9999,
  label: "News",
  href: routes.newsList,
  page: null,
  parentKey: null,
  children: [],
};

export function AppLayout() {
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
      <Footer settings={settingsQuery.data} />
    </div>
  );
}
