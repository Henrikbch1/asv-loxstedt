import type { FooterData } from '../model/footer.types';
import type { GlobalSettings } from '../../types/domain';
import { footerClasses } from '../styles/footer.classes';
import { FOOTER_TOKENS } from '../styles/footer.tokens';
import { FooterBrand } from './FooterBrand';
import { FooterMap } from './FooterMap';
import { FooterContact } from './FooterContact';
import { FooterLegal } from './FooterLegal';
import { mapGlobalSettingsToFooterData } from '../model/footer.mapper';

const footerBackground = {
  background: FOOTER_TOKENS.gradients.background,
} as const;

interface FooterProps {
  settings?: GlobalSettings | null;
  data?: FooterData | null;
}

export function Footer({ settings, data }: FooterProps) {
  const mapped = data ?? mapGlobalSettingsToFooterData(settings);

  const addressString =
    mapped?.addressLines && mapped.addressLines.length
      ? mapped.addressLines.filter(Boolean).join(' ')
      : undefined;

  return (
    <footer className={footerClasses.layout.root} style={footerBackground}>
      <div className={footerClasses.layout.container}>
        <div className={footerClasses.layout.inner}>
          <div className="grid gap-4 text-left">
            <FooterBrand displayName={mapped?.displayName} />
            <FooterMap
              mapsEmbedUrl={mapped?.mapsEmbedUrl}
              addressString={addressString}
            />
          </div>

          <FooterContact
            displayName={mapped?.displayName}
            addressLines={mapped?.addressLines}
            phone={mapped?.phone}
            footerNote={mapped?.footerNote}
          />
        </div>

        <FooterLegal displayName={mapped?.displayName} />
      </div>
    </footer>
  );
}
