// Re-exports — prefer Raw* names for new code; aliases kept for backward compat
export type {
  RawPageSummary,
  RawGlobalSettings,
  RawPage,
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
  RawNavigationRecord,
  RawNavigationTreeNode,
  NavigationRecord,
  NavigationTreeNode,
} from './navigation';
