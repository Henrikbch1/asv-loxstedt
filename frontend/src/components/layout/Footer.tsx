import { RichText } from '../ui/RichText';
import { Link } from 'react-router-dom';
import type { FooterData } from './model/footer.types';
import { footerClasses } from './styles/footer.classes';
import { FOOTER_TOKENS } from './styles/footer.tokens';

const footerBackground = {
  background: FOOTER_TOKENS.gradients.background,
} as const;

interface FooterProps {
  data?: FooterData | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const addressString =
    data?.addressLines && data.addressLines.length
      ? data.addressLines.filter(Boolean).join(' ')
      : undefined;

  const mapsUrl =
    data?.mapsUrl ??
    (data?.addressQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.addressQuery)}`
      : addressString
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`
        : undefined);

  const zoomLevel = FOOTER_TOKENS.map.zoom;
  const mapType = FOOTER_TOKENS.map.type;
  const language = FOOTER_TOKENS.map.language;

  const baseUrl = 'https://www.google.com/maps';
  const mapsEmbedUrl =
    data?.mapsEmbedUrl ??
    (addressString
      ? `${baseUrl}?q=${encodeURIComponent(addressString)}&t=${mapType}&z=${zoomLevel}&hl=${language}&output=embed`
      : undefined);

  return (
    <footer className={footerClasses.layout.root} style={footerBackground}>
      <div className={footerClasses.layout.container}>
        <div className={footerClasses.layout.inner}>
          <div className="grid gap-4 text-left">
            <span className={footerClasses.brand.title}>
              {data?.displayName ?? ''}
            </span>
            {mapsEmbedUrl ? (
              <div className={footerClasses.brand.mapWrap}>
                <iframe
                  title={`Karte: ${addressString ?? data?.displayName ?? 'Karte'}`}
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

            {(data?.displayName ||
              (data?.addressLines && data.addressLines.length) ||
              data?.phone) && (
              <div className={footerClasses.contact.wrapper}>
                {data?.displayName ? (
                  <div className={footerClasses.contact.clubName}>
                    {data.displayName}
                  </div>
                ) : null}

                {data?.addressLines && data.addressLines.length ? (
                  <address className={footerClasses.contact.address}>
                    <div>
                      {data.addressLines.map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>
                  </address>
                ) : null}

                {data?.phone ? (
                  <div className={footerClasses.contact.phone}>
                    <span>Telefon: </span>
                    <a
                      href={`tel:${data.phone}`}
                      className={footerClasses.contact.phoneLink}
                      aria-label={`Telefon ${data.phone}`}
                    >
                      {data.phone}
                    </a>
                  </div>
                ) : null}
              </div>
            )}

            {data?.footerNote ? (
              <div className={footerClasses.contact.wrapper}>
                <RichText
                  className={footerClasses.contact.richText}
                  html={data.footerNote}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={footerClasses.layout.tail}>
          <p className={footerClasses.legal.copyright}>
            © {currentYear} - {data?.displayName ?? ''}
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
