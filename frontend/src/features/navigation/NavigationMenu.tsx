import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import type { NavigationTreeNode } from "../../types/cms";

interface NavigationMenuProps {
  items: NavigationTreeNode[];
  depth?: number;
  onNavigate?: () => void;
}

export function NavigationMenu({
  items,
  depth = 0,
  onNavigate,
}: NavigationMenuProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={depth === 0 ? "nav-list" : "nav-list nav-list--sub"}>
      {items.map((item) => {
        const content = item.href ? (
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
            onClick={onNavigate}
            to={item.href}
          >
            {item.label}
          </NavLink>
        ) : (
          <span className="nav-link nav-link--muted">{item.label}</span>
        );

        return (
          <li
            className={
              item.children.length ? "nav-item nav-item--branch" : "nav-item"
            }
            key={item.key}
          >
            {content}
            {item.children.length ? (
              <Fragment>
                <span className="nav-branch-indicator" aria-hidden="true">
                  +
                </span>
                <NavigationMenu
                  depth={depth + 1}
                  items={item.children}
                  onNavigate={onNavigate}
                />
              </Fragment>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
