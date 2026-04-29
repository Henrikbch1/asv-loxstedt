import { useSiteSettingsQuery } from '@/core/settings/useSiteSettingsQuery';
import { mapSiteSettingsToFooterData } from './model/footer.mapper';
import type { FooterData } from './model/footer.types';

export interface UseFooterDataResult {
  data: FooterData | null;
  isPending: boolean;
  isError: boolean;
}

/**
 * Fetches global settings and maps them to the FooterData shape.
 *
 * Keeps footer data preparation out of layout components.
 */
export function useFooterData(): UseFooterDataResult {
  const query = useSiteSettingsQuery();

  return {
    data: mapSiteSettingsToFooterData(query.data),
    isPending: query.isPending,
    isError: query.isError,
  };
}
