export const layoutClasses = {
  root: 'relative sticky top-0 z-30 border-b border-border bg-panel-strong backdrop-blur-md',
  inner:
    'mx-auto flex w-[min(1120px,calc(100vw-1.75rem))] items-center justify-between gap-4 py-4',
} as const;

export const brandClasses = {
  root: 'inline-flex items-center gap-3 font-bold text-black',
  logo: 'h-10 w-auto',
  text: 'text-lg leading-tight',
} as const;

export const toggleClasses = {
  button:
    'inline-flex items-center justify-center rounded-md p-2 text-sm font-semibold text-text md:hidden',
  icon: 'h-6 w-6',
} as const;

export const navClasses = {
  base: 'hidden md:flex md:items-center md:gap-1',
  open: 'absolute left-0 right-0 top-full z-40 flex flex-col gap-2 border-b border-border bg-panel-strong p-4 md:static md:inset-auto md:flex-row md:border-0 md:bg-transparent md:p-0',
} as const;

export const headerClasses = {
  layout: layoutClasses,
  brand: brandClasses,
  toggle: toggleClasses,
  nav: navClasses,
} as const;
