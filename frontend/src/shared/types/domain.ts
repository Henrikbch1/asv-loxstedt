import type {
  CmsId,
  DirectusFileReference,
  DirectusRelation,
} from './directus';

export interface PageSummary {
  id: CmsId;
  title: string;
  slug: string;
  navigation_title?: string | null;
}

export interface GlobalSettings {
  id?: CmsId;
  site_name?: string | null;
  logo?: DirectusFileReference | null;
  footer_note?: string | null;
  imprint?: string | null;
  data_protection?: string | null;
  club_name?: string | null;
  street?: string | null;
  postal_code?: string | null;
  city?: string | null;
  phone?: string | null;
}

export interface CmsPage extends PageSummary {
  content: string | null;
  featured_image: DirectusFileReference;
  parent_page: DirectusRelation<PageSummary> | null;
  template?: string | null;
  intro?: string | null;
  hero_title?: string | null;
  hero_text?: string | null;
  navigation_title?: string | null;
  show_title?: boolean | null;
  show_intro?: boolean | null;
}

export interface Category {
  id?: CmsId;
  name: string;
}

export interface NewsItemSummary {
  id: CmsId;
  title: string;
  slug?: string | null;
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
  sort: number | null;
  role: string;
  email: string | null;
  is_vacant: boolean;
  category: DirectusRelation<Category>;
  person_link: DirectusRelation<Person>;
}
