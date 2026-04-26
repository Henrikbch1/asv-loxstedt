import { footerClasses } from '../styles/footer.classes';

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
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
