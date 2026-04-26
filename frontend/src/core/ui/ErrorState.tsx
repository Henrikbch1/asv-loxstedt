import { Button } from './Button';

const styles = {
  card: 'flex flex-col gap-3 rounded-lg border border-danger/20 bg-white p-6',
  title: 'text-xl font-semibold text-black',
  message: 'text-muted',
  actions: 'mt-2 flex gap-3',
} as const;

interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  homeLink?: boolean;
}

export function ErrorState({
  title = 'Inhalte konnten nicht geladen werden',
  message = 'Bitte versuche es in kurzer Zeit erneut.',
  retryLabel = 'Erneut versuchen',
  onRetry,
  homeLink = true,
}: ErrorStateProps) {
  return (
    <section className={styles.card} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        {onRetry ? (
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : null}
        {homeLink ? (
          <Button as="link" to="/" variant="ghost">
            Zur Startseite
          </Button>
        ) : null}
      </div>
    </section>
  );
}
