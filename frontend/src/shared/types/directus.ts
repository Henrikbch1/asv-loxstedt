/**
 * directus.ts – barrel re-export.
 * Directus API response types are now canonical in core/cms/adapter/directus.types.ts.
 * This file keeps existing imports working without change.
 */
export type {
  CmsId,
  DirectusFile,
  DirectusRelation,
  DirectusFileReference,
  DirectusListMeta,
  DirectusListResponse,
  DirectusSingletonResponse,
} from '@/core/cms/adapter/directus.types';
