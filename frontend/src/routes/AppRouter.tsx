import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { AppLayout } from '../components/layout/AppLayout';
import { CmsPageRoute } from '../pages/CmsPageRoute';
import { HomePage } from '../pages/HomePage';
import { NewsDetailPage } from '../pages/NewsDetailPage';
import { NewsListPage } from '../pages/NewsListPage';
import { ImpressumPage } from '../pages/ImpressumPage';
import { DatenschutzPage } from '../pages/DatenschutzPage';
import { routePatterns } from '../config/routes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to={routePatterns.home} />} />
          <Route element={<HomePage />} path={routePatterns.home} />
          <Route element={<NewsListPage />} path={routePatterns.newsList} />
          <Route element={<NewsDetailPage />} path={routePatterns.newsDetail} />
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
