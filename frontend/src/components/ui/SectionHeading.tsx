import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

const styles = {
  wrapper: 'mb-6 grid gap-3',
  eyebrow:
    'mb-1 block text-xs font-bold uppercase tracking-wider text-brand-strong',
  title:
    'text-[clamp(2.15rem,4.8vw,4.25rem)] font-bold leading-none tracking-tight text-black',
  description: 'mt-2 max-w-[65ch] text-muted leading-relaxed',
} as const;

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
