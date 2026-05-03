import { getCmsAssetUrl } from '@/shared/utils/assets';

/**
 * Build a full asset URL for a Directus file ID.
 */
export function buildAssetUrl(fileId: string): string {
  return getCmsAssetUrl(fileId) ?? '';
}
