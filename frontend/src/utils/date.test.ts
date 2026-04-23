import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('returns null for null or undefined', () => {
    expect(formatDate(null)).toBeNull();
    expect(formatDate(undefined)).toBeNull();
  });

  it('returns null for invalid date strings', () => {
    expect(formatDate('not-a-date')).toBeNull();
  });

  it('formats a valid date string using de-DE locale', () => {
    const input = '2020-01-02';
    const formatter = new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    expect(formatDate(input)).toBe(formatter.format(new Date(input)));
  });

  it('formats an ISO datetime string with time and timezone', () => {
    const input = '2020-01-02T12:34:56Z';
    const formatter = new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    expect(formatDate(input)).toBe(formatter.format(new Date(input)));
  });

  it('handles out-of-range calendar dates (JS normalizes/rollover)', () => {
    expect(formatDate('2020-02-30')).not.toBeNull();
  });

  it('trims whitespace and parses valid date strings', () => {
    const input = ' 2020-01-02 ';
    const formatter = new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    expect(formatDate(input)).toBe(formatter.format(new Date(input.trim())));
  });
});
