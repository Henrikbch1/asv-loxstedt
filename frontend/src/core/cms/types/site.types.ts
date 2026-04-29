import type { MediaAsset } from './media.types';

export interface SiteSettings {
  siteName?: string | null;
  clubName?: string | null;
  logo?: MediaAsset | null;
  contact: {
    street?: string | null;
    postalCode?: string | null;
    city?: string | null;
    phone?: string | null;
  };
  footerNote?: string | null;
}

export interface LegalPages {
  imprint?: string | null;
  dataProtection?: string | null;
}
