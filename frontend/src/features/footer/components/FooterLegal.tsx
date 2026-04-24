import { Link } from 'react-router-dom';
import { footerClasses } from '../styles/footer.classes';
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

  const links = legalLinks?.length ? legalLinks : defaultLinks;

  return (
    <div className={footerClasses.layout.tail}>
      <p>{`© ${currentYear} - ${displayName ?? ''}`}</p>
      <nav aria-label="Rechtliche Informationen">
        <ul className="flex list-none gap-2 items-center m-0 p-0">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.to} className={footerClasses.legal.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
