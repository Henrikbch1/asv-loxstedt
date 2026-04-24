import { FOOTER_TOKENS } from './footer.tokens';

/*
  Footer style groups

  - Start with one file containing grouped objects for clarity.
  - If a group grows beyond ~15–20 keys, split it into its own file
    (e.g. footer.contact.classes.ts) and re-export here.
  - Keep `footerClasses` for backward compatibility with existing imports.
*/

export const layoutClasses = {
  root: 'relative mt-8 border-t border-[rgba(121,185,39,0.14)] py-0 text-[#f6f7f2] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-brand before:to-accent',
  container: `mx-auto w-[min(${FOOTER_TOKENS.layout.maxWidth},calc(100vw-1.75rem))] pt-16 pb-8`,
  inner:
    'grid grid-cols-1 items-stretch gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:grid-cols-2',
  tail: 'mt-8 flex items-center justify-between gap-4 whitespace-normal break-words pb-6 text-white/70 text-sm',
} as const;

export const brandClasses = {
  title: 'mb-1 inline-block text-2xl font-bold text-white',
  mapWrap: 'w-full overflow-hidden rounded-md min-h-[200px] h-full lg:h-full',
  mapIframe: 'w-full h-full border-0',
} as const;

export const contactClasses = {
  panel:
    'w-full h-full min-h-[200px] rounded-md border border-white/10 bg-white/[0.05] p-5 break-words whitespace-normal text-left text-white/80',
  metaText: 'text-xs font-semibold uppercase tracking-wider text-accent',
  wrapper: 'mt-4 break-words whitespace-normal text-left',
  clubName: 'font-semibold',
  address: 'mt-1 not-italic whitespace-normal leading-tight',
  phone: 'mt-2',
  phoneLink: 'hover:underline',
  mapsLink: 'mt-3 inline-flex items-center gap-3 text-white/90 hover:underline',
  mapIcon: 'h-4 w-4',
  richText:
    'prose prose-invert prose-sm max-w-none whitespace-normal text-white/80',
} as const;

export const legalClasses = {
  nav: '',
  link: 'decoration-transparent decoration-4 underline-offset-2 hover:decoration-white/100 focus:decoration-white/100 hover:underline transition-colors duration-150',
  copyright: 'whitespace-normal break-words',
} as const;

export const footerClasses = {
  layout: layoutClasses,
  brand: brandClasses,
  contact: contactClasses,
  legal: legalClasses,
} as const;
