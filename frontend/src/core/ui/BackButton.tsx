import React from 'react';
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      // Try SPA navigation if available
      window.history.pushState({}, '', to);
      // Dispatch popstate so routers can react if present
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch {
      // Fallback to full navigation
      window.location.href = to;
    }
  };

  return (
    <a href={to} aria-label={label} className={classes} onClick={handleClick}>
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
    </a>
  );
}

export default BackButton;
