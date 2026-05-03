import type { DownloadItem } from '@/shared/types/domain';
import type { Category } from '@/shared/types/domain';
import { getCmsAssetUrl } from '@/shared/utils/assets';
import { expandDirectusRelation } from '@/shared/utils/directus';

const styles = {
  item: 'flex items-start gap-4 rounded-lg border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-card',
  icon: 'mt-0.5 flex-shrink-0 text-brand',
  body: 'min-w-0 flex-1',
  title: 'font-semibold leading-snug text-black',
  description: 'mt-1 text-sm text-muted line-clamp-2',
  actions: 'mt-2 flex items-center gap-3',
  actionBtn:
    'inline-flex items-center gap-1 text-sm font-medium text-brand-strong hover:underline',
} as const;

interface DownloadListItemProps {
  item: DownloadItem;
}

export function DownloadListItem({ item }: DownloadListItemProps) {
  const fileUrl = getCmsAssetUrl(item.file);
  const category = expandDirectusRelation<Category>(item.category);

  return (
    <li className={styles.item}>
      <div className={styles.icon} aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="12" x2="12" y2="18" />
          <polyline points="9 15 12 18 15 15" />
        </svg>
      </div>
      <div className={styles.body}>
        {category ? (
          <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand">
            {category.name}
          </span>
        ) : null}
        <p className={styles.title}>{item.title}</p>
        {item.description ? (
          <p className={styles.description}>{item.description}</p>
        ) : null}
        {fileUrl ? (
          <div className={styles.actions}>
            <a
              className={styles.actionBtn}
              href={fileUrl}
              rel="noopener noreferrer"
              target="_blank"
              title="Vorschau öffnen"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Vorschau
            </a>
            <span className="text-border" aria-hidden="true">
              |
            </span>
            <a
              className={styles.actionBtn}
              download
              href={fileUrl}
              rel="noopener noreferrer"
              target="_blank"
              title="Datei herunterladen"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Herunterladen
            </a>
          </div>
        ) : null}
      </div>
    </li>
  );
}
