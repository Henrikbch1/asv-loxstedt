import { describe, it, expect } from 'vitest';
import type { CmsPage } from '@/shared/types/cms';
import {
  normalizeCmsPagePath,
  buildCmsPagePathMap,
  findCmsPageByPath,
  getCmsPageHref,
} from './cmsPagePaths';

describe('cmsPagePaths utils', () => {
  it('normalizeCmsPagePath trims slashes and whitespace', () => {
    expect(normalizeCmsPagePath('/foo/bar/')).toBe('foo/bar');
    expect(normalizeCmsPagePath('  /a/ ')).toBe('a');
    expect(normalizeCmsPagePath('')).toBe('');
  });

  it('buildCmsPagePathMap builds paths for flat and nested pages', () => {
    const pages: CmsPage[] = [
      {
        id: 1,
        title: 'About',
        slug: 'about',
        content: null,
        featured_image: null,
        parent_page: null,
      },
      {
        id: 2,
        title: 'Team',
        slug: 'team',
        content: null,
        featured_image: null,
        parent_page: 1,
      },
      {
        id: 3,
        title: 'EmptySlug',
        slug: '',
        content: null,
        featured_image: null,
        parent_page: null,
      },
    ];

    const map = buildCmsPagePathMap(pages);
    expect(map.get('1')).toBe('about');
    expect(map.get('2')).toBe('about/team');
    expect(map.has('3')).toBe(false);
  });

  it('findCmsPageByPath returns the correct page or null', () => {
    const pages: CmsPage[] = [
      {
        id: 'a',
        title: 'A',
        slug: 'a',
        content: null,
        featured_image: null,
        parent_page: null,
      },
      {
        id: 'b',
        title: 'B',
        slug: 'b',
        content: null,
        featured_image: null,
        parent_page: 'a',
      },
    ];

    expect(findCmsPageByPath('/a/b', pages)?.id).toBe('b');
    expect(findCmsPageByPath('/does-not-exist', pages)).toBeNull();
    expect(findCmsPageByPath('', pages)).toBeNull();
  });

  it('getCmsPageHref returns leading slash or null when missing', () => {
    const pages: CmsPage[] = [
      {
        id: 1,
        title: 'Root',
        slug: 'root',
        content: null,
        featured_image: null,
        parent_page: null,
      },
    ];
    const map = buildCmsPagePathMap(pages);
    expect(getCmsPageHref(1, map)).toBe('/root');
    expect(getCmsPageHref('nonexistent', map)).toBeNull();
  });

  it('handles cycles by excluding pages involved in cycles', () => {
    // create a cycle: 1 -> 2 -> 1
    const pages: CmsPage[] = [
      {
        id: 1,
        title: 'One',
        slug: 'one',
        content: null,
        featured_image: null,
        parent_page: 2,
      },
      {
        id: 2,
        title: 'Two',
        slug: 'two',
        content: null,
        featured_image: null,
        parent_page: 1,
      },
    ];

    const map = buildCmsPagePathMap(pages);
    expect(map.size).toBe(0);
  });
});
