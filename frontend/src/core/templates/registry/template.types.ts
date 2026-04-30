import type { ComponentType } from 'react';
import type { CmsPage } from '@/shared/types/cms';

export interface TemplateProps {
  page: CmsPage;
}

export interface TemplateDefinition {
  key: string;
  component: ComponentType<TemplateProps>;
}
