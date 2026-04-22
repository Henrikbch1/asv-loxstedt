import type { CmsId, DirectusRelation } from "./directus";
import type { PageSummary } from "./domain";

export interface NavigationRecordRaw {
  sort: number | null;
  label: string;
  page: DirectusRelation<PageSummary>;
  parent?:
    | CmsId
    | {
        label: string;
        page: DirectusRelation<Pick<PageSummary, "title" | "slug">>;
      }
    | null;
}

export interface NavigationRecord {
  key: string;
  sort: number | null;
  label: string;
  page: PageSummary | null;
  parentKey: string | null;
}

export interface NavigationTreeNode extends NavigationRecord {
  href: string | null;
  children: NavigationTreeNode[];
}
