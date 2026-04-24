import { useId } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavigationTreeNode } from '../../types/navigation';
import { useNavigationMenuState } from './useNavigationMenuState';
import { cn } from '../../lib/cn';

const styles = {
  list: 'flex flex-col gap-1 md:flex-row md:items-center md:gap-0.5',
  listSub:
    'hidden flex-col gap-0.5 pl-4 md:absolute md:left-0 md:top-full md:z-50 md:min-w-[200px] md:rounded-md md:border md:border-border md:bg-panel-strong md:p-2 md:pl-0 md:shadow-soft',
  listSubOpen: 'flex',
  listSubDesktopOpen: 'md:flex',
  item: 'relative',
  itemBranch: 'relative',
  itemOpen: '',
  itemDesktopOpen: '',
  link: 'block rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-strong hover:text-black',
  linkActive: 'bg-surface-strong text-black font-semibold',
  linkDesktop:
    'hidden items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-strong hover:text-black md:inline-flex',
  linkMuted: 'cursor-default text-muted',
  linkLabel: '',
  branchIcon: 'h-3 w-3 transition-transform',
  branchIconOpen: 'rotate-180',
  branchSplit: 'flex items-center gap-0',
  branchSplitLink: 'flex-1',
  branchChevron:
    'flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:bg-surface-strong',
  branchChevronOpen: 'text-black',
  branchToggle:
    'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-text transition-colors hover:bg-surface-strong',
  branchToggleOpen: 'bg-surface-strong text-black',
  branchToggleLabel: '',
  desktopOnly: 'hidden md:block',
  mobileOnly: 'md:hidden',
} as const;

interface NavigationMenuProps {
  items: NavigationTreeNode[];
  depth?: number;
  expanded?: boolean;
  desktopExpanded?: boolean;
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
  desktopExpanded = false,
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
      ? styles.list
      : cn(
          styles.listSub,
          expanded && styles.listSubOpen,
          desktopExpanded && styles.listSubDesktopOpen,
        );

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
              cn(styles.link, isActive && styles.linkActive)
            }
            onClick={onNavigate}
            to={item.href}
          >
            {item.label}
          </NavLink>
        ) : (
          <span className={cn(styles.link, styles.linkMuted)}>
            {item.label}
          </span>
        );

        const desktopBranch = item.href ? (
          <NavLink
            className={({ isActive }) =>
              cn(styles.linkDesktop, isActive && styles.linkActive)
            }
            onClick={onNavigate}
            to={item.href}
          >
            <span className={styles.linkLabel}>{item.label}</span>
            <span className={styles.branchIcon} aria-hidden="true">
              <ChevronIcon />
            </span>
          </NavLink>
        ) : (
          <span className={cn(styles.linkDesktop, styles.linkMuted)}>
            <span className={styles.linkLabel}>{item.label}</span>
            <span className={styles.branchIcon} aria-hidden="true">
              <ChevronIcon />
            </span>
          </span>
        );

        return (
          <li
            className={cn(
              styles.item,
              hasChildren && styles.itemBranch,
              hasChildren && isExpanded && styles.itemOpen,
              hasChildren && isDesktopExpanded && styles.itemDesktopOpen,
            )}
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
                <div className={styles.desktopOnly}>{desktopBranch}</div>
                <div className={styles.mobileOnly}>
                  {item.href ? (
                    <div className={styles.branchSplit}>
                      <NavLink
                        className={({ isActive }) =>
                          cn(
                            styles.link,
                            styles.branchSplitLink,
                            isActive && styles.linkActive,
                          )
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
                        className={cn(
                          styles.branchChevron,
                          isExpanded && styles.branchChevronOpen,
                        )}
                        onClick={() => {
                          toggleMobileKey(item.key);
                        }}
                        type="button"
                      >
                        <span
                          className={cn(
                            styles.branchIcon,
                            isExpanded && styles.branchIconOpen,
                          )}
                          aria-hidden="true"
                        >
                          <ChevronIcon />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      aria-controls={submenuId}
                      aria-expanded={isExpanded}
                      className={cn(
                        styles.branchToggle,
                        isExpanded && styles.branchToggleOpen,
                      )}
                      onClick={() => {
                        toggleMobileKey(item.key);
                      }}
                      type="button"
                    >
                      <span className={styles.branchToggleLabel}>
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          styles.branchIcon,
                          isExpanded && styles.branchIconOpen,
                        )}
                        aria-hidden="true"
                      >
                        <ChevronIcon />
                      </span>
                    </button>
                  )}
                </div>
                <NavigationMenu
                  depth={depth + 1}
                  expanded={isExpanded}
                  desktopExpanded={isDesktopExpanded}
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
