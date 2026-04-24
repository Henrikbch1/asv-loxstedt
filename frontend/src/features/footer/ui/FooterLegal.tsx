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
        <nav aria-label="Rechtliche Informationen">
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            {legalLinks.map((l, i) => (
              <li key={i}>
                {renderLink ? renderLink(l) : <a href={l.to}>{l.label}</a>}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
