import type { GlobalSettings } from '@/shared/types/domain';
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

export function mapGlobalSettingsToFooterData(
  settings?: GlobalSettings | null,
  mapConfig: MapEmbedConfig = DEFAULT_MAP_CONFIG,
): FooterData | null {
  if (!settings) return null;

  const displayName = settings.club_name ?? settings.site_name ?? '';

  const addressLines = [
    settings.street?.trim(),
    [settings.postal_code, settings.city].filter(Boolean).join(' ').trim() ||
      undefined,
  ].filter(Boolean) as string[];

  const addressQuery = addressLines.length
    ? addressLines.filter(Boolean).join(' ')
    : undefined;

  const phone = settings.phone ?? undefined;

  const footerNote = settings.footer_note ?? undefined;

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
