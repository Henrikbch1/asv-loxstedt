export const routes = {
  home: '/home',
  newsList: '/news',
  downloads: '/downloads',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  newsDetail: (id: string | number) => `/news/${id}`,
} as const;

/** Routen-Muster für React Router */
export const routePatterns = {
  home: '/home',
  newsList: '/news',
  newsDetail: '/news/:id',
  downloads: '/downloads',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  cmsPage: '*',
} as const;
