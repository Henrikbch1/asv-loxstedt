import React from 'react';
import type { Link as LinkType } from '../package-spec';

interface Props {
  legalLinks?: LinkType[] | null;
  copyright?: string | null;
  className?: string;
  renderLink?: (link: LinkType) => JSX.Element;
}

export function FooterLegal({
  legalLinks,
  copyright,
  className,
  renderLink,
}: Props) {
  return (
    <div className={className}>
      {copyright ? <p>{copyright}</p> : null}
      {legalLinks && legalLinks.length ? (
        <nav>
          {legalLinks.map((l, i) => (
            <span key={i} style={{ marginRight: 8 }}>
              {renderLink ? renderLink(l) : <a href={l.to}>{l.label}</a>}
            </span>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
