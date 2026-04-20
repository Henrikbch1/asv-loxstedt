import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { CmsPageRoute } from "../pages/CmsPageRoute";
import { HomePage } from "../pages/HomePage";
import { NewsDetailPage } from "../pages/NewsDetailPage";
import { NewsListPage } from "../pages/NewsListPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<NewsListPage />} path="/news" />
          <Route element={<NewsDetailPage />} path="/news/:id" />
          <Route element={<CmsPageRoute />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
