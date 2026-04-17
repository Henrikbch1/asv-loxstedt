import { Link } from "react-router-dom";

interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  homeLink?: boolean;
}

export function ErrorState({
  title = "Inhalte konnten nicht geladen werden",
  message = "Bitte pruefe die CMS-Verbindung und versuche es erneut.",
  retryLabel = "Erneut versuchen",
  onRetry,
  homeLink = true,
}: ErrorStateProps) {
  return (
    <section className="state-card state-card--error" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="state-card__actions">
        {onRetry ? (
          <button
            className="button button--primary"
            type="button"
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        ) : null}
        {homeLink ? (
          <Link className="button button--ghost" to="/">
            Zur Startseite
          </Link>
        ) : null}
      </div>
    </section>
  );
}
