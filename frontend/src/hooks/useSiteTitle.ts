import { useEffect } from "react";
import { useGlobalSettingsQuery } from "./useGlobalSettingsQuery";

export function useSiteTitle(pageTitle?: string) {
  const settingsQuery = useGlobalSettingsQuery();
  const site =
    settingsQuery.data?.club_name ??
    settingsQuery.data?.site_name ??
    "ASV Loxstedt";

  useEffect(() => {
    const title = pageTitle ? `${site} | ${pageTitle}` : site;
    document.title = title;
  }, [site, pageTitle]);
}
