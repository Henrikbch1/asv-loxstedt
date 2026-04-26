import { Button } from './Button';

const styles = {
  card: 'flex flex-col items-center gap-4 rounded-lg bg-surface p-8 text-center shadow-card',
  title: 'text-2xl font-semibold',
  message: 'text-muted',
} as const;

interface EmptyStateProps {
  title: string;
  message: string;
  ctaLabel?: string;
  ctaTo?: string;
}

export function EmptyState({
  title,
  message,
  ctaLabel,
  ctaTo,
}: EmptyStateProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {ctaLabel && ctaTo ? (
        <Button as="link" to={ctaTo} variant="primary" className="mt-2">
          {ctaLabel}
        </Button>
      ) : null}
    </section>
  );
}
