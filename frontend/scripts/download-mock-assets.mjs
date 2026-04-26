#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = new URL('../../', import.meta.url).pathname.replace(/\\/g, '/');
const MOCK_DIR = path.join(ROOT, 'public', 'mock-cms');
const OUT_DIR = path.join(ROOT, 'public', 'mock-assets');
const MAP_FILE = path.join(OUT_DIR, 'asset-map.json');

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || '';

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/ig;

async function readJsonFiles(dir) {
  const names = await fs.readdir(dir);
  return Promise.all(
    names.filter(n => n.endsWith('.json')).map(async n => ({ name: n, content: JSON.parse(await fs.readFile(path.join(dir, n), 'utf8')) }))
  );
}

function collectUuids(obj) {
  const ids = new Set();
  const walk = v => {
    if (!v) return;
    if (typeof v === 'string') {
      let m;
      while ((m = uuidRegex.exec(v)) !== null) ids.add(m[0]);
      return;
    }
    if (Array.isArray(v)) return v.forEach(walk);
    if (typeof v === 'object') return Object.values(v).forEach(walk);
  };
  walk(obj);
  return ids;
}

async function ensureOutDir() {
  try {
    await fs.mkdir(OUT_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

async function fetchJson(url) {
  const headers = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch failed ${url} -> ${res.status}`);
  return res.json();
}

async function downloadBinary(url, dest) {
  const headers = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Download failed ${url} -> ${res.status}`);
  const buffer = await res.arrayBuffer();
  await fs.writeFile(dest, Buffer.from(buffer));
}

function filenameFromMeta(meta, id) {
  if (!meta) return id;
  return meta.filename_download || meta.title || meta.filename || id;
}

async function main() {
  console.log('Reading mock JSON files from', MOCK_DIR);
  const files = await readJsonFiles(MOCK_DIR);
  const allIds = new Set();
  for (const f of files) {
    const ids = collectUuids(f.content);
    ids.forEach(i => allIds.add(i));
  }

  if (allIds.size === 0) {
    console.log('No UUID-like asset IDs found in mock JSON files.');
    return;
  }

  console.log(`Found ${allIds.size} unique IDs. Preparing to fetch from Directus at ${DIRECTUS_URL}`);
  await ensureOutDir();

  const map = {};
  const ids = Array.from(allIds);
  const concurrency = 4;

  for (let i = 0; i < ids.length; i += concurrency) {
    const batch = ids.slice(i, i + concurrency);
    await Promise.all(batch.map(async id => {
      try {
        const metaUrl = `${DIRECTUS_URL.replace(/\/$/, '')}/files/${id}`;
        const meta = await fetchJson(metaUrl).catch(() => null);
        const filename = filenameFromMeta(meta?.data || meta, id);
        const ext = path.extname(filename) || '';
        const outName = `${id}${ext}`;
        const outPath = path.join(OUT_DIR, outName);
        const assetUrl = `${DIRECTUS_URL.replace(/\/$/, '')}/assets/${id}?download=true`;
        await downloadBinary(assetUrl, outPath);
        map[id] = { file: outName, source: assetUrl, meta: meta?.data || meta || null };
        console.log('Downloaded', id, '->', outName);
      } catch (err) {
        console.warn('Failed to download', id, err.message);
        map[id] = { error: err.message };
      }
    }));
  }

  await fs.writeFile(MAP_FILE, JSON.stringify(map, null, 2), 'utf8');
  console.log('Wrote asset map to', MAP_FILE);
}

main().catch(err => { console.error(err); process.exit(1); });
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const mockCmsDir = path.resolve(projectRoot, 'public', 'mock-cms');
const outDir = path.resolve(projectRoot, 'public', 'mock-assets');
const assetMapPath = path.resolve(outDir, 'asset-map.json');

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.API_URL;
const DIRECTUS_TOKEN =
  process.env.DIRECTUS_TOKEN || process.env.API_TOKEN || process.env.TOKEN;

if (!DIRECTUS_URL) {
  console.error('Missing DIRECTUS_URL (set env var DIRECTUS_URL)');
  process.exit(1);
}

const uuidRe =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function collectUUIDs(value, set) {
  if (value == null) return;
  if (Array.isArray(value)) {
    for (const v of value) collectUUIDs(v, set);
    return;
  }
  if (typeof value === 'object') {
    for (const k of Object.keys(value)) collectUUIDs(value[k], set);
    return;
  }
  if (typeof value === 'string' && uuidRe.test(value)) set.add(value);
}

async function readMockFiles() {
  const entries = await fs.readdir(mockCmsDir, { withFileTypes: true });
  const uuids = new Set();
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.json')) continue;
    const filePath = path.join(mockCmsDir, e.name);
    try {
      const txt = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(txt);
      collectUUIDs(data, uuids);
    } catch (err) {
      console.warn('Failed to parse', filePath, err.message);
    }
  }
  return Array.from(uuids);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function chooseExtFromContentType(ct) {
  if (!ct) return '';
  if (ct.includes('jpeg')) return '.jpg';
  if (ct.includes('png')) return '.png';
  if (ct.includes('avif')) return '.avif';
  if (ct.includes('webp')) return '.webp';
  if (ct.includes('svg')) return '.svg';
  if (ct.includes('gif')) return '.gif';
  return '';
}

async function fetchJson(url) {
  const headers = {};
  if (DIRECTUS_TOKEN) headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok)
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function downloadAsset(id, targetDir) {
  const base = DIRECTUS_URL.replace(/\/$/, '');
  const metaUrl = `${base}/files/${id}`;
  let meta = null;
  try {
    meta = await fetchJson(metaUrl);
  } catch (err) {
    console.warn('Failed to fetch metadata for', id, err.message);
  }

  const downloadUrl = `${base}/assets/${id}?download=true`;
  const headers = {};
  if (DIRECTUS_TOKEN) headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  const res = await fetch(downloadUrl, { headers });
  if (!res.ok)
    throw new Error(`Download failed ${res.status} ${res.statusText}`);

  const contentType = res.headers.get('content-type') || '';
  let filename = null;
  if (meta && meta.data) {
    filename =
      meta.data.filename_download ||
      meta.data.filename ||
      meta.data.title ||
      null;
  }
  const ext =
    path.extname(filename || '') || chooseExtFromContentType(contentType) || '';
  if (!filename) filename = `${id}${ext}`;
  // sanitize filename
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

  let outPath = path.join(targetDir, filename);
  // avoid overwriting: if exists, append counter
  let counter = 1;
  while (true) {
    try {
      await fs.access(outPath);
      const name = path.basename(filename, ext);
      const newName = `${name}-${counter}${ext}`;
      outPath = path.join(targetDir, newName);
      counter += 1;
    } catch {
      break;
    }
  }

  const buffer = await res.arrayBuffer();
  await fs.writeFile(outPath, Buffer.from(buffer));

  return {
    id,
    filename: path.basename(outPath),
    path: path.relative(projectRoot, outPath).replace(/\\/g, '/'),
    metadata: meta && meta.data ? meta.data : null,
    contentType,
    size: buffer.byteLength,
  };
}

async function main() {
  console.log('Reading mock JSON files from', mockCmsDir);
  const ids = await readMockFiles();
  if (ids.length === 0) {
    console.log('No asset IDs found in mock JSON files.');
    return;
  }
  console.log(`Found ${ids.length} unique asset id(s).`);

  await ensureDir(outDir);

  const map = {};
  for (const id of ids) {
    try {
      process.stdout.write(`Downloading ${id} ... `);
      const info = await downloadAsset(id, outDir);
      map[id] = info;
      console.log('ok ->', info.filename);
    } catch (err) {
      console.log('failed:', err.message);
      map[id] = { error: err.message };
    }
  }

  await fs.writeFile(assetMapPath, JSON.stringify(map, null, 2), 'utf8');
  console.log('Wrote asset map to', assetMapPath);
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
