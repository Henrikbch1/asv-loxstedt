import { RichText } from '../../components/ui/RichText';
import { footerClasses } from '../styles/footer.classes';

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

  return (
    <div className={footerClasses.contact.panel}>
      <span className={footerClasses.contact.metaText}>Kontaktdaten</span>

      {hasContact && (
        <div className={footerClasses.contact.wrapper}>
          {displayName ? (
            <div className={footerClasses.contact.clubName}>{displayName}</div>
          ) : null}

          {addressLines && addressLines.length ? (
            <address className={footerClasses.contact.address}>
              <div>
                {addressLines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </address>
          ) : null}

          {phone ? (
            <div className={footerClasses.contact.phone}>
              <span>Telefon: </span>
              <a
                href={`tel:${phone}`}
                className={footerClasses.contact.phoneLink}
                aria-label={`Telefon ${phone}`}
              >
                {phone}
              </a>
            </div>
          ) : null}
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
