const styles = {
  card: 'flex flex-col items-start gap-4',
  spinner:
    'h-10 w-10 animate-spin rounded-full border-4 border-surface-strong border-t-brand',
  title: 'text-xl font-semibold',
  message: 'text-muted',
} as const;

interface LoadingStateProps {
  title?: string;
  message?: string;
}

export function LoadingState({
  title = 'Inhalte werden geladen',
  message = 'Bitte einen Moment Geduld.',
}: LoadingStateProps) {
  return (
    <section className={styles.card} aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </section>
  );
}
