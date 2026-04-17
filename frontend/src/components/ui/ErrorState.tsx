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
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      <p className="text-muted">{message}</p>
      <div className="state-card__actions flex gap-3 mt-2">
        {onRetry ? (
          <button
            className="button button--primary inline-flex items-center px-4 py-2 rounded-full"
            type="button"
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        ) : null}
        {homeLink ? (
          <Link
            className="button button--ghost inline-flex items-center px-4 py-2 rounded-full"
            to="/"
          >
            Zur Startseite
          </Link>
        ) : null}
      </div>
    </section>
  );
}
