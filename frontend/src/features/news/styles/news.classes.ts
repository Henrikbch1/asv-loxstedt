import { NEWS_TOKENS } from './news.tokens';

export const layoutClasses = {
  root: 'space-y-6',
  grid: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
  list: 'space-y-3',
} as const;

export const cardClasses = {
  root: 'rounded-lg border border-border bg-white',
  media: 'overflow-hidden rounded-t-lg',
  body: 'p-4',
  title: 'text-lg font-semibold',
} as const;

export const newsClasses = {
  layout: layoutClasses,
  card: cardClasses,
} as const;

export const newsTokens = NEWS_TOKENS;
