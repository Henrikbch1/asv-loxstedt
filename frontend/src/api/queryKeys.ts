export const queryKeys = {
  globalSettings: ["global-settings"] as const,
  navigation: ["navigation"] as const,
  pages: ["pages"] as const,
  pageBySlug: (slug: string) => ["pages", slug] as const,
  newsList: ["news"] as const,
  newsBySlug: (slug: string) => ["news", slug] as const,
} as const;
