import { Link } from 'react-router-dom';
import { footerClasses } from '../styles/footer.classes';
import { FooterLegal as FooterLegalUI } from '../ui/FooterLegal';
import type { FooterLegalLink } from '../model/footer.types';

interface FooterLegalProps {
  displayName?: string | null;
  legalLinks?: FooterLegalLink[] | null;
}

export function FooterLegal({ displayName, legalLinks }: FooterLegalProps) {
  const currentYear = new Date().getFullYear();

  const defaultLinks: FooterLegalLink[] = [
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/datenschutz' },
  ];

  const linksToRender =
    legalLinks && legalLinks.length ? legalLinks : defaultLinks;

  return (
    <div className={footerClasses.layout.tail}>
      <FooterLegalUI
        legalLinks={linksToRender}
        copyright={`© ${currentYear} - ${displayName ?? ''}`}
        className={footerClasses.legal.nav}
        renderLink={(l) => (
          <Link to={l.to} className={`${footerClasses.legal.link}`}>
            {l.label}
          </Link>
        )}
      />
    </div>
  );
}
