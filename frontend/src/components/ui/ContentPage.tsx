import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

const styles = {
  article: 'grid gap-8',
  body: 'prose prose-lg max-w-none prose-p:text-muted prose-p:leading-relaxed prose-headings:text-black prose-a:text-brand-strong prose-a:underline prose-img:rounded-md',
} as const;

interface ContentPageProps {
  children: ReactNode;
  className?: string;
}

export function ContentPage({ children, className }: ContentPageProps) {
  return (
    <article className={cn(styles.article, className)}>{children}</article>
  );
}

ContentPage.bodyClass = styles.body;
