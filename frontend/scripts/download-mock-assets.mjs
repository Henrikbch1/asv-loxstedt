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
