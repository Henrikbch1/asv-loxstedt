import { useState } from "react";
import { Link } from "react-router-dom";
import type { GlobalSettings, NavigationTreeNode } from "../../types/cms";
import { getCmsAssetLabel, getCmsAssetUrl } from "../../utils/assets";
import { NavigationMenu } from "../../features/navigation/NavigationMenu";

interface HeaderProps {
  settings: GlobalSettings;
  navigationItems: NavigationTreeNode[];
}

export function Header({ settings, navigationItems }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logoUrl = getCmsAssetUrl(settings.logo, { width: 160 });

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="brand" onClick={() => setIsOpen(false)} to="/">
          {logoUrl ? (
            <img
              alt={getCmsAssetLabel(settings.logo)}
              className="brand__logo"
              src={logoUrl}
            />
          ) : null}
          <span className="brand__text">{settings.site_name}</span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          className="nav-toggle"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          Menue
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
          />
        </nav>
      </div>
    </header>
  );
}
