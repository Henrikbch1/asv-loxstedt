import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { CmsPageRoute } from "../pages/CmsPageRoute";
import { HomePage } from "../pages/HomePage";
import { NewsDetailPage } from "../pages/NewsDetailPage";
import { NewsListPage } from "../pages/NewsListPage";
import { routePatterns } from "../config/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<HomePage />} path={routePatterns.home} />
          <Route element={<NewsListPage />} path={routePatterns.newsList} />
          <Route element={<NewsDetailPage />} path={routePatterns.newsDetail} />
          <Route element={<CmsPageRoute />} path={routePatterns.cmsPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
