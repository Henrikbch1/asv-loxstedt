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
  it('returns null for missing asset and accepts numeric id', () => {
    expect(getCmsAssetUrl(null)).toBeNull();

    const urlNum = getCmsAssetUrl(123, { quality: 80 });
    expect(urlNum).toContain('https://api.example.com/assets/123');
    expect(urlNum).toContain('quality=80');
  });
  it('returns sensible labels', () => {
    const emptyAsset: DirectusFileReference = null;
    const file: DirectusFile = { id: '1', filename_download: 'file.jpg' };

    const titled: DirectusFile = {
      id: '2',
      title: 'Article image',
      filename_download: 'fallback.jpg',
    };

    expect(getCmsAssetLabel(emptyAsset)).toBe('CMS asset');
    expect(getCmsAssetLabel(file)).toBe('file.jpg');
    expect(getCmsAssetLabel(titled)).toBe('Article image');
  });

  it('type guard works', () => {
    const expanded: DirectusFileReference = { id: '1' };
    const idRef: DirectusFileReference = '1';

    const emptyObj = {} as DirectusFileReference;

    expect(isExpandedDirectusFile(expanded)).toBe(true);
    expect(isExpandedDirectusFile(idRef)).toBe(false);
    expect(isExpandedDirectusFile(emptyObj)).toBe(false);
  });

  it('preview/detail helpers compose params', () => {
    const preview = getNewsPreviewUrl('123')!;
    expect(preview).toContain('width=900');
    expect(preview).toContain('height=675');

    const detail = getNewsDetailUrl('123')!;
    expect(detail).toContain('width=1600');
  });

  it('preview/detail return null for missing asset', () => {
    expect(getNewsPreviewUrl(null)).toBeNull();
    expect(getNewsDetailUrl(null)).toBeNull();
  });
  it('getCmsAssetUrl without params returns bare URL', () => {
    const url = getCmsAssetUrl('no-params')!;
    expect(url).toBe('https://api.example.com/assets/no-params');
  });
  it('getCmsAssetLabel falls back to default when no title or filename', () => {
    const noMeta: DirectusFile = { id: '3' };
    expect(getCmsAssetLabel(noMeta)).toBe('CMS asset');
  });
  it('getCmsAssetUrl accepts expanded DirectusFile objects', () => {
    const file: DirectusFile = { id: 'expanded-id' };
    const url = getCmsAssetUrl(file, { foo: 'bar' })!;
    expect(url).toContain('/assets/expanded-id');
    expect(url).toContain('foo=bar');
  });
});
