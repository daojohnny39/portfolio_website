import 'dotenv/config';

import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from 'dotenv';
import { put } from '@vercel/blob';

const projectRoot = process.cwd();
const requestedImagesDir = path.join(projectRoot, 'public', 'images');
const fallbackImagesDir = path.join(projectRoot, 'Images');
const outputPath = path.join(projectRoot, 'scripts', 'blob-urls.json');

config({ path: path.join(projectRoot, '.env.local') });

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error('Missing BLOB_READ_WRITE_TOKEN in environment or .env.local');
}

const imagesDir = (await exists(requestedImagesDir)) ? requestedImagesDir : fallbackImagesDir;

if (imagesDir === fallbackImagesDir) {
  console.warn('public/images not found; using Images instead.');
}

const entries = await readdir(imagesDir, { withFileTypes: true });
const filenames = entries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const blobUrls = {};

for (const [index, filename] of filenames.entries()) {
  const filePath = path.join(imagesDir, filename);
  const fileBuffer = await readFile(filePath);
  const blob = await put(filename, fileBuffer, {
    access: 'public',
    contentType: 'image/png',
  });

  blobUrls[filename] = blob.url;
  console.log(`[${index + 1}/${filenames.length}] Uploading ${filename} → ${blob.url}`);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(blobUrls, null, 2)}\n`);

console.log(`Wrote ${filenames.length} URLs to ${path.relative(projectRoot, outputPath)}`);
