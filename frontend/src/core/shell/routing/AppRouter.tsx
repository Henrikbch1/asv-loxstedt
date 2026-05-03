import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { AppLayout as MainLayout } from '@/core/shell/layout/MainLayout';
import { CmsPageRoute } from '@/core/pages/CmsPageRoute';
import { HomePage } from '@/features/pages/HomePage';
import { NewsDetailPage } from '@/features/news/routes/NewsDetailPage';
import { NewsListPage } from '@/features/news/routes/NewsListPage';
import { ImpressumPage } from '@/core/pages/ImpressumPage';
import { DatenschutzPage } from '@/core/pages/DatenschutzPage';
import { DownloadsPage } from '@/features/downloads/routes/DownloadsPage';
import { routePatterns } from '@/core/shell/routing/staticRoutes';

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate replace to={routePatterns.home} />} />
          <Route element={<HomePage />} path={routePatterns.home} />
          <Route element={<NewsListPage />} path={routePatterns.newsList} />
          <Route element={<NewsDetailPage />} path={routePatterns.newsDetail} />
          <Route element={<DownloadsPage />} path={routePatterns.downloads} />
          <Route element={<ImpressumPage />} path={routePatterns.impressum} />
          <Route
            element={<DatenschutzPage />}
            path={routePatterns.datenschutz}
          />
          <Route element={<CmsPageRoute />} path={routePatterns.cmsPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
