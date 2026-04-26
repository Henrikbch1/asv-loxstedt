// Re-exports for backward compatibility — import directly from domain.ts or navigation.ts
export type {
  PageSummary,
  GlobalSettings,
  CmsPage,
  Category,
  NewsItemSummary,
  NewsItem,
  DownloadItem,
  Person,
  Role,
} from './domain';

export type {
  NavigationRecordRaw,
  NavigationRecord,
  NavigationTreeNode,
} from './navigation';
