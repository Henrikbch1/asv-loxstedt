import { DownloadsPageView } from '../DownloadsPageView';
import { usePublicPageByPathQuery } from '@/core/pages/useCmsPageQueries';

/**
 * Standalone route for /downloads.
 * Tries to load the CMS page with slug "downloads" for hero/content;
 * renders the downloads list regardless of whether the page exists.
 */
export function DownloadsPage() {
  const pageQuery = usePublicPageByPathQuery('downloads');

  // Pass page if loaded, otherwise render without CMS page (no hero image/intro)
  return <DownloadsPageView page={pageQuery.data ?? null} />;
}
