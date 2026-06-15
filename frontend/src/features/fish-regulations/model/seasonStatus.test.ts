import { describe, expect, it } from 'vitest';
import type { FishRegulation } from '@/shared/types/domain';
import {
  formatClosedSeason,
  formatMinimumSize,
  getFishRegulationStatus,
  isInClosedSeason,
} from './seasonStatus';

function createRegulation(
  overrides: Partial<FishRegulation> = {},
): FishRegulation {
  return {
    id: 1,
    name: 'Hecht',
    image: null,
    minimum_size_cm: 45,
    has_closed_season: true,
    closed_start: '04-01',
    closed_end: '05-15',
    water_type: 'all',
    sort: 10,
    ...overrides,
  };
}

describe('seasonStatus', () => {
  it('returns open when closed season is disabled', () => {
    const regulation = createRegulation({ has_closed_season: false });
    expect(isInClosedSeason(regulation, new Date(2026, 3, 2))).toBe(false);
    expect(getFishRegulationStatus(regulation, new Date(2026, 3, 2))).toBe(
      'open',
    );
  });

  it('returns blocked inside normal season range', () => {
    const regulation = createRegulation({
      closed_start: '04-01',
      closed_end: '05-15',
    });

    expect(isInClosedSeason(regulation, new Date(2026, 3, 20))).toBe(true);
    expect(getFishRegulationStatus(regulation, new Date(2026, 3, 20))).toBe(
      'blocked',
    );
  });

  it('returns open outside normal season range', () => {
    const regulation = createRegulation({
      closed_start: '04-01',
      closed_end: '05-15',
    });

    expect(isInClosedSeason(regulation, new Date(2026, 6, 1))).toBe(false);
  });

  it('supports season over year boundary', () => {
    const regulation = createRegulation({
      closed_start: '10-15',
      closed_end: '02-15',
    });

    expect(isInClosedSeason(regulation, new Date(2026, 10, 1))).toBe(true);
    expect(isInClosedSeason(regulation, new Date(2026, 0, 20))).toBe(true);
    expect(isInClosedSeason(regulation, new Date(2026, 4, 1))).toBe(false);
  });

  it('treats missing season bounds as open', () => {
    const regulation = createRegulation({
      closed_start: null,
      closed_end: null,
    });
    expect(isInClosedSeason(regulation, new Date(2026, 10, 1))).toBe(false);
    expect(formatClosedSeason(regulation)).toBe('Keine');
  });

  it('formats labels for minimum size and season', () => {
    const regulation = createRegulation({
      closed_start: '10-15',
      closed_end: '02-15',
    });

    expect(formatMinimumSize(55)).toBe('55 cm');
    expect(formatMinimumSize(null)).toBe('-');
    expect(formatClosedSeason(regulation)).toBe('ab 15.10. - 15.02.');
  });

  it('supports German month-name values from CMS text fields', () => {
    const regulation = createRegulation({
      closed_start: '01 Maerz',
      closed_end: '01 Mai',
    });

    expect(formatClosedSeason(regulation)).toBe('ab 01.03. - 01.05.');
    expect(isInClosedSeason(regulation, new Date(2026, 2, 15))).toBe(true);
    expect(isInClosedSeason(regulation, new Date(2026, 5, 1))).toBe(false);
  });

  it('supports German month names with umlaut from CMS text fields', () => {
    const regulation = createRegulation({
      closed_start: '01 März',
      closed_end: '15 April',
    });

    expect(formatClosedSeason(regulation)).toBe('ab 01.03. - 15.04.');
    expect(isInClosedSeason(regulation, new Date(2026, 2, 10))).toBe(true);
    expect(isInClosedSeason(regulation, new Date(2026, 4, 1))).toBe(false);
  });

  it('supports DD.MM values from CMS text fields', () => {
    const regulation = createRegulation({
      closed_start: '01.03',
      closed_end: '15.04',
    });

    expect(formatClosedSeason(regulation)).toBe('ab 01.03. - 15.04.');
    expect(isInClosedSeason(regulation, new Date(2026, 2, 10))).toBe(true);
    expect(isInClosedSeason(regulation, new Date(2026, 1, 28))).toBe(false);
  });
});
