import { footerClasses } from '../styles/footer.classes';
import { FOOTER_TOKENS } from '../styles/footer.tokens';

interface FooterMapProps {
  mapsEmbedUrl?: string | null;
  addressString?: string;
}

export function FooterMap({ mapsEmbedUrl, addressString }: FooterMapProps) {
  if (!mapsEmbedUrl) return null;

  return (
    <div className={footerClasses.brand.mapWrap}>
      <iframe
        title={`Karte — ${addressString ?? 'Anfahrt'}`}
        aria-label={`Karte, ${addressString ?? 'Anfahrt'}`}
        src={mapsEmbedUrl}
        className={footerClasses.brand.mapIframe}
        width="100%"
        height={FOOTER_TOKENS.map.height}
        loading="lazy"
      />
    </div>
  );
}
