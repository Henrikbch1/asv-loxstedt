export const routes = {
  home: "/",
  newsList: "/news",
  newsDetail: (id: string | number) => `/news/${id}`,
} as const;

/** Routen-Muster für React Router */
export const routePatterns = {
  home: "/",
  newsList: "/news",
  newsDetail: "/news/:id",
  cmsPage: "*",
} as const;
