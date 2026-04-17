import { Link } from "react-router-dom";

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
    <section className="state-card state-card--empty">
      <h2>{title}</h2>
      <p>{message}</p>
      {ctaLabel && ctaTo ? (
        <Link className="button button--primary" to={ctaTo}>
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  );
}
