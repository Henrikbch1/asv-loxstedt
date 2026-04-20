import { useState } from "react";
import { Link } from "react-router-dom";
import type { GlobalSettings, NavigationTreeNode } from "../../types/cms";
import { getCmsAssetLabel, getCmsAssetUrl } from "../../utils/assets";
import { NavigationMenu } from "../../features/navigation/NavigationMenu";

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
  const logoUrl = getCmsAssetUrl(settings?.logo as any, { width: 160 });

  return (
    <header className="site-header">
      <div className="shell site-header__inner flex items-center justify-between gap-4 py-4">
        <Link
          className="brand inline-flex items-center gap-3 font-bold text-black"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          {logoUrl ? (
            <img
              alt={getCmsAssetLabel(settings?.logo as any)}
              className="brand__logo"
              src={logoUrl}
            />
          ) : null}
          <span className="brand__text">{settings?.site_name ?? ""}</span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Navigation schliessen" : "Navigation oeffnen"}
          className="nav-toggle inline-flex items-center justify-center text-sm font-semibold text-text"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span className="nav-toggle__icon" aria-hidden="true">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>

        <nav
          className={
            isOpen ? "site-navigation site-navigation--open" : "site-navigation"
          }
          id="site-navigation"
        >
          <NavigationMenu
            items={navigationItems}
            onNavigate={() => setIsOpen(false)}
            key={isOpen ? "navigation-open" : "navigation-closed"}
          />
        </nav>
      </div>
    </header>
  );
}
