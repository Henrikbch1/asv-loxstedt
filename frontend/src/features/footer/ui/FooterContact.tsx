import React from 'react';
import type { FooterContact as FooterContactType } from '../package-spec';

interface Props {
  contact?: FooterContactType | null;
  className?: string;
}

export function FooterContact({ contact, className }: Props) {
  if (!contact) return null;

  const { siteName, name, address, phone, email, openingHours } =
    contact as any;

  return (
    <div className={className}>
      {siteName ? <div>{siteName}</div> : null}
      {name ? <div>{name}</div> : null}
      {address ? (
        <address>
          {address.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </address>
      ) : null}
      {phone ? (
        <div>
          <span>Telefon: </span>
          <a href={`tel:${phone}`} aria-label={`Telefon: ${phone}`}>
            {phone}
          </a>
        </div>
      ) : null}
      {email ? (
        <div>
          <a href={`mailto:${email}`} aria-label={`E-Mail: ${email}`}>
            {email}
          </a>
        </div>
      ) : null}
      {openingHours && openingHours.length ? (
        <div>
          {openingHours.map((h, i) => (
            <div key={i}>{h}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
