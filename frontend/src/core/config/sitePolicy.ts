import { getRegisteredTemplateKeys } from '@/core/templates/registry/templateRegistry';
import { getRegisteredBlockTypes } from '@/core/content/renderer/blockRegistry';

/**
 * sitePolicy.ts – documents what is freely configurable via CMS
 * and what is fixed in code.
 *
 * This is the authoritative reference for the boundary between
 * CMS freedom and system protection.
 */

// ── CMS-controlled (allow list) ──────────────────────────────────────────────

/** Template keys that the CMS is allowed to assign to a page. */
export const ALLOWED_TEMPLATES = getRegisteredTemplateKeys();

/** Content block types that the CMS is allowed to include in a page. */
export const ALLOWED_BLOCK_TYPES = getRegisteredBlockTypes();

// ── Systemically protected (not CMS-configurable) ────────────────────────────

/**
 * Legal pages (Impressum, Datenschutz) always appear in the footer.
 * This cannot be changed via CMS content.
 */
export const LEGAL_PAGES_ALWAYS_IN_FOOTER = true;

/**
 * Core routing (legal pages, 404, CMS page catch-all) cannot be overridden
 * by CMS navigation entries.
 */
export const CORE_ROUTES_PROTECTED = true;
