import { Link } from 'react-router-dom';
import { footerClasses } from '../styles/footer.classes';

interface FooterLegalProps {
  displayName?: string | null;
}

export function FooterLegal({ displayName }: FooterLegalProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className={footerClasses.layout.tail}>
      <p className={footerClasses.legal.copyright}>
        © {currentYear} - {displayName ?? ''}
      </p>
      <nav className={footerClasses.legal.nav}>
        <Link to="/impressum" className={`${footerClasses.legal.link} mr-3`}>
          Impressum
        </Link>
        <Link to="/datenschutz" className={footerClasses.legal.link}>
          Datenschutz
        </Link>
      </nav>
    </div>
  );
}
