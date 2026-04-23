import { Link } from 'react-router-dom';

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
    <section className="state-card state-card--empty p-8 rounded-lg bg-surface shadow-card text-center flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted">{message}</p>
      {ctaLabel && ctaTo ? (
        <Link
          className="button button--primary inline-flex items-center px-4 py-2 rounded-full mt-2"
          to={ctaTo}
        >
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  );
}
