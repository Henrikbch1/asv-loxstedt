import React from 'react';
import { mapGlobalSettingsToPackageFooterData } from '../model/footer.mapper';
import { FooterUI, FOOTER_UI_TOKENS } from '../ui';
import type { GlobalSettings } from '../../types/domain';

export function FooterExample({ settings }: { settings: GlobalSettings }) {
  const data = mapGlobalSettingsToPackageFooterData(settings);

  return (
    <div style={{ background: (FOOTER_UI_TOKENS as any).gradients?.background }}>
      <FooterUI data={data ?? undefined} legalLinks={[{ label: 'Impressum', to: '/impressum' }]} />
    </div>
  );
}

export default FooterExample;
