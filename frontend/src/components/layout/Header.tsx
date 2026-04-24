import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { GlobalSettings, NavigationTreeNode } from '../../types/cms';
import { getCmsAssetLabel, getCmsAssetUrl } from '../../utils/assets';
import { NavigationMenu } from '../../features/navigation/NavigationMenu';
import { cn } from '../../lib/cn';

const styles = {
  header:
    'relative sticky top-0 z-30 border-b border-border bg-panel-strong backdrop-blur-md',
  inner:
    'mx-auto flex w-[min(1120px,calc(100vw-1.75rem))] items-center justify-between gap-4 py-4',
  brand: 'inline-flex items-center gap-3 font-bold text-black',
  brandLogo: 'h-10 w-auto',
  brandText: 'text-lg leading-tight',
  navToggle:
    'inline-flex items-center justify-center rounded-md p-2 text-sm font-semibold text-text md:hidden',
  navToggleIcon: 'h-6 w-6',
  nav: 'hidden md:flex md:items-center md:gap-1',
  navOpen:
    'absolute left-0 right-0 top-full z-40 flex flex-col gap-2 border-b border-border bg-panel-strong p-4 md:static md:inset-auto md:flex-row md:border-0 md:bg-transparent md:p-0',
} as const;

interface HeaderProps {
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
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} onClick={() => setIsOpen(false)} to="/">
          {logoUrl ? (
            <img
              alt={getCmsAssetLabel(logo)}
              className={styles.brandLogo}
              src={logoUrl}
            />
          ) : null}
          <span className={styles.brandText}>{settings?.site_name ?? ''}</span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Navigation schliessen' : 'Navigation oeffnen'}
          className={styles.navToggle}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span className={styles.navToggleIcon} aria-hidden="true">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>

        <nav
          className={cn(styles.nav, isOpen && styles.navOpen)}
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
