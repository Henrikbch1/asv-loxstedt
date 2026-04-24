import { RichText } from '../../../components/ui/RichText';
import { footerClasses } from '../styles/footer.classes';
import { FooterContact as FooterContactUI } from '../ui/FooterContact';

interface FooterContactProps {
  displayName?: string | null;
  siteName?: string | null;
  addressLines?: string[] | null;
  phone?: string | null;
  footerNote?: string | null;
}

export function FooterContact({
  displayName,
  siteName,
  addressLines,
  phone,
  footerNote,
}: FooterContactProps) {
  const hasContact =
    siteName || displayName || (addressLines && addressLines.length) || phone;

  const contact = {
    siteName: siteName ?? undefined,
    address:
      addressLines && addressLines.length ? addressLines.join('\n') : undefined,
    phone: phone ?? undefined,
  };

  return (
    <div className={footerClasses.contact.panel}>
      <h2 className={footerClasses.contact.metaText}>Kontaktdaten</h2>

      {hasContact && (
        <FooterContactUI
          contact={contact}
          className={footerClasses.contact.wrapper}
        />
      )}

      {footerNote ? (
        <RichText
          className={footerClasses.contact.richText}
          html={footerNote}
        />
      ) : null}
    </div>
  );
}
