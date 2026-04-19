import { RichText } from "../ui/RichText";
import type { GlobalSettings } from "../../types/cms";

interface FooterProps {
  settings: GlobalSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__inner">
          <div className="grid gap-4">
            <span className="eyebrow inline-block text-sm font-bold text-white/90">
              {settings.site_name}
            </span>
            <p className="site-footer__title">
              Vereinsinhalte mit klarer Struktur und einer moderneren
              Oberflaeche.
            </p>
            <p className="site-footer__content m-0 max-w-xl">
              News, Seiten und Footer-Inhalte werden zentral im CMS gepflegt und
              hier in einer ruhigen, gruen-warmen Oberflaeche ausgespielt.
            </p>
          </div>
          <div className="site-footer__panel">
            <span className="meta-text text-white/70">CMS-Inhalt</span>
            <RichText
              className="rich-text site-footer__richtext prose prose-sm max-w-none"
              html={settings.footer_note}
            />
          </div>
        </div>
        <div className="site-footer__tail">
          <p>
            {settings.site_name} {currentYear}
          </p>
          <p>Frontend mit Directus-Anbindung</p>
        </div>
      </div>
    </footer>
  );
}
