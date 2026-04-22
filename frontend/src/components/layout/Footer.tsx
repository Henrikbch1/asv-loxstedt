import { RichText } from "../ui/RichText";
import type { GlobalSettings } from "../../types/cms";

interface FooterProps {
  settings?: GlobalSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
            <p className="site-footer__content m-0 max-w-xl">
              News, Seiten und wichtige Vereinsinformationen werden zentral
              gepflegt und hier in einer ruhigen, gruen-warmen Oberfläche
              ausgespielt.
            </p>
          </div>
          <div className="site-footer__panel break-words whitespace-normal text-left">
            <span className="meta-text text-white/70">
              Weitere Informationen
            </span>
            <RichText
              className="rich-text site-footer__richtext prose prose-invert prose-sm max-w-none text-white whitespace-normal"
              html={settings?.footer_note}
            />

            {(settings?.club_name ||
              settings?.street ||
              settings?.postal_code ||
              settings?.city ||
              settings?.phone) && (
              <div className="site-footer__contact mt-4 break-words whitespace-normal text-left">
                {settings?.club_name ? (
                  <div className="font-semibold">{settings.club_name}</div>
                ) : null}

                {settings?.street || settings?.postal_code || settings?.city ? (
                  <address className="not-italic mt-1 whitespace-normal">
                    {settings?.street ? <div>{settings.street}</div> : null}
                    {settings?.postal_code || settings?.city ? (
                      <div>
                        {settings?.postal_code ?? ""}
                        {settings?.postal_code && settings?.city ? " " : ""}
                        {settings?.city ?? ""}
                      </div>
                    ) : null}
                  </address>
                ) : null}

                {settings?.phone ? (
                  <div className="mt-2">
                    <span>Telefon: </span>
                    <a
                      className="underline"
                      href={`tel:${settings.phone}`}
                      aria-label={`Telefon ${settings.phone}`}
                    >
                      {settings.phone}
                    </a>
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
        </div>
      </div>
    </footer>
  );
}
