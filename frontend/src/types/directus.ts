export type CmsId = number | string;

export interface DirectusFile {
  id: CmsId;
  title?: string | null;
  description?: string | null;
  filename_download?: string | null;
  type?: string | null;
  width?: number | null;
  height?: number | null;
}

export type DirectusRelation<T> = CmsId | T | null;
export type DirectusFileReference = DirectusRelation<DirectusFile>;

export interface DirectusListMeta {
  filter_count?: number;
  total_count?: number;
}

export interface DirectusListResponse<T> {
  data: T[];
  meta?: DirectusListMeta;
}

export interface DirectusSingletonResponse<T> {
  data: T;
}
