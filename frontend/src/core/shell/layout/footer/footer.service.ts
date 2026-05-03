import { useGlobalSettingsQuery } from '@/core/settings/useGlobalSettingsQuery';
import { mapGlobalSettingsToFooterData } from './model/footer.mapper';
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
  const query = useGlobalSettingsQuery();

  return {
    data: mapGlobalSettingsToFooterData(query.data),
    isPending: query.isPending,
    isError: query.isError,
  };
}
