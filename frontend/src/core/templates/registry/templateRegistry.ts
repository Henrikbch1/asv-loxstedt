import type { TemplateDefinition } from './template.types';
import { DefaultTemplate } from '../components/DefaultTemplate';
import { LandingTemplate } from '../components/LandingTemplate';
import { SidebarTemplate } from '../components/SidebarTemplate';
import { NarrowContentTemplate } from '../components/NarrowContentTemplate';

/**
 * Whitelist of allowed templates.
 * Only keys registered here can be selected in the CMS.
 * The CMS may not inject arbitrary template keys.
 */
const registry: Record<string, TemplateDefinition> = {
  default: { key: 'default', component: DefaultTemplate },
  landing: { key: 'landing', component: LandingTemplate },
  sidebar: { key: 'sidebar', component: SidebarTemplate },
  'narrow-content': { key: 'narrow-content', component: NarrowContentTemplate },
};

export const FALLBACK_TEMPLATE_KEY = 'default';

export function resolveTemplate(key?: string | null): TemplateDefinition {
  if (key && key in registry) {
    return registry[key]!;
  }
  return registry[FALLBACK_TEMPLATE_KEY]!;
}

export function getRegisteredTemplateKeys(): string[] {
  return Object.keys(registry);
}
