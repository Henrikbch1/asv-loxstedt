export const boardClasses = {
  list: 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  section: 'col-span-full',
  card: 'flex flex-col gap-1 rounded-lg border border-border bg-white p-4 shadow-sm',
  eyebrow: 'text-xs font-bold uppercase tracking-wider text-brand',
  vacant: 'italic text-muted',
  name: 'font-semibold',
  email: 'text-sm text-brand hover:underline',
} as const;

export default boardClasses;
