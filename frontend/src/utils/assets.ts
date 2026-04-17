import { appConfig } from "../config/env";
import type { DirectusFile, DirectusFileReference } from "../types/directus";

function getAssetId(asset: DirectusFileReference): string | null {
  if (!asset) {
    return null;
  }

  if (typeof asset === "string" || typeof asset === "number") {
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
    `${appConfig.assetsPath.replace(/^\/?/, "")}/${assetId}`,
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
  if (!asset || typeof asset === "string" || typeof asset === "number") {
    return "CMS asset";
  }

  return asset.title || asset.filename_download || "CMS asset";
}

export function isExpandedDirectusFile(
  asset: DirectusFileReference,
): asset is DirectusFile {
  return Boolean(asset && typeof asset === "object" && "id" in asset);
}
