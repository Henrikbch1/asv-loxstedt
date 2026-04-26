import { useEffect, useRef, useState } from 'react';
import { DESKTOP_CLOSE_DELAY_MS } from '@/core/config/constants';

export interface NavigationMenuState {
  openKeys: string[];
  desktopOpenKeys: string[];
  toggleMobileKey: (key: string) => void;
  openDesktopBranch: (key: string) => void;
  closeDesktopBranch: (key: string) => void;
}

export function useNavigationMenuState(): NavigationMenuState {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [desktopOpenKeys, setDesktopOpenKeys] = useState<string[]>([]);
  const closeTimeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const closeTimeouts = closeTimeoutsRef.current;

    return () => {
      Object.values(closeTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const clearDesktopCloseTimeout = (itemKey: string) => {
    const timeoutId = closeTimeoutsRef.current[itemKey];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete closeTimeoutsRef.current[itemKey];
    }
  };

  const openDesktopBranch = (itemKey: string) => {
    clearDesktopCloseTimeout(itemKey);
    setDesktopOpenKeys((currentKeys) =>
      currentKeys.includes(itemKey) ? currentKeys : [...currentKeys, itemKey],
    );
  };

  const closeDesktopBranch = (itemKey: string) => {
    clearDesktopCloseTimeout(itemKey);
    closeTimeoutsRef.current[itemKey] = window.setTimeout(() => {
      setDesktopOpenKeys((currentKeys) =>
        currentKeys.filter((key) => key !== itemKey),
      );
      delete closeTimeoutsRef.current[itemKey];
    }, DESKTOP_CLOSE_DELAY_MS);
  };

  const toggleMobileKey = (itemKey: string) => {
    setOpenKeys((currentKeys) =>
      currentKeys.includes(itemKey)
        ? currentKeys.filter((key) => key !== itemKey)
        : [...currentKeys, itemKey],
    );
  };

  return {
    openKeys,
    desktopOpenKeys,
    toggleMobileKey,
    openDesktopBranch,
    closeDesktopBranch,
  };
}
