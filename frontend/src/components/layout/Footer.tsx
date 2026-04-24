import { RichText } from '../ui/RichText';
import { Link } from 'react-router-dom';
import type { GlobalSettings } from '../../types/cms';
import { footerClasses } from './styles/footer.classes';
import { FOOTER_TOKENS } from './styles/footer.tokens';

const footerBackground = {
  background: FOOTER_TOKENS.gradients.background,
} as const;

interface FooterProps {
  settings?: GlobalSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const addressString = [
    settings?.street,
    settings?.postal_code,
    settings?.city,
  ]
    .filter(Boolean)
    .join(' ');
  const mapsUrl = addressString
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        addressString,
      )}`
    : undefined;

  const zoomLevel = FOOTER_TOKENS.map.zoom;
  const mapType = FOOTER_TOKENS.map.type;
  const language = FOOTER_TOKENS.map.language;

  const baseUrl = 'https://www.google.com/maps';
  const mapsEmbedUrl = addressString
    ? `${baseUrl}?q=${encodeURIComponent(addressString)}&t=${mapType}&z=${zoomLevel}&hl=${language}&output=embed`
    : undefined;

  return (
    <footer className={footerClasses.layout.root} style={footerBackground}>
      <div className={footerClasses.layout.container}>
        <div className={footerClasses.layout.inner}>
          <div className="grid gap-4 text-left">
            <span className={footerClasses.brand.title}>
              {settings?.site_name ?? settings?.club_name ?? ''}
            </span>
            {mapsEmbedUrl ? (
              <div className={footerClasses.brand.mapWrap}>
                <iframe
                  title={`Karte: ${addressString}`}
                  src={mapsEmbedUrl}
                  width="100%"
                  height={FOOTER_TOKENS.map.height}
                  className={footerClasses.brand.mapIframe}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>
          <div className={footerClasses.contact.panel}>
            <span className={footerClasses.contact.metaText}>Kontaktdaten</span>

            {(settings?.site_name ||
              settings?.club_name ||
              settings?.street ||
              settings?.postal_code ||
              settings?.city ||
              settings?.phone) && (
              <div className={footerClasses.contact.wrapper}>
                {settings?.site_name || settings?.club_name ? (
                  <div className={footerClasses.contact.clubName}>
                    {settings?.site_name ?? settings?.club_name}
                  </div>
                ) : null}

                {settings?.street || settings?.postal_code || settings?.city ? (
                  <address className={footerClasses.contact.address}>
                    <div>
                      {settings?.street ? <div>{settings.street}</div> : null}
                      {settings?.postal_code || settings?.city ? (
                        <div>
                          {settings?.postal_code ?? ''}
                          {settings?.postal_code && settings?.city ? ' ' : ''}
                          {settings?.city ?? ''}
                        </div>
                      ) : null}
                    </div>
                  </address>
                ) : null}

                {settings?.phone ? (
                  <div className={footerClasses.contact.phone}>
                    <span>Telefon: </span>
                    <a
                      href={`tel:${settings.phone}`}
                      className={footerClasses.contact.phoneLink}
                      aria-label={`Telefon ${settings.phone}`}
                    >
                      {settings.phone}
                    </a>
                  </div>
                ) : null}
              </div>
            )}

            {settings?.footer_note ? (
              <div className={footerClasses.contact.wrapper}>
                <RichText
                  className={footerClasses.contact.richText}
                  html={settings.footer_note}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={footerClasses.layout.tail}>
          <p className={footerClasses.legal.copyright}>
            © {currentYear} - {settings?.site_name ?? settings?.club_name ?? ''}
          </p>
          <nav className={footerClasses.legal.nav}>
            <Link
              to="/impressum"
              className={`${footerClasses.legal.link} mr-3`}
            >
              Impressum
            </Link>
            <Link to="/datenschutz" className={footerClasses.legal.link}>
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
