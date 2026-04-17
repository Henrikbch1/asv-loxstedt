import { Link } from "react-router-dom";

interface NotFoundStateProps {
  title?: string;
  message?: string;
}

export function NotFoundState({
  title = "Seite nicht gefunden",
  message = "Der angeforderte Inhalt ist nicht vorhanden oder nicht veroeffentlicht.",
}: NotFoundStateProps) {
  return (
    <section className="state-card state-card--not-found justify-items-center text-center">
      <span className="eyebrow text-4xl font-bold block">404</span>
      <h1 className="m-0 text-3xl font-extrabold">{title}</h1>
      <p className="my-0 text-muted">{message}</p>
      <Link
        className="button button--primary inline-flex items-center px-4 py-2 rounded-full"
        to="/"
      >
        Zur Startseite
      </Link>
    </section>
  );
}
