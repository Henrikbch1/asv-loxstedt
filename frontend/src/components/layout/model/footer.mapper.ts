import type { GlobalSettings } from '../../../types/domain';
import type { FooterData } from './footer.types';
import { FOOTER_TOKENS } from '../styles/footer.tokens';

export function mapGlobalSettingsToFooterData(
  settings?: GlobalSettings | null,
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
  const mapType = FOOTER_TOKENS.map.type;
  const zoomLevel = FOOTER_TOKENS.map.zoom;
  const language = FOOTER_TOKENS.map.language;

  const mapsEmbedUrl = addressQuery
    ? `${baseUrl}?q=${encodeURIComponent(addressQuery)}&t=${mapType}&z=${zoomLevel}&hl=${language}&output=embed`
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
