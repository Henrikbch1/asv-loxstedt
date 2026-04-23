import { describe, it, expect, vi } from 'vitest';

vi.mock('../config/env', () => ({
  appConfig: { assetsPath: '/assets', apiBaseUrl: 'https://api.example.com' },
}));

import {
  getCmsAssetUrl,
  getCmsAssetLabel,
  isExpandedDirectusFile,
  getNewsPreviewUrl,
  getNewsDetailUrl,
} from './assets';

describe('assets utils', () => {
  it('build assets URL with params', () => {
    const url = getCmsAssetUrl('123', { fit: 'inside', width: 900 });
    expect(url).toBe('https://api.example.com/assets/123?fit=inside&width=900');
  });
  it('returns sensible labels', () => {
    expect(getCmsAssetLabel(null as unknown)).toBe('CMS asset');
    expect(
      getCmsAssetLabel({ id: '1', filename_download: 'file.jpg' } as unknown),
    ).toBe('file.jpg');
  });

  it('type guard works', () => {
    expect(isExpandedDirectusFile({ id: '1' } as unknown)).toBe(true);
    expect(isExpandedDirectusFile('1' as unknown)).toBe(false);
  });

  it('preview/detail helpers compose params', () => {
    const preview = getNewsPreviewUrl('123')!;
    expect(preview).toContain('width=900');
    expect(preview).toContain('height=675');

    const detail = getNewsDetailUrl('123')!;
    expect(detail).toContain('width=1600');
  });
});
