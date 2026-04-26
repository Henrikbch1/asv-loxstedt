export const routes = {
  home: '/home',
  newsList: '/news',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  newsDetail: (id: string | number) => `/news/${id}`,
} as const;

/** Routen-Muster für React Router */
export const routePatterns = {
  home: '/home',
  newsList: '/news',
  newsDetail: '/news/:id',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  cmsPage: '*',
} as const;
