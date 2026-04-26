import { Link } from 'react-router-dom';
import { routes } from '@/core/config/routes';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  to = routes.newsList,
  label = 'Zurück zur Liste',
  className = '',
}: BackButtonProps) {
  const classes =
    'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold bg-brand text-white hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ' +
    className;

  return (
    <Link to={to} aria-label={label} className={classes}>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {label}
    </Link>
  );
}

export default BackButton;
