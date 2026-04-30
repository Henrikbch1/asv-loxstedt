import type { CmsPage } from '@/shared/types/cms';
import { TemplateRenderer } from '@/core/templates/TemplateRenderer';
import { featureConfig } from '@/core/config/feature-config';
import { BoardPageView } from '@/features/board/BoardPageView';

interface CmsPageViewProps {
  page: CmsPage;
}

export function CmsPageView({ page }: CmsPageViewProps) {
  if (page.template === 'board') {
    if (!featureConfig.board.enabled) {
      return <TemplateRenderer page={{ ...page, template: 'default' }} />;
    }
    return <BoardPageView page={page} />;
  }

  return <TemplateRenderer page={page} />;
}
