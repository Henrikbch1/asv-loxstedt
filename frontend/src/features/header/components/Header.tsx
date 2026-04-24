import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { GlobalSettings, NavigationTreeNode } from '../../../types/cms';
import { getCmsAssetLabel, getCmsAssetUrl } from '../../../utils/assets';
import { NavigationMenu } from '../../navigation/NavigationMenu';
import { cn } from '../../../lib/cn';
import { headerClasses } from '../styles/header.classes';

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
        </nav>
      </div>
    </header>
  );
}
