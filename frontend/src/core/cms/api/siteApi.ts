import { fetchDirectus } from '../directus';
import type { GlobalSettings } from '@/shared/types/domain';
import type { DirectusSingletonResponse } from '@/shared/types/directus';

export async function getGlobalSettings(
  signal?: AbortSignal,
): Promise<GlobalSettings> {
  const response = await fetchDirectus<
    DirectusSingletonResponse<GlobalSettings>
  >('/items/global_settings', {
    query: {
      fields: [
        'id',
        'site_name',
        'logo',
        'club_name',
        'footer_note',
        'street',
        'postal_code',
        'city',
        'phone',
        'imprint',
        'data_protection',
      ],
    },
    signal,
  });

  return response.data;
}
