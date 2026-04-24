export interface Link {
  label: string;
  to: string;
}

export interface FooterContact {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: string[] | null;
}

export interface FooterMap {
  mapsEmbedUrl?: string | null;
  addressString?: string | null;
}

export interface FooterData {
  contact?: FooterContact | null;
  map?: FooterMap | null;
  copyright?: string | null;
}

export interface FooterProps {
  data?: FooterData | null;
  legalLinks?: Link[] | null;
  className?: string;
  variant?: string | null;
}

export type FooterContactType = FooterContact;
export type FooterMapType = FooterMap;
export type LinkType = Link;

export default {} as any;
