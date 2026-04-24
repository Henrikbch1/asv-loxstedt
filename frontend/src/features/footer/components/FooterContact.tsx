import { RichText } from '../../../components/ui/RichText';
import { footerClasses } from '../styles/footer.classes';
import { FooterContact as FooterContactUI } from '../ui/FooterContact';

interface FooterContactProps {
  displayName?: string | null;
  addressLines?: string[] | null;
  phone?: string | null;
  footerNote?: string | null;
}

export function FooterContact({
  displayName,
  addressLines,
  phone,
  footerNote,
}: FooterContactProps) {
  const hasContact =
    displayName || (addressLines && addressLines.length) || phone;

  const contact = {
    name: displayName ?? undefined,
    address:
      addressLines && addressLines.length ? addressLines.join('\n') : undefined,
    phone: phone ?? undefined,
  };

  return (
    <div className={footerClasses.contact.panel}>
      <span className={footerClasses.contact.metaText}>Kontaktdaten</span>

      {hasContact && (
        <div className={footerClasses.contact.wrapper}>
          <FooterContactUI
            contact={contact}
            className={footerClasses.contact.wrapper}
          />
        </div>
      )}

      {footerNote ? (
        <div className={footerClasses.contact.wrapper}>
          <RichText
            className={footerClasses.contact.richText}
            html={footerNote}
          />
        </div>
      ) : null}
    </div>
  );
}
