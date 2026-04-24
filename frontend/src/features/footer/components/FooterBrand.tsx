import { footerClasses } from '../styles/footer.classes';

interface FooterBrandProps {
  displayName?: string | null;
}

export function FooterBrand({ displayName }: FooterBrandProps) {
  return <h3 className={footerClasses.brand.title}>{displayName ?? ''}</h3>;
}
