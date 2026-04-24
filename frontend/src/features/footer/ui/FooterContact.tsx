import React from 'react';
import type { FooterContact as FooterContactType } from '../package-spec';

interface Props {
  contact?: FooterContactType | null;
  className?: string;
}

export function FooterContact({ contact, className }: Props) {
  if (!contact) return null;

  const { name, address, phone, email, openingHours } = contact;

  return (
    <div className={className}>
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
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      ) : null}
      {email ? (
        <div>
          <a href={`mailto:${email}`}>{email}</a>
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
