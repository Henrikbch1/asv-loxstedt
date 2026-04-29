import type {
  RawNavigationRecord,
  NavigationRecordRaw,
} from '@/shared/types/navigation';
import type { RawPage, RawGlobalSettings } from '@/shared/types/domain';
import type { DirectusFile } from '@/shared/types/directus';
import type { NewsItem } from '@/shared/types/domain';
import type {
  MediaAsset,
  Page,
  SiteSettings,
  LegalPages,
} from '@/core/cms/types';
import { appConfig } from '@/core/config/env';

export function getNavigationKey(label: string, slug?: string | null): string {
  return slug ? `page:${slug}` : `label:${label.trim().toLowerCase()}`;
}

export function normalizeNavigationRecord(
  item: NavigationRecordRaw,
): RawNavigationRecord {
  const page =
    item.page && typeof item.page === 'object' && 'slug' in item.page
      ? item.page
      : null;

  const parentKey =
    item.parent && typeof item.parent === 'object'
      ? getNavigationKey(
          item.parent.label,
          item.parent.page && typeof item.parent.page === 'object'
            ? item.parent.page.slug
            : null,
        )
      : null;

  return {
    key: getNavigationKey(item.label, page?.slug),
    sort: item.sort,
    label: item.label,
    page,
    parentKey,
  };
}

function getNewsTimestamp(newsItem: NewsItem): number {
  if (!newsItem.date) {
    return Number.NEGATIVE_INFINITY;
  }

  const timestamp = Date.parse(newsItem.date);

  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

export function compareNewsItems(a: NewsItem, b: NewsItem): number {
  const dateDiff = getNewsTimestamp(b) - getNewsTimestamp(a);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return String(b.id).localeCompare(String(a.id), 'de-DE', { numeric: true });
}

// ─── Stable-type mappers ───────────────────────────────────────────────────

function buildAssetUrl(assetId: string, baseUrl: string): string {
  return new URL(
    `${appConfig.assetsPath.replace(/^\/?/, '')}/${assetId}`,
    `${baseUrl}/`,
  ).toString();
}

export function mapDirectusFileToMediaAsset(
  file: DirectusFile,
  baseUrl: string = appConfig.apiBaseUrl,
): MediaAsset {
  return {
    id: file.id,
    url: buildAssetUrl(String(file.id), baseUrl),
    title: file.title ?? null,
    description: file.description ?? null,
    mimeType: file.type ?? null,
    width: file.width ?? null,
    height: file.height ?? null,
    filename: file.filename_download ?? null,
  };
}

function resolveFileRefToMediaAsset(
  ref: unknown,
  baseUrl: string,
): MediaAsset | null {
  if (!ref) return null;
  if (typeof ref === 'string' || typeof ref === 'number') {
    return { id: ref, url: buildAssetUrl(String(ref), baseUrl) };
  }
  if (typeof ref === 'object' && ref !== null && 'id' in ref) {
    return mapDirectusFileToMediaAsset(ref as DirectusFile, baseUrl);
  }
  return null;
}

export function mapRawPageToPage(
  raw: RawPage,
  baseUrl: string = appConfig.apiBaseUrl,
): Page {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    navigationTitle: raw.navigation_title ?? null,
    content: raw.content,
    intro: raw.intro ?? null,
    featuredImage: resolveFileRefToMediaAsset(raw.featured_image, baseUrl),
    parentPage:
      raw.parent_page &&
      typeof raw.parent_page === 'object' &&
      'id' in raw.parent_page
        ? {
            id: (raw.parent_page as { id: string | number }).id,
            title: (raw.parent_page as { title?: string }).title ?? '',
            slug: (raw.parent_page as { slug?: string }).slug ?? '',
          }
        : null,
    template: raw.template ?? null,
    hero:
      raw.hero_title != null || raw.hero_text != null
        ? { title: raw.hero_title ?? null, text: raw.hero_text ?? null }
        : null,
    display:
      raw.show_title != null || raw.show_intro != null
        ? {
            showTitle: raw.show_title ?? null,
            showIntro: raw.show_intro ?? null,
          }
        : null,
  };
}

export function mapRawGlobalSettingsToSiteSettings(
  raw: RawGlobalSettings,
  baseUrl: string = appConfig.apiBaseUrl,
): SiteSettings {
  return {
    siteName: raw.site_name ?? null,
    clubName: raw.club_name ?? null,
    logo: resolveFileRefToMediaAsset(raw.logo, baseUrl),
    contact: {
      street: raw.street ?? null,
      postalCode: raw.postal_code ?? null,
      city: raw.city ?? null,
      phone: raw.phone ?? null,
    },
    footerNote: raw.footer_note ?? null,
  };
}

export function mapRawGlobalSettingsToLegalPages(
  raw: RawGlobalSettings,
): LegalPages {
  return {
    imprint: raw.imprint ?? null,
    dataProtection: raw.data_protection ?? null,
  };
}
