import { appConfig } from '../config/env';
import type { DirectusFile, DirectusFileReference } from '../types/directus';

function getAssetId(asset: DirectusFileReference): string | null {
  if (!asset) {
    return null;
  }

  if (typeof asset === 'string' || typeof asset === 'number') {
    return String(asset);
  }

  return String(asset.id);
}

export function getCmsAssetUrl(
  asset: DirectusFileReference,
  params?: Record<string, string | number>,
): string | null {
  const assetId = getAssetId(asset);

  if (!assetId) {
    return null;
  }

  const url = new URL(
    `${appConfig.assetsPath.replace(/^\/?/, '')}/${assetId}`,
    `${appConfig.apiBaseUrl}/`,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export function getCmsAssetLabel(asset: DirectusFileReference): string {
  if (!asset || typeof asset === 'string' || typeof asset === 'number') {
    return 'CMS asset';
  }

  return asset.title || asset.filename_download || 'CMS asset';
}

export function isExpandedDirectusFile(
  asset: DirectusFileReference,
): asset is DirectusFile {
  return Boolean(asset && typeof asset === 'object' && 'id' in asset);
}

/**
 * Thumbnail URL for news preview frames (list item, card).
 * Uses `fit: "inside"` so the full image is preserved — no cropping.
 * Dimensions match the largest preview frame (900×675 = 4:3).
 */
export function getNewsPreviewUrl(asset: DirectusFileReference): string | null {
  return getCmsAssetUrl(asset, { fit: 'inside', width: 900, height: 675 });
}

/**
 * Full-quality URL for the news detail view and lightbox.
 * Uses `fit: "inside"` with generous bounds to preserve the original
 * aspect ratio at high resolution — no server-side crop applied.
 */
export function getNewsDetailUrl(asset: DirectusFileReference): string | null {
  return getCmsAssetUrl(asset, { fit: 'inside', width: 1600, height: 1600 });
}
