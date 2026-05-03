import { fetchDirectus } from '../directus';
import type { DownloadItem } from '@/shared/types/domain';
import type { DirectusListResponse } from '@/shared/types/directus';

const downloadFields = [
  'id',
  'title',
  'description',
  'file',
  'category.name',
] satisfies string[];

export async function getPublicDownloads(
  signal?: AbortSignal,
): Promise<DownloadItem[]> {
  const response = await fetchDirectus<DirectusListResponse<DownloadItem>>(
    '/items/downloads',
    {
      query: {
        fields: downloadFields,
        sort: ['category.name', 'sort', 'title'],
        limit: -1,
      },
      signal,
    },
  );
  return response.data;
}
