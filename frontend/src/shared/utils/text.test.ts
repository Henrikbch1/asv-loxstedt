import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { stripHtml, getExcerpt } from './text';

// Mock a minimal DOMParser and `window` so stripHtml behaves like in browser
beforeAll(() => {
  (global as unknown as Record<string, unknown>)['window'] = {};
  (global as unknown as Record<string, unknown>)['DOMParser'] = class {
    parseFromString(html: string) {
      return {
        body: {
          textContent: html
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
        },
      };
    }
  };
});

afterAll(() => {
  delete (global as unknown as Record<string, unknown>)['window'];
  delete (global as unknown as Record<string, unknown>)['DOMParser'];
});

describe('text utils', () => {
  it('stripHtml removes HTML tags and normalizes whitespace (browser-like)', () => {
    const html =
      '<p>Hello <strong>World</strong>\n\t<span>  and  friends</span></p>';
    const result = stripHtml(html);
    expect(result).toBe('Hello World and friends');
  });

  it('getExcerpt returns empty string for null/undefined', () => {
    expect(getExcerpt(null)).toBe('');
    expect(getExcerpt(undefined)).toBe('');
  });

  it('getExcerpt returns full text if shorter than maxLength', () => {
    const html = '<p>Short text</p>';
    expect(getExcerpt(html, 50)).toBe('Short text');
  });

  it('getExcerpt truncates long text and appends ellipsis', () => {
    const longText = '<p>' + 'a'.repeat(300) + '</p>';
    const excerpt = getExcerpt(longText, 100);
    expect(excerpt.length).toBeLessThanOrEqual(103); // 100 chars + '...'
    expect(excerpt.endsWith('...')).toBe(true);
  });
});
