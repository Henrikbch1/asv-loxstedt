interface LoadingStateProps {
  title?: string;
  message?: string;
}

export function LoadingState({
  title = 'Inhalte werden geladen',
  message = 'Bitte einen Moment Geduld.',
}: LoadingStateProps) {
  return (
    <section
      className="state-card flex flex-col items-start gap-4"
      aria-live="polite"
    >
      <div className="state-card__spinner w-10 h-10" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted">{message}</p>
    </section>
  );
}
