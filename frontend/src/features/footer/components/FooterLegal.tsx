import { Link } from 'react-router-dom';
import { footerClasses } from '../styles/footer.classes';
import { FooterLegal as FooterLegalUI } from '../ui/FooterLegal';

interface FooterLegalProps {
  displayName?: string | null;
}

export function FooterLegal({ displayName }: FooterLegalProps) {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/datenschutz' },
  ];

  return (
    <div className={footerClasses.layout.tail}>
      <FooterLegalUI
        legalLinks={legalLinks}
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
