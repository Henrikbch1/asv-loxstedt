import { cn } from '../../lib/cn';

const styles = {
  hero: 'relative mb-8 overflow-hidden rounded-[calc(22px+4px)] border border-border bg-gradient-to-br from-white/80 to-surface/95 p-9 shadow-soft md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:gap-8',
  copy: 'relative z-10 flex flex-col gap-1',
  eyebrow:
    'mb-1 block text-xs font-bold uppercase tracking-wider text-brand-strong',
  title:
    'text-[clamp(2.15rem,4.8vw,4.25rem)] font-bold leading-none tracking-tight text-black',
  meta: 'mt-1 text-sm text-muted',
  media: 'relative z-10 min-h-64 overflow-hidden rounded-lg',
  image: 'h-full w-full object-cover',
} as const;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  meta?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  meta,
  imageUrl,
  imageAlt,
  className,
}: PageHeroProps) {
  return (
    <header className={cn(styles.hero, className)}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {meta ? <p className={styles.meta}>{meta}</p> : null}
      </div>
      {imageUrl ? (
        <div className={styles.media}>
          <img alt={imageAlt ?? ''} className={styles.image} src={imageUrl} />
        </div>
      ) : null}
    </header>
  );
}
