import { Button } from './Button';

const styles = {
  card: 'flex flex-col items-center justify-center gap-3 text-center',
  eyebrow: 'text-xs font-bold uppercase tracking-wider text-brand',
  message: 'text-muted',
} as const;

interface NotFoundStateProps {
  title?: string;
  message?: string;
}

export function NotFoundState({
  title = 'Seite nicht gefunden',
  message = 'Der angeforderte Inhalt ist nicht vorhanden oder nicht veroeffentlicht.',
}: NotFoundStateProps) {
  return (
    <section className={styles.card}>
      <span className={styles.eyebrow}>404</span>
      <h1>{title}</h1>
      <p className={styles.message}>{message}</p>
      <Button as="link" to="/" variant="primary">
        Zur Startseite
      </Button>
    </section>
  );
}
