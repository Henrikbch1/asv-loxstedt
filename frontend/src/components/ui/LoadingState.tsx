interface LoadingStateProps {
  title?: string;
  message?: string;
}

export function LoadingState({
  title = "Inhalte werden geladen",
  message = "Die Daten aus dem CMS werden gerade abgefragt.",
}: LoadingStateProps) {
  return (
    <section className="state-card" aria-live="polite">
      <div className="state-card__spinner" aria-hidden="true" />
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}
