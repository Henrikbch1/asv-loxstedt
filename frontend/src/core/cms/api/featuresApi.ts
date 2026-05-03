import { fetchDirectus } from '../directus';
import type { DirectusListResponse } from '@/shared/types/directus';

interface DirectusFeature {
  key: string;
  enabled: boolean;
}

export async function getFeatures(
  signal?: AbortSignal,
): Promise<DirectusFeature[]> {
  const response = await fetchDirectus<DirectusListResponse<DirectusFeature>>(
    '/items/features',
    {
      query: { fields: ['key', 'enabled'] },
      signal,
    },
  );
  return response.data;
}
