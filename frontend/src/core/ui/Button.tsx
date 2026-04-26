import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';

const styles = {
  base: 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  primary: 'bg-brand text-white hover:bg-brand-strong',
  ghost: 'text-text hover:bg-surface-strong',
} as const;

type Variant = keyof typeof styles & ('primary' | 'ghost');

interface ButtonBaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  to?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  ariaLabel?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  to: string;
  type?: never;
  onClick?: never;
  ariaLabel?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const merged = cn(styles.base, styles[variant], className);

  if (props.as === 'link') {
    return (
      <Link className={merged} to={props.to}>
        {children}
      </Link>
    );
  }

  return (
    <button
      aria-label={props.ariaLabel}
      className={merged}
      onClick={props.onClick}
      type={props.type ?? 'button'}
    >
      {children}
    </button>
  );
}
