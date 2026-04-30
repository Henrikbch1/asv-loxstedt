import type { CmsPage } from '@/shared/types/cms';
import { resolveTemplate } from './registry/templateRegistry';

interface TemplateRendererProps {
  page: CmsPage;
}

/**
 * Dispatches a page to the correct template component based on page.template.
 * Falls back to the default template for unknown or missing template keys.
 */
export function TemplateRenderer({ page }: TemplateRendererProps) {
  const { component: Template } = resolveTemplate(page.template);
  return <Template page={page} />;
}
