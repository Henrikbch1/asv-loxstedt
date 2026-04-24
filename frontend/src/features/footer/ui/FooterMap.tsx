import React from 'react';
import type { FooterMap as FooterMapType } from '../package-spec';

interface Props {
  map?: FooterMapType | null;
  className?: string;
}

export function FooterMap({ map, className }: Props) {
  if (!map) return null;

  const src = map.embedUrl ?? undefined;
  if (!src) return null;

  return (
    <div className={className}>
      <iframe
        title={`Karte`}
        src={src}
        width="100%"
        height={map.zoom ? 300 : 250}
        loading="lazy"
      />
    </div>
  );
}
