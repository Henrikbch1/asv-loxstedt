import DOMPurify from "dompurify";

interface RichTextProps {
  html: string | null | undefined;
  className?: string;
}

export function RichText({ html, className }: RichTextProps) {
  if (!html) {
    return null;
  }

  // CMS HTML is rendered only through this component so XSS hardening stays centralized.
  const sanitizedHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
