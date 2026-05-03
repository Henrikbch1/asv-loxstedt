import { createContext, useContext, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeatures } from '@/core/cms/api/featuresApi';
import { queryKeys } from '@/core/cms/queryKeys';

export interface FeatureFlags {
  news: boolean;
  calendar: boolean;
  board: boolean;
  downloads: boolean;
}

const defaultFlags: FeatureFlags = {
  news: false,
  calendar: false,
  board: false,
  downloads: false,
};

const FeaturesContext = createContext<FeatureFlags>(defaultFlags);

export function FeaturesProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery({
    queryKey: queryKeys.features,
    queryFn: ({ signal }) => getFeatures(signal),
  });

  const flags: FeatureFlags = { ...defaultFlags };
  for (const item of data ?? []) {
    if (item.key in flags) {
      const key = item.key as keyof FeatureFlags;
      flags[key] = Boolean(item.enabled);
    }
  }

  return (
    <FeaturesContext.Provider value={flags}>
      {children}
    </FeaturesContext.Provider>
  );
}

export function useFeaturesConfig(): FeatureFlags {
  return useContext(FeaturesContext);
}
