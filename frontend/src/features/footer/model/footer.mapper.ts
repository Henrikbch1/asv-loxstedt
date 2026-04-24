import type { GlobalSettings } from '../../types/domain';
import type { FooterData } from './footer.types';
import { FOOTER_TOKENS } from '../styles/footer.tokens';
import type { FooterData as PackageFooterData } from '../package-spec';

/**
 * Mappt GlobalSettings -> Paket-kompatible FooterData (package-spec FooterData)
 */
export function mapGlobalSettingsToPackageFooterData(
  settings?: GlobalSettings | null,
): PackageFooterData | null {
  const mapped = mapGlobalSettingsToFooterData(settings);
  if (!mapped) return null;

  const contact = {
    name: mapped.displayName || undefined,
    address: mapped.addressLines?.length
      ? mapped.addressLines.join('\n')
      : undefined,
    phone: mapped.phone ?? undefined,
  };

  const map = mapped.mapsEmbedUrl
    ? { embedUrl: mapped.mapsEmbedUrl }
    : undefined;

  return {
    contact,
    map,
    copyright: `© ${new Date().getFullYear()} - ${mapped.displayName ?? ''}`,
    extras: { addressQuery: mapped.addressQuery },
  } as PackageFooterData;
}

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
