/**
 * cms.ts - barrel re-export.
 * All CMS API functions are now implemented in core/cms/api/*.
 * This file keeps existing imports working without change.
 */
export { getGlobalSettings } from './api/siteApi';
export { getNavigation } from './api/navigationApi';
export {
  getPublicPages,
  getPublicPageByPath,
  getPublicNewsList,
  getPublicNewsById,
  getBoardRoles,
} from './api/pageApi';
export { getPublicDownloads } from './api/downloadsApi';
