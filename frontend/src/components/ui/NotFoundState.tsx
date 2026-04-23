import { Link } from 'react-router-dom';

interface NotFoundStateProps {
  title?: string;
  message?: string;
}

export function NotFoundState({
  title = 'Seite nicht gefunden',
  message = 'Der angeforderte Inhalt ist nicht vorhanden oder nicht veroeffentlicht.',
}: NotFoundStateProps) {
  return (
    <section className="state-card state-card--not-found justify-items-center text-center">
      <span className="eyebrow">404</span>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className="button button--primary" to="/">
        Zur Startseite
      </Link>
    </section>
  );
}
