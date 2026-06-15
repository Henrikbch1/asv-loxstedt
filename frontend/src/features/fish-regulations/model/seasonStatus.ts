import type { FishRegulation } from '@/shared/types/domain';

export type FishRegulationStatus = 'blocked' | 'open';

interface MonthDay {
  month: number;
  day: number;
}

const MONTH_NAME_TO_NUMBER: Record<string, number> = {
  januar: 1,
  februar: 2,
  maerz: 3,
  april: 4,
  mai: 5,
  juni: 6,
  juli: 7,
  august: 8,
  september: 9,
  oktober: 10,
  november: 11,
  dezember: 12,
};

function isValidMonthDay(month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const maxDay = new Date(2024, month, 0).getDate();
  return day <= maxDay;
}

function normalizeMonthName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\u00e4/g, 'ae')
    .replace(/\u00f6/g, 'oe')
    .replace(/\u00fc/g, 'ue');
}

function parseMonthDay(value: string | null): MonthDay | null {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim();
  const match = /^(\d{2})-(\d{2})$/.exec(normalizedValue);
  if (match) {
    const month = Number(match[1]);
    const day = Number(match[2]);

    if (!isValidMonthDay(month, day)) {
      return null;
    }

    return { month, day };
  }

  // Compat: allow values like "01 Februar" or "1. Mai" from CMS text fields.
  const monthNameMatch =
    /^(\d{1,2})\.?[\s-]+([A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc]+)$/.exec(
      normalizedValue,
    );

  if (!monthNameMatch) {
    return null;
  }

  const day = Number(monthNameMatch[1]);
  const normalizedMonthName = normalizeMonthName(monthNameMatch[2]);
  const month = MONTH_NAME_TO_NUMBER[normalizedMonthName];

  if (!month || !isValidMonthDay(month, day)) {
    return null;
  }

  return { month, day };
}

function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const msPerDay = 24 * 60 * 60 * 1000;
  return (
    Math.floor((startOfDay.getTime() - startOfYear.getTime()) / msPerDay) + 1
  );
}

function getDayOfYearFromMonthDay(monthDay: MonthDay, year: number): number {
  return getDayOfYear(new Date(year, monthDay.month - 1, monthDay.day));
}

export function isInClosedSeason(
  regulation: FishRegulation,
  now = new Date(),
): boolean {
  if (!regulation.has_closed_season) {
    return false;
  }

  const start = parseMonthDay(regulation.closed_start);
  const end = parseMonthDay(regulation.closed_end);

  if (!start || !end) {
    return false;
  }

  const year = now.getFullYear();
  const currentDay = getDayOfYear(now);
  const startDay = getDayOfYearFromMonthDay(start, year);
  const endDay = getDayOfYearFromMonthDay(end, year);

  if (startDay <= endDay) {
    return currentDay >= startDay && currentDay <= endDay;
  }

  return currentDay >= startDay || currentDay <= endDay;
}

export function getFishRegulationStatus(
  regulation: FishRegulation,
  now = new Date(),
): FishRegulationStatus {
  return isInClosedSeason(regulation, now) ? 'blocked' : 'open';
}

function formatMonthDay(value: string | null): string | null {
  const parsed = parseMonthDay(value);

  if (!parsed) {
    return null;
  }

  return `${String(parsed.day).padStart(2, '0')}.${String(parsed.month).padStart(2, '0')}.`;
}

export function formatMinimumSize(minimumSizeCm: number | null): string {
  if (typeof minimumSizeCm !== 'number' || Number.isNaN(minimumSizeCm)) {
    return '-';
  }

  return `${minimumSizeCm} cm`;
}

export function formatClosedSeason(regulation: FishRegulation): string {
  if (!regulation.has_closed_season) {
    return 'Keine';
  }

  const start = formatMonthDay(regulation.closed_start);
  const end = formatMonthDay(regulation.closed_end);

  if (!start || !end) {
    return 'Keine';
  }

  return `ab ${start} bis einschliesslich ${end}`;
}
