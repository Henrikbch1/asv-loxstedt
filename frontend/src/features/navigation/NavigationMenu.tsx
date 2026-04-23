import { useId } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavigationTreeNode } from '../../types/navigation';
import { useNavigationMenuState } from './useNavigationMenuState';

interface NavigationMenuProps {
  items: NavigationTreeNode[];
  depth?: number;
  expanded?: boolean;
  onNavigate?: () => void;
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12">
      <path
        d="M2.25 4.25 6 8l3.75-3.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function NavigationMenu({
  items,
  depth = 0,
  expanded = false,
  onNavigate,
}: NavigationMenuProps) {
  const {
    openKeys,
    desktopOpenKeys,
    toggleMobileKey,
    openDesktopBranch,
    closeDesktopBranch,
  } = useNavigationMenuState();
  const idPrefix = useId();

  if (!items.length) {
    return null;
  }

  const listClassName =
    depth === 0
      ? 'nav-list'
      : expanded
        ? 'nav-list nav-list--sub nav-list--sub-open'
        : 'nav-list nav-list--sub';

  return (
    <ul className={listClassName}>
      {items.map((item) => {
        const hasChildren = item.children.length > 0;
        const isExpanded = openKeys.includes(item.key);
        const isDesktopExpanded = desktopOpenKeys.includes(item.key);
        const submenuId = `${idPrefix}-${item.key}`;

        const content = item.href ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link--active' : 'nav-link'
            }
            onClick={onNavigate}
            to={item.href}
          >
            {item.label}
          </NavLink>
        ) : (
          <span className="nav-link nav-link--muted">{item.label}</span>
        );

        const desktopBranch = item.href ? (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link--desktop nav-link--branch-desktop nav-link--active'
                : 'nav-link nav-link--desktop nav-link--branch-desktop'
            }
            onClick={onNavigate}
            to={item.href}
          >
            <span className="nav-link__label">{item.label}</span>
            <span className="nav-branch-icon" aria-hidden="true">
              <ChevronIcon />
            </span>
          </NavLink>
        ) : (
          <span className="nav-link nav-link--desktop nav-link--branch-desktop nav-link--muted">
            <span className="nav-link__label">{item.label}</span>
            <span className="nav-branch-icon" aria-hidden="true">
              <ChevronIcon />
            </span>
          </span>
        );

        return (
          <li
            className={
              hasChildren
                ? [
                    'nav-item',
                    'nav-item--branch',
                    isExpanded ? 'nav-item--open' : '',
                    isDesktopExpanded ? 'nav-item--desktop-open' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                : 'nav-item'
            }
            key={item.key}
            onBlur={
              hasChildren
                ? (event) => {
                    const nextFocusTarget = event.relatedTarget;

                    if (
                      nextFocusTarget instanceof Node &&
                      event.currentTarget.contains(nextFocusTarget)
                    ) {
                      return;
                    }

                    closeDesktopBranch(item.key);
                  }
                : undefined
            }
            onFocus={
              hasChildren ? () => openDesktopBranch(item.key) : undefined
            }
            onMouseEnter={
              hasChildren ? () => openDesktopBranch(item.key) : undefined
            }
            onMouseLeave={
              hasChildren ? () => closeDesktopBranch(item.key) : undefined
            }
          >
            {hasChildren ? (
              <>
                <div className="nav-item__desktop-only">{desktopBranch}</div>
                <div className="nav-item__mobile-only">
                  {item.href ? (
                    <div className="nav-branch-split">
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? 'nav-link nav-branch-split__link nav-link--active'
                            : 'nav-link nav-branch-split__link'
                        }
                        onClick={onNavigate}
                        to={item.href}
                      >
                        {item.label}
                      </NavLink>
                      <button
                        aria-controls={submenuId}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded
                            ? 'Untermenu schliessen'
                            : 'Untermenu oeffnen'
                        }
                        className={
                          isExpanded
                            ? 'nav-branch-chevron nav-branch-chevron--open'
                            : 'nav-branch-chevron'
                        }
                        onClick={() => {
                          toggleMobileKey(item.key);
                        }}
                        type="button"
                      >
                        <span className="nav-branch-icon" aria-hidden="true">
                          <ChevronIcon />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      aria-controls={submenuId}
                      aria-expanded={isExpanded}
                      className={
                        isExpanded
                          ? 'nav-branch-toggle nav-branch-toggle--open'
                          : 'nav-branch-toggle'
                      }
                      onClick={() => {
                        toggleMobileKey(item.key);
                      }}
                      type="button"
                    >
                      <span className="nav-branch-toggle__label">
                        {item.label}
                      </span>
                      <span className="nav-branch-icon" aria-hidden="true">
                        <ChevronIcon />
                      </span>
                    </button>
                  )}
                </div>
                <NavigationMenu
                  depth={depth + 1}
                  expanded={isExpanded}
                  items={item.children}
                  onNavigate={onNavigate}
                />
              </>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
