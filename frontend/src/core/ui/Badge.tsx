import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

const styles = {
  badge:
    'inline-block rounded-full bg-surface-strong px-3 py-0.5 text-xs font-semibold text-green-dark',
} as const;

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return <span className={cn(styles.badge, className)}>{children}</span>;
}
