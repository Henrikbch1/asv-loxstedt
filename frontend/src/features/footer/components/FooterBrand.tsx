import { footerClasses } from '../styles/footer.classes';

interface FooterBrandProps {
  displayName?: string | null;
}

export function FooterBrand({ displayName }: FooterBrandProps) {
  return <span className={footerClasses.brand.title}>{displayName ?? ''}</span>;
}
