import { RichText } from "../ui/RichText";
import { Link } from "react-router-dom";
import type { GlobalSettings } from "../../types/cms";

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
    .join(" ");
  const mapsUrl = addressString
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        addressString,
      )}`
    : undefined;
  /*
    MAP CONFIGURATION:
    - zoomLevel: Sets the magnification. 1 (world) to 21 (street level). 15-17 recommended.
    - mapType:   Sets the view mode. 'm' = Standard Roadmap, 'k' = Satellite imagery.
    - language:  Sets the UI language (e.g., 'en' for English, 'de' for German).
    */
  const zoomLevel = 15;
  const mapType = "k";
  const language = "de";

  const baseUrl = "https://www.google.com/maps";
  // build google maps url
  const mapsEmbedUrl = addressString
    ? `${baseUrl}?q=${encodeURIComponent(addressString)}&t=${mapType}&z=${zoomLevel}&hl=${language}&output=embed`
    : undefined;

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__inner grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="grid gap-4 text-left">
            <span className="eyebrow inline-block text-sm font-bold text-white/90">
              {settings?.site_name ?? ""}
            </span>
            <p className="site-footer__title">
              Vereinsinhalte mit klarer Struktur und einer moderneren
              Oberfläche.
            </p>
            <p className="site-footer__content m-0 max-w-xl5">
              News, Seiten und wichtige Vereinsinformationen werden zentral
              gepflegt und hier in einer ruhigen, gruen-warmen Oberfläche
              ausgespielt.
            </p>
            <RichText
              className="rich-text site-footer__richtext prose prose-invert prose-sm max-w-none whitespace-normal"
              html={settings?.footer_note}
            />
          </div>
          <div className="site-footer__panel break-words whitespace-normal text-left">
            <span className="meta-text ">Kontakt Daten</span>

            {(settings?.site_name ||
              settings?.street ||
              settings?.postal_code ||
              settings?.city ||
              settings?.phone) && (
              <div className="site-footer__contact mt-4 break-words whitespace-normal text-left">
                {(settings?.site_name ?? settings.club_name) ? (
                  <div className="font-semibold">{settings.club_name}</div>
                ) : null}

                {settings?.street || settings?.postal_code || settings?.city ? (
                  <address className="not-italic mt-1 whitespace-normal">
                    <div className="leading-tight">
                      {settings?.street ? <div>{settings.street}</div> : null}
                      {settings?.postal_code || settings?.city ? (
                        <div>
                          {settings?.postal_code ?? ""}
                          {settings?.postal_code && settings?.city ? " " : ""}
                          {settings?.city ?? ""}
                        </div>
                      ) : null}
                    </div>
                  </address>
                ) : null}

                {settings?.phone ? (
                  <div className="mt-2">
                    <span>Telefon: </span>
                    <a
                      href={`tel:${settings.phone}`}
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
                      className="inline-flex items-center gap-3 text-white/9000 hover:underline"
                      aria-label={`Anfahrt: ${addressString}`}
                    >
                      <span className="map-icon" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                ) : null}

                {mapsEmbedUrl ? (
                  <div
                    className="mt-3 rounded overflow-hidden"
                    style={{ maxWidth: 600 }}
                  >
                    <iframe
                      title={`Karte: ${addressString}`}
                      src={mapsEmbedUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="site-footer__tail text-center flex flex-col items-center gap-1 whitespace-normal break-words mt-8">
          <p className="whitespace-normal break-words">
            © {currentYear} - {settings?.site_name ?? settings?.club_name ?? ""}
          </p>
          <p className="text-white/70 whitespace-normal">
            Aktuelles, Termine und Vereinsinformationen
          </p>
          <nav className="mt-2 text-sm">
            <Link to="/impressum" className="hover:underline mr-3">
              Impressum
            </Link>{" | "}
            <Link to="/datenschutz" className="hover:underline">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
