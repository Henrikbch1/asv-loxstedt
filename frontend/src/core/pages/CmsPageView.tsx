import type { CmsPage } from '@/shared/types/cms';
import { TemplateRenderer } from '@/core/templates/TemplateRenderer';
import { useFeaturesConfig } from '@/core/config/FeaturesContext';
import { BoardPageView } from '@/features/board/BoardPageView';
import { DownloadsPageView } from '@/features/downloads/DownloadsPageView';

interface CmsPageViewProps {
  page: CmsPage;
}

export function CmsPageView({ page }: CmsPageViewProps) {
  const features = useFeaturesConfig();

  if (page.template === 'board') {
    if (!features.board) {
      return <TemplateRenderer page={{ ...page, template: 'default' }} />;
    }
    return <BoardPageView page={page} />;
  }

  if (page.template === 'downloads') {
    if (!features.downloads) {
      return <TemplateRenderer page={{ ...page, template: 'default' }} />;
    }
    return <DownloadsPageView page={page} />;
  }

  return <TemplateRenderer page={page} />;
}
