import type { FooterData } from './model/footer.types';
import { footerClasses } from './styles/footer.classes';
import { FOOTER_TOKENS } from './styles/footer.tokens';
import { FooterBrand } from './FooterBrand';
import { FooterMap } from './FooterMap';
import { FooterContact } from './FooterContact';
import { FooterLegal } from './FooterLegal';

const footerBackground = {
  background: FOOTER_TOKENS.gradients.background,
} as const;

interface FooterProps {
  data?: FooterData | null;
}

export function Footer({ data }: FooterProps) {
  const addressString =
    data?.addressLines && data.addressLines.length
      ? data.addressLines.filter(Boolean).join(' ')
      : undefined;

  return (
    <footer className={footerClasses.layout.root} style={footerBackground}>
      <div className={footerClasses.layout.container}>
        <div className={footerClasses.layout.inner}>
          <div className="grid gap-4 text-left">
            <FooterBrand displayName={data?.displayName} />
            <FooterMap
              mapsEmbedUrl={data?.mapsEmbedUrl}
              addressString={addressString}
            />
          </div>

          <FooterContact
            displayName={data?.displayName}
            addressLines={data?.addressLines}
            phone={data?.phone}
            footerNote={data?.footerNote}
          />
        </div>

        <FooterLegal displayName={data?.displayName} />
      </div>
    </footer>
  );
}
