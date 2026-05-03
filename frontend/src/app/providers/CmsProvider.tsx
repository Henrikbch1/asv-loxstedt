import type { ReactNode } from 'react';

interface CmsProviderProps {
  children: ReactNode;
}

/** Stub – will provide CmsAdapter context once the adapter layer is built (Phase D). */
export function CmsProvider({ children }: CmsProviderProps) {
  return <>{children}</>;
}
