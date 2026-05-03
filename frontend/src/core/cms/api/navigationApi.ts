import { fetchDirectus } from '../directus';
import type {
  NavigationRecord,
  NavigationRecordRaw,
} from '@/shared/types/navigation';
import type { DirectusListResponse } from '@/shared/types/directus';
import { normalizeNavigationRecord } from '../mappers/navigationMapper';

const pageSummaryFields = ['id', 'title', 'slug', 'navigation_title'];

export async function getNavigation(
  signal?: AbortSignal,
): Promise<NavigationRecord[]> {
  const response = await fetchDirectus<
    DirectusListResponse<NavigationRecordRaw>
  >('/items/navigation', {
    query: {
      fields: [
        'sort',
        'label',
        'parent',
        'parent.label',
        'parent.page.slug',
        'parent.page.title',
        ...pageSummaryFields.map((field) => `page.${field}`),
      ],
      sort: ['sort', 'label'],
    },
    signal,
  });

  return response.data.map(normalizeNavigationRecord);
}
