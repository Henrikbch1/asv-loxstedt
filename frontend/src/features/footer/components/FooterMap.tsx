import { footerClasses } from '../styles/footer.classes';
import { FOOTER_TOKENS } from '../styles/footer.tokens';
import { FooterMap as FooterMapUI } from '../ui/FooterMap';

interface FooterMapProps {
  mapsEmbedUrl?: string | null;
  addressString?: string | undefined;
}

export function FooterMap({ mapsEmbedUrl, addressString }: FooterMapProps) {
  if (!mapsEmbedUrl) return null;

  const map = {
    embedUrl: mapsEmbedUrl ?? undefined,
  };

  return (
    <div className={footerClasses.brand.mapWrap}>
      <FooterMapUI map={map} className={footerClasses.brand.mapIframe} />
    </div>
  );
}
