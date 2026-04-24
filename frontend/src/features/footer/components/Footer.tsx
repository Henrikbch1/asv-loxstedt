import type { GlobalSettings } from '../../../types/domain';
import type { FooterLegalLink } from '../model/footer.types';
import { footerClasses } from '../styles/footer.classes';
import { FOOTER_TOKENS } from '../styles/footer.tokens';
import { mapGlobalSettingsToFooterData } from '../model/footer.mapper';
import { FooterMap } from './FooterMap';
import { FooterContact } from './FooterContact';
import { FooterLegal } from './FooterLegal';
import '../footer.css';

const footerBackground = {
  background: FOOTER_TOKENS.gradients.background,
} as const;

interface FooterProps {
  settings?: GlobalSettings | null;
  legalLinks?: FooterLegalLink[] | null;
}

export function Footer({ settings, legalLinks }: FooterProps) {
  const data = mapGlobalSettingsToFooterData(settings);

  const addressString = data?.addressLines?.length
    ? data.addressLines.filter(Boolean).join(' ')
    : undefined;

  return (
    <footer className={footerClasses.layout.root} style={footerBackground}>
      <div className={footerClasses.layout.container}>
        <div className={footerClasses.layout.inner}>
          <FooterContact
            displayName={data?.displayName}
            siteName={settings?.site_name}
            addressLines={data?.addressLines}
            phone={data?.phone}
            footerNote={data?.footerNote}
          />

          <div className="grid gap-4 text-left">
            <FooterMap
              mapsEmbedUrl={data?.mapsEmbedUrl}
              addressString={addressString}
            />
          </div>
        </div>

        <FooterLegal
          displayName={settings?.site_name ?? data?.displayName}
          legalLinks={legalLinks}
        />
      </div>
    </footer>
  );
}
