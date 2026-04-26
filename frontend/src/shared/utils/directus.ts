import type { DirectusRelation } from '@/shared/types/directus';

/**
 * Gibt das expandierte Objekt zurück, wenn eine Directus-Relation bereits aufgelöst wurde,
 * andernfalls null.
 */
export function expandDirectusRelation<T extends object>(
  relation: DirectusRelation<T>,
): T | null {
  if (relation && typeof relation === 'object') {
    return relation as T;
  }

  return null;
}
