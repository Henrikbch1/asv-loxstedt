#!/usr/bin/env node
/**
 * export-mock-cms.mjs
 *
 * Fetches selected Directus collections via REST API and writes them as
 * static JSON files into public/mock-cms/.
 *
 * Usage:
 *   VITE_API_BASE_URL=http://localhost:8055 \
 *   VITE_DIRECTUS_TOKEN=<token>             \
 *   node scripts/export-mock-cms.mjs
 *
 * Or via npm:
 *   npm run export:mock-cms
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Configuration – resolved from env vars with sensible defaults
// ---------------------------------------------------------------------------
const BASE_URL = (
  process.env.VITE_API_BASE_URL ?? 'http://localhost:8055'
).replace(/\/+$/, '');
const TOKEN = process.env.VITE_DIRECTUS_TOKEN?.trim() || undefined;
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'mock-cms');

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------
async function fetchDirectus(path, query = {}) {
  const url = new URL(path, BASE_URL + '/');

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(','));
    } else if (typeof value === 'object') {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        url.searchParams.set(`${key}[${nestedKey}]`, String(nestedValue));
      }
    } else {
      url.searchParams.set(key, String(value));
    }
  }

  const headers = { Accept: 'application/json' };
  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`[${response.status}] ${url} – ${body}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Export definitions
// ---------------------------------------------------------------------------

/**
 * Export configuration per collection.
 * Each entry contains the file target, the API path and an ordered list
 * of query objects to try. If a 403 occurs we retry with the next query.
 */
const exportsConfig = [
  {
    name: 'pages',
    file: 'pages.json',
    path: '/items/pages',
    queries: [
      {
        limit: -1,
        'filter[status][_eq]': 'published',
        sort: 'sort',
        fields: [
          'id',
          'title',
          'slug',
          'navigation_title',
          'content',
          'intro',
          'featured_image',
          'parent_page',
          'template',
          'hero_title',
          'hero_text',
          'show_title',
          'show_intro',
        ].join(','),
      },
      { limit: -1, 'filter[status][_eq]': 'published' },
    ],
    critical: true,
  },
  {
    name: 'navigation',
    file: 'navigation.json',
    path: '/items/navigation',
    queries: [
      {
        limit: -1,
        sort: 'sort',
        fields: [
          'sort',
          'label',
          'parent',
          'parent.label',
          'parent.page.slug',
          'parent.page.title',
          'page.id',
          'page.title',
          'page.slug',
          'page.navigation_title',
        ].join(','),
      },
      { limit: -1 },
    ],
  },
  {
    name: 'news',
    file: 'news.json',
    path: '/items/news',
    queries: [
      {
        limit: -1,
        'filter[status][_eq]': 'published',
        sort: '-date',
        fields: ['id', 'title', 'date', 'text', 'image', 'category.name'].join(
          ',',
        ),
      },
      { limit: -1, 'filter[status][_eq]': 'published' },
    ],
  },
  {
    name: 'roles',
    file: 'roles.json',
    path: '/items/roles',
    queries: [
      {
        limit: -1,
        sort: 'sort',
        fields: [
          'id',
          'sort',
          'role',
          'email',
          'is_vacant',
          'category.name',
          'person_link.firstname',
          'person_link.lastname',
        ].join(','),
      },
      { limit: -1 },
    ],
  },
  {
    name: 'persons',
    file: 'persons.json',
    path: '/items/persons',
    queries: [
      {
        limit: -1,
        sort: 'last_name,first_name',
        fields: ['id', 'firstname', 'lastname'].join(','),
      },
      { limit: -1 },
    ],
    optional: true,
  },
  {
    name: 'categories',
    file: 'categories.json',
    path: '/items/categories',
    queries: [
      { limit: -1, sort: 'name', fields: ['id', 'name'].join(',') },
      { limit: -1 },
    ],
  },
  {
    name: 'global_settings',
    file: 'global_settings.json',
    // /singleton returns 403 for the Public role; fall back to the list endpoint
    // which returns the same single object for this singleton collection.
    path: '/items/global_settings',
    queries: [{}],
    singleton: true,
  },
];

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
async function run() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Exporting to ${OUT_DIR}\n`);

  let failed = 0;
  const fallbackUsed = [];
  const skipped = [];

  for (const cfg of exportsConfig) {
    process.stdout.write(`  → ${cfg.file} … `);

    let lastError = null;
    let usedFallback = false;
    let success = false;
    let data = null;

    for (let i = 0; i < cfg.queries.length; i++) {
      const q = cfg.queries[i];
      try {
        const res = await fetchDirectus(cfg.path, q);
        data = res.data;
        if (i > 0) usedFallback = true;
        success = true;
        break;
      } catch (err) {
        lastError = err;
        if (!String(err.message).startsWith('[403]')) break;
      }
    }

    if (
      !success &&
      lastError &&
      String(lastError.message).startsWith('[403]')
    ) {
      try {
        const q = { ...(cfg.queries[0] || {}) };
        delete q.fields;
        delete q.sort;
        const res = await fetchDirectus(cfg.path, q);
        data = res.data;
        usedFallback = true;
        success = true;
      } catch (err) {
        lastError = err;
      }
    }

    if (success) {
      const outPath = join(OUT_DIR, cfg.file);
      writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
      const count = Array.isArray(data) ? `${data.length} items` : 'singleton';
      console.log(`✓  (${count})${usedFallback ? ' (fallback used)' : ''}`);
      if (usedFallback) fallbackUsed.push(cfg.name);
    } else {
      console.error(`✗  FAILED`);
      console.error(`     ${lastError ? lastError.message : 'Unknown error'}`);
      if (cfg.optional) {
        console.warn(`     WARNING: '${cfg.name}' skipped (optional).`);
        skipped.push(cfg.name);
      } else {
        failed += 1;
      }
    }
  }

  console.log('');

  // Summary
  console.log('Summary:');
  if (fallbackUsed.length > 0)
    console.log(`  - Fallback used for: ${fallbackUsed.join(', ')}`);
  if (skipped.length > 0)
    console.log(`  - Skipped (optional): ${skipped.join(', ')}`);
  if (failed > 0) {
    console.error(
      `Export finished with ${failed} error(s). Review the logs above.`,
    );
    process.exit(1);
  }

  console.log('Export complete.');
}

run();
