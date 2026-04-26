import { appConfig } from '@/core/config/env';
import type { ICmsClient } from './ICmsClient';
import { DirectusCmsClient } from './DirectusCmsClient';
import { StaticFileCmsClient } from './StaticFileCmsClient';

export type { ICmsClient };

function createCmsClient(): ICmsClient {
  if (appConfig.cmsMode === 'static') {
    return new StaticFileCmsClient();
  }
  return new DirectusCmsClient();
}

/** Singleton CMS client – resolved once at module load based on VITE_CMS_MODE. */
export const cmsClient: ICmsClient = createCmsClient();
