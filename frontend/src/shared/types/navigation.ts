import type { CmsId, DirectusRelation } from './directus';
import type { RawPageSummary } from './domain';

export interface NavigationRecordRaw {
  sort: number | null;
  label: string;
  page: DirectusRelation<RawPageSummary>;
  parent?:
    | CmsId
    | {
        label: string;
        page: DirectusRelation<Pick<RawPageSummary, 'title' | 'slug'>>;
      }
    | null;
}

export interface RawNavigationRecord {
  key: string;
  sort: number | null;
  label: string;
  page: RawPageSummary | null;
  parentKey: string | null;
}

/** @deprecated Use RawNavigationRecord */
export type NavigationRecord = RawNavigationRecord;

export interface RawNavigationTreeNode extends RawNavigationRecord {
  href: string | null;
  children: RawNavigationTreeNode[];
}

/** @deprecated Use RawNavigationTreeNode */
export type NavigationTreeNode = RawNavigationTreeNode;
