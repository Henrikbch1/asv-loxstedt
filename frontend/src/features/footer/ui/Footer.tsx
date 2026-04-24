import type { FooterProps } from '../package-spec';
import React from 'react';
import { FooterContact as FooterContactUI } from './FooterContact';
import { FooterMap as FooterMapUI } from './FooterMap';
import { FooterLegal as FooterLegalUI } from './FooterLegal';

export function Footer({ data, legalLinks, className, variant }: FooterProps) {
  const contact = data?.contact;
  const map = data?.map;

  return (
    <footer className={className} data-variant={variant}>
      <div>
        <FooterContactUI contact={contact} />
        <FooterMapUI map={map} />
      </div>

      <FooterLegalUI legalLinks={legalLinks} copyright={data?.copyright} />
    </footer>
  );
}
