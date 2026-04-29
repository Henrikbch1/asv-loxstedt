import { useEffect } from 'react';
import { useSiteSettingsQuery } from './useSiteSettingsQuery';

export function useSiteTitle(pageTitle?: string) {
  const settingsQuery = useSiteSettingsQuery();
  const site =
    settingsQuery.data?.clubName ??
    settingsQuery.data?.siteName ??
    'ASV Loxstedt';

  useEffect(() => {
    const title = pageTitle ? `${site} | ${pageTitle}` : site;
    document.title = title;
  }, [site, pageTitle]);
}
