import { FOOTER_TOKENS } from './footer.tokens';

export const footerClasses = {
  layout: {
    root: 'relative mt-8 border-t border-[rgba(121,185,39,0.14)] py-0 text-[#f6f7f2] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-brand before:to-accent',
    container: `mx-auto w-[min(${FOOTER_TOKENS.layout.maxWidth},calc(100vw-1.75rem))] pt-16 pb-8`,
    inner:
      'grid grid-cols-1 items-start gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:grid-cols-2',
    tail: 'mt-8 flex items-center justify-between gap-4 whitespace-normal break-words pb-6 text-white/70 text-sm',
  },
  brand: {
    title: 'mb-1 inline-block text-2xl font-bold text-white',
    mapWrap: 'mt-3 max-w-[600px] overflow-hidden rounded-md',
    mapIframe: 'w-full border-0',
  },
  contact: {
    panel:
      'rounded-md border border-white/10 bg-white/[0.05] p-5 break-words whitespace-normal text-left text-white/80',
    metaText: 'text-xs font-semibold uppercase tracking-wider text-accent',
    wrapper: 'mt-4 break-words whitespace-normal text-left',
    clubName: 'font-semibold',
    address: 'mt-1 not-italic whitespace-normal leading-tight',
    phone: 'mt-2',
    phoneLink: 'hover:underline',
    mapsLink:
      'mt-3 inline-flex items-center gap-3 text-white/90 hover:underline',
    mapIcon: 'h-4 w-4',
    richText:
      'prose prose-invert prose-sm max-w-none whitespace-normal text-white/80',
  },
  legal: {
    nav: '',
    link: 'decoration-transparent decoration-4 underline-offset-2 hover:decoration-white/100 focus:decoration-white/100 hover:underline transition-colors duration-150',
    copyright: 'whitespace-normal break-words',
  },
} as const;
