import type { MediaAsset } from './media.types';

export interface PageSummary {
  id: string | number;
  title: string;
  slug: string;
  navigationTitle?: string | null;
}

export interface Page extends PageSummary {
  content?: string | null;
  intro?: string | null;
  featuredImage?: MediaAsset | null;
  parentPage?: PageSummary | null;
  template?: string | null;
  hero?: {
    title?: string | null;
    text?: string | null;
  } | null;
  display?: {
    showTitle?: boolean | null;
    showIntro?: boolean | null;
  } | null;
}
