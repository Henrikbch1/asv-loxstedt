export interface FooterData {
  displayName: string;
  addressLines: string[];
  /** Optional pre-built address query string (preferred for maps links) */
  addressQuery?: string;
  phone?: string;
  footerNote?: string;
  mapsUrl?: string;
  mapsEmbedUrl?: string;
}
