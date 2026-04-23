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
import type { DirectusFileReference, DirectusFile } from '../types/directus';

describe('assets utils', () => {
  it('build assets URL with params', () => {
    const url = getCmsAssetUrl('123', { fit: 'inside', width: 900 });
    expect(url).toBe('https://api.example.com/assets/123?fit=inside&width=900');
  });
  it('returns sensible labels', () => {
    const emptyAsset: DirectusFileReference = null;
    const file: DirectusFile = { id: '1', filename_download: 'file.jpg' };

    expect(getCmsAssetLabel(emptyAsset)).toBe('CMS asset');
    expect(getCmsAssetLabel(file)).toBe('file.jpg');
  });

  it('type guard works', () => {
    const expanded: DirectusFileReference = { id: '1' };
    const idRef: DirectusFileReference = '1';

    expect(isExpandedDirectusFile(expanded)).toBe(true);
    expect(isExpandedDirectusFile(idRef)).toBe(false);
  });

  it('preview/detail helpers compose params', () => {
    const preview = getNewsPreviewUrl('123')!;
    expect(preview).toContain('width=900');
    expect(preview).toContain('height=675');

    const detail = getNewsDetailUrl('123')!;
    expect(detail).toContain('width=1600');
  });
});
