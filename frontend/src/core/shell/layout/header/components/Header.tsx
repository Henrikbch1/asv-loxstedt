import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { GlobalSettings, NavigationTreeNode } from '@/shared/types/cms';
import { getCmsAssetLabel, getCmsAssetUrl } from '@/shared/utils/assets';
import { NavigationMenu } from '@/core/shell/navigation/NavigationMenu';
import { cn } from '@/shared/lib/cn';
import { headerClasses } from '../styles/header.classes';
import { featureConfig } from '@/core/config/feature-config';
import { routes } from '@/core/shell/routing/staticRoutes';

export interface HeaderProps {
  settings?: GlobalSettings | null;
  navigationItems: NavigationTreeNode[];
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Header({ settings, navigationItems }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logo = settings?.logo ?? null;
  const logoUrl = getCmsAssetUrl(logo, { width: 160 });

  return (
    <header className={headerClasses.layout.root}>
      <div className={headerClasses.layout.inner}>
        <Link
          className={headerClasses.brand.root}
          onClick={() => setIsOpen(false)}
          to="/"
        >
          {logoUrl ? (
            <img
              alt={getCmsAssetLabel(logo)}
              className={headerClasses.brand.logo}
              src={logoUrl}
            />
          ) : null}
          <span className={headerClasses.brand.text}>
            {settings?.site_name ?? ''}
          </span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Navigation schliessen' : 'Navigation oeffnen'}
          className={headerClasses.toggle.button}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span className={headerClasses.toggle.icon} aria-hidden="true">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>

        <nav
          className={cn(
            headerClasses.nav.base,
            isOpen && headerClasses.nav.open,
          )}
          id="site-navigation"
        >
          <NavigationMenu
            items={navigationItems}
            onNavigate={() => setIsOpen(false)}
            key={isOpen ? 'navigation-open' : 'navigation-closed'}
          />
          {featureConfig.downloads.enabled ? (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'ml-2 inline-flex items-center gap-1.5 rounded-md border border-brand px-3 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white',
                  isActive && 'bg-brand text-white',
                )
              }
              onClick={() => setIsOpen(false)}
              to={routes.downloads}
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Downloads
            </NavLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
