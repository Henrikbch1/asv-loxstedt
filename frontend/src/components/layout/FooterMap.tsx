import { footerClasses } from './styles/footer.classes';
import { FOOTER_TOKENS } from './styles/footer.tokens';

interface FooterMapProps {
  mapsEmbedUrl?: string | null;
  addressString?: string | undefined;
}

export function FooterMap({ mapsEmbedUrl, addressString }: FooterMapProps) {
  if (!mapsEmbedUrl) return null;

  return (
    <div className={footerClasses.brand.mapWrap}>
      <iframe
        title={`Karte: ${addressString ?? 'Karte'}`}
        src={mapsEmbedUrl}
        width="100%"
        height={FOOTER_TOKENS.map.height}
        className={footerClasses.brand.mapIframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
