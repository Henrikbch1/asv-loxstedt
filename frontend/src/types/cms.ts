import type {
  CmsId,
  DirectusFileReference,
  DirectusRelation,
} from "./directus";

export interface PageSummary {
  id: CmsId;
  title: string;
  slug: string;
}

export interface GlobalSettings {
  site_name: string;
  logo: DirectusFileReference;
  footer_text: string | null;
}

export interface CmsPage extends PageSummary {
  content: string | null;
  featured_image: DirectusFileReference;
  parent_page: DirectusRelation<PageSummary>;
}

export interface Category {
  id: CmsId;
  name: string;
}

export interface NewsItemSummary {
  id: CmsId;
  title: string;
  slug: string | null;
  date: string | null;
  image: DirectusFileReference;
  text: string | null;
  category: DirectusRelation<Category>;
}

export type NewsItem = NewsItemSummary;

export interface DownloadItem {
  id: CmsId;
  title: string;
  file: DirectusFileReference;
  categories: DirectusRelation<Category>[] | null;
}

export interface Person {
  id: CmsId;
  firstname: string;
  lastname: string;
}

export interface Role {
  id: CmsId;
  role: string;
  email: string | null;
  person_link: DirectusRelation<Person>;
}

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
