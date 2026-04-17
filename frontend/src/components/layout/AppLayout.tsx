import { Outlet } from "react-router-dom";
import {
  useGlobalSettingsQuery,
  useNavigationTreeQuery,
} from "../../features/navigation/useNavigationQuery";
import { ErrorState } from "../ui/ErrorState";
import { LoadingState } from "../ui/LoadingState";
import { Footer } from "./Footer";
import { Header } from "./Header";

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
          message="Header und Footer konnten nicht aus dem CMS geladen werden."
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
        navigationItems={navigationQuery.data ?? []}
        settings={settingsQuery.data}
      />
      <main className="shell shell--main">
        <Outlet />
      </main>
      <Footer settings={settingsQuery.data} />
    </div>
  );
}
