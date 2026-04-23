import { describe, it, expect } from 'vitest';
import { expandDirectusRelation } from './directus';
import type { DirectusFile } from '../types/directus';

describe('expandDirectusRelation', () => {
  it('returns null for null', () => {
    expect(expandDirectusRelation<DirectusFile>(null)).toBeNull();
  });
  it('returns null for number id and 0', () => {
    expect(expandDirectusRelation<DirectusFile>(123)).toBeNull();
    expect(expandDirectusRelation<DirectusFile>(0)).toBeNull();
  });
  it('returns null for string id and empty string', () => {
    expect(expandDirectusRelation<DirectusFile>('abc')).toBeNull();
    expect(expandDirectusRelation<DirectusFile>('')).toBeNull();
  });
  it('returns the same object reference when expanded', () => {
    const file: DirectusFile = { id: 1, title: 'A' };
    const result = expandDirectusRelation<DirectusFile>(file);
    expect(result).toBe(file);
  });

  it('returns empty object when passed {}', () => {
    const o = {};
    expect(expandDirectusRelation<object>(o)).toBe(o);
  });

  it('returns array if an array is passed (current behavior)', () => {
    const arr = [1, 2, 3];
    expect(expandDirectusRelation<unknown>(arr)).toBe(arr);
  });
});
