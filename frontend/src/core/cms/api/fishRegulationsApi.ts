import { fetchDirectus } from '../directus';
import type { FishRegulation } from '@/shared/types/domain';
import type { DirectusListResponse } from '@/shared/types/directus';

const fishRegulationFields = [
  'id',
  'name',
  'image',
  'image.id',
  'image.title',
  'image.filename_download',
  'minimum_size_cm',
  'has_closed_season',
  'closed_start',
  'closed_end',
  'water_type',
  'sort',
] satisfies string[];

export async function getPublicFishRegulations(
  signal?: AbortSignal,
): Promise<FishRegulation[]> {
  const response = await fetchDirectus<DirectusListResponse<FishRegulation>>(
    '/items/fish_regulations',
    {
      query: {
        fields: fishRegulationFields,
        sort: ['sort', 'name'],
        limit: -1,
      },
      signal,
    },
  );

  return response.data;
}
