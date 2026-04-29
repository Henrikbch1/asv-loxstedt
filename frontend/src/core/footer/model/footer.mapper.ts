import type { SiteSettings } from '@/core/cms/types';
import type { FooterData } from './footer.types';

interface MapEmbedConfig {
  zoom: number;
  type: string;
  language: string;
}

const DEFAULT_MAP_CONFIG: MapEmbedConfig = {
  zoom: 15,
  type: 'k',
  language: 'de',
};

export function mapSiteSettingsToFooterData(
  settings?: SiteSettings | null,
  mapConfig: MapEmbedConfig = DEFAULT_MAP_CONFIG,
): FooterData | null {
  if (!settings) return null;

  const displayName = settings.clubName ?? settings.siteName ?? '';

  const addressLines = [
    settings.contact.street?.trim(),
    [settings.contact.postalCode, settings.contact.city]
      .filter(Boolean)
      .join(' ')
      .trim() || undefined,
  ].filter(Boolean) as string[];

  const addressQuery = addressLines.length
    ? addressLines.filter(Boolean).join(' ')
    : undefined;

  const phone = settings.contact.phone ?? undefined;

  const footerNote = settings.footerNote ?? undefined;

  const mapsUrl = addressQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        addressQuery,
      )}`
    : undefined;

  const baseUrl = 'https://www.google.com/maps';

  const mapsEmbedUrl = addressQuery
    ? `${baseUrl}?q=${encodeURIComponent(addressQuery)}&t=${mapConfig.type}&z=${mapConfig.zoom}&hl=${mapConfig.language}&output=embed`
    : undefined;

  return {
    displayName,
    addressLines,
    addressQuery,
    phone,
    footerNote,
    mapsUrl,
    mapsEmbedUrl,
  };
}

/** @deprecated Use mapSiteSettingsToFooterData */
export const mapGlobalSettingsToFooterData = mapSiteSettingsToFooterData;
