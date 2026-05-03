import type { ReactNode } from 'react';

interface SiteProviderProps {
  children: ReactNode;
}

/** Stub – will provide SiteSettings context once the CMS adapter layer is built (Phase D). */
export function SiteProvider({ children }: SiteProviderProps) {
  return <>{children}</>;
}
