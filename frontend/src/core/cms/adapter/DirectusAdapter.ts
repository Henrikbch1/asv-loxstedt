/**
 * DirectusAdapter – implements CmsAdapter using the Directus HTTP API.
 * The actual HTTP transport lives in directus.ts; this module exposes it
 * as an adapter-shaped implementation and re-exports the low-level helpers
 * for the api/ layer.
 */
export { fetchDirectus, CmsApiError } from '../directus';
export type { FetchDirectusOptions } from '../directus';
