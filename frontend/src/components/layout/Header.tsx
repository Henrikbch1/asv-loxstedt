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
      <div className="shell site-header__inner flex items-center justify-between gap-4 py-4">
        <Link
          className="brand inline-flex items-center gap-3 font-bold text-black"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          {logoUrl ? (
            <img
              alt={getCmsAssetLabel(settings.logo)}
              className="brand__logo"
              src={logoUrl}
            />
          ) : null}
          <span className="brand__text tracking-[0.18em]">
            {settings.site_name}
          </span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          className="nav-toggle inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-text md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span
            className="inline-flex h-2.5 w-2.5 rounded-full bg-green"
            aria-hidden="true"
          />
          <span>{isOpen ? "Schliessen" : "Menue"}</span>
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
