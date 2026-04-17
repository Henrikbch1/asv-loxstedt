import { RichText } from "../ui/RichText";
import type { GlobalSettings } from "../../types/cms";

interface FooterProps {
  settings: GlobalSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <span className="eyebrow">{settings.site_name}</span>
          <p className="site-footer__title">Dynamische Inhalte aus Directus</p>
        </div>
        <RichText
          className="rich-text site-footer__content"
          html={settings.footer_text}
        />
      </div>
    </footer>
  );
}
