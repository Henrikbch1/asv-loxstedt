/**
 * index.ts – public API for core CMS type definitions.
 * Stable types used throughout the app (features, shell, pages).
 */
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
} from '@/shared/types/domain';

export type {
  NavigationRecordRaw,
  NavigationRecord,
  NavigationTreeNode,
} from '@/shared/types/navigation';

export type {
  CmsId,
  DirectusFile,
  DirectusRelation,
  DirectusFileReference,
  DirectusListMeta,
  DirectusListResponse,
  DirectusSingletonResponse,
} from './directus.types';
