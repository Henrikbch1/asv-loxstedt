import { RichText } from '../../../components/ui/RichText';
import { footerClasses } from '../styles/footer.classes';

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
  const hasContact = siteName || displayName || addressLines?.length || phone;

  return (
    <div className={footerClasses.contact.panel}>
      <h2 className={footerClasses.contact.metaText}>Kontaktdaten</h2>

      {hasContact && (
        <div className={footerClasses.contact.wrapper}>
          {siteName && (
            <div className={footerClasses.contact.clubName}>{siteName}</div>
          )}
          {addressLines?.length ? (
            <address className={footerClasses.contact.address}>
              {addressLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </address>
          ) : null}
          {phone && (
            <div className={footerClasses.contact.phone}>
              <span>Telefon: </span>
              <a
                href={`tel:${phone}`}
                className={footerClasses.contact.phoneLink}
                aria-label={`Telefon: ${phone}`}
              >
                {phone}
              </a>
            </div>
          )}
        </div>
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
