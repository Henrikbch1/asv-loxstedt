import type { FooterData, FooterLegalLink } from '../model/footer.types';
import type { GlobalSettings } from '../../types/domain';
import { footerClasses } from '../styles/footer.classes';
import { FOOTER_TOKENS } from '../styles/footer.tokens';
// FooterBrand removed to hide large club_name/title above the map
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
  legalLinks?: FooterLegalLink[] | null;
}

export function Footer({ settings, data, legalLinks }: FooterProps) {
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
            <FooterMap
              mapsEmbedUrl={mapped?.mapsEmbedUrl}
              addressString={addressString}
            />
          </div>

          <FooterContact
            displayName={mapped?.displayName}
            siteName={settings?.site_name}
            addressLines={mapped?.addressLines}
            phone={mapped?.phone}
            footerNote={mapped?.footerNote}
          />
        </div>

        <FooterLegal
          displayName={settings?.site_name ?? mapped?.displayName}
          legalLinks={legalLinks}
        />
      </div>
    </footer>
  );
}
