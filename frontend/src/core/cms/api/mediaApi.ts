import { appConfig } from '@/core/config/env';

/**
 * Build a full asset URL for a Directus file ID.
 */
export function buildAssetUrl(fileId: string): string {
  return `${appConfig.apiBaseUrl}/assets/${fileId}`;
}
