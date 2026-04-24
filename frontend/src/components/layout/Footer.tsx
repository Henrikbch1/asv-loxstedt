import { RichText } from '../ui/RichText';
import { Link } from 'react-router-dom';
import type { GlobalSettings } from '../../types/cms';

const styles = {
  footer:
    'relative mt-8 border-t border-[rgba(121,185,39,0.14)] py-0 text-[#f6f7f2] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-brand before:to-accent',
  container: 'mx-auto w-[min(1120px,calc(100vw-1.75rem))] py-8',
  inner:
    'grid grid-cols-1 items-start gap-6 rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:grid-cols-2',
  eyebrow: 'mb-1 inline-block text-2xl font-bold text-white',
  mapWrap: 'mt-3 max-w-[600px] overflow-hidden rounded-md',
  mapIframe: 'w-full border-0',
  panel:
    'rounded-md border border-white/10 bg-white/[0.05] p-5 break-words whitespace-normal text-left text-white/80',
  metaText: 'text-xs font-semibold uppercase tracking-wider text-accent',
  contact: 'mt-4 break-words whitespace-normal text-left',
  clubName: 'font-semibold',
  address: 'mt-1 not-italic whitespace-normal leading-tight',
  phone: 'mt-2',
  phoneLink: 'hover:underline',
  mapsLink: 'mt-3 inline-flex items-center gap-3 text-white/90 hover:underline',
  mapIcon: 'h-4 w-4',
  richtext:
    'prose prose-invert prose-sm max-w-none whitespace-normal text-white/80',
  tail: 'mt-8 flex items-center justify-between gap-4 whitespace-normal break-words pb-6 text-white/70 text-sm',
  copyright: 'whitespace-normal break-words',
  legalNav: '',
  legalLink: 'hover:underline',
} as const;

const footerBackground = {
  background:
    'linear-gradient(180deg, rgba(121, 185, 39, 0.12), rgba(17, 17, 17, 0.84)), #111111',
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

  const zoomLevel = 15;
  const mapType = 'k';
  const language = 'de';

  const baseUrl = 'https://www.google.com/maps';
  const mapsEmbedUrl = addressString
    ? `${baseUrl}?q=${encodeURIComponent(addressString)}&t=${mapType}&z=${zoomLevel}&hl=${language}&output=embed`
    : undefined;

  return (
    <footer className={styles.footer} style={footerBackground}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className="grid gap-4 text-left">
            <span className={styles.eyebrow}>{settings?.site_name ?? ''}</span>
            <br />
            {mapsEmbedUrl ? (
              <div className={styles.mapWrap}>
                <iframe
                  title={`Karte: ${addressString}`}
                  src={mapsEmbedUrl}
                  width="100%"
                  height="200"
                  className={styles.mapIframe}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>
          <div className={styles.panel}>
            <span className={styles.metaText}>Kontakt Daten</span>

            {(settings?.site_name ||
              settings?.street ||
              settings?.postal_code ||
              settings?.city ||
              settings?.phone) && (
              <div className={styles.contact}>
                {(settings?.site_name ?? settings?.club_name) ? (
                  <div className={styles.clubName}>{settings?.club_name}</div>
                ) : null}

                {settings?.street || settings?.postal_code || settings?.city ? (
                  <address className={styles.address}>
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
                  <div className={styles.phone}>
                    <span>Telefon: </span>
                    <a
                      href={`tel:${settings.phone}`}
                      className={styles.phoneLink}
                      aria-label={`Telefon ${settings.phone}`}
                    >
                      {settings.phone}
                    </a>
                  </div>
                ) : null}

                {mapsUrl ? (
                  <div className="mt-3">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapsLink}
                      aria-label={`Anfahrt: ${addressString}`}
                    >
                      <span aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={styles.mapIcon}
                        >
                          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                ) : null}

                <RichText
                  className={styles.richtext}
                  html={settings?.footer_note}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.tail}>
          <p className={styles.copyright}>
            © {currentYear} - {settings?.site_name ?? settings?.club_name ?? ''}
          </p>
          <nav className={styles.legalNav}>
            <Link to="/impressum" className={`${styles.legalLink} mr-3`}>
              Impressum
            </Link>
            <Link to="/datenschutz" className={styles.legalLink}>
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
