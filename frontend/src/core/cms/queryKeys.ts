export const queryKeys = {
  globalSettings: ['global-settings'] as const,
  navigation: ['navigation'] as const,
  navigationTree: ['navigation', 'tree'] as const,
  pages: ['pages'] as const,
  pageByPath: (path: string) => ['pages', 'path', path] as const,
  newsList: (page: number) => ['news', 'list', page] as const,
  newsById: (id: string | number) => ['news', 'detail', String(id)] as const,
  boardRoles: ['board', 'roles'] as const,
  downloads: ['downloads'] as const,
  features: ['features'] as const,
} as const;
