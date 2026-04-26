import { NotFoundState } from '@/core/ui/NotFoundState';
import { useSiteTitle } from '@/core/settings/useSiteTitle';

export function NotFoundPage() {
  useSiteTitle('Seite nicht gefunden');
  return <NotFoundState />;
}
