export const queryKeys = {
  globalSettings: ['global-settings'] as const,
  calendarSettings: ['calendar-settings'] as const,
  newsSettings: ['news-settings'] as const,
  featureEnabled: (key: string) => ['features', key] as const,
  navigation: ['navigation'] as const,
  navigationTree: ['navigation', 'tree'] as const,
  pages: ['pages'] as const,
  pageByPath: (path: string) => ['pages', 'path', path] as const,
  newsList: (page: number, pageSize: number) =>
    ['news', 'list', page, pageSize] as const,
  newsById: (id: string | number) => ['news', 'detail', String(id)] as const,
  boardRoles: ['board', 'roles'] as const,
} as const;
