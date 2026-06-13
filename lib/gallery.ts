import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * A single gallery demo, parsed from `public/gallery.csv` at build time.
 * The CSV is static content, so it is read and parsed once during the
 * static export instead of being fetched + parsed in the browser on
 * every homepage load. This keeps the gallery in the server-rendered
 * HTML (good for SEO and avoids the empty-then-populate layout shift).
 */
export type Demo = {
  id: number;
  order: number;
  name: string;
  category: string;
  imageUrl: string;
  url: string;
  style: string;
  mode: 'light' | 'dark';
  primary_color: string;
  secondary_color: string;
  cta_color: string;
  background_color: string;
  implemented: boolean;
  prompt: string;
};

const CSV_PATH = path.join(process.cwd(), 'public', 'gallery.csv');

let cached: Demo[] | null = null;

/**
 * Reads and parses the gallery CSV. Memoised so repeated calls during
 * the build (one per locale page) don't re-read the file.
 */
export function getGalleryDemos(): Demo[] {
  if (cached) return cached;
  const csv = readFileSync(CSV_PATH, 'utf8');
  cached = parseGalleryCsv(csv);
  return cached;
}

export function parseGalleryCsv(csv: string): Demo[] {
  // Tokenise the whole document so quoted fields may contain commas,
  // escaped quotes ("") and embedded newlines without corrupting rows.
  const rows = parseCsv(csv);
  if (rows.length === 0) return [];

  const header = rows[0];
  const demos: Demo[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 1 && row[0] === '') continue; // skip blank lines
    const record: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) record[header[j]] = row[j] ?? '';
    demos.push({
      id: Number(record.id),
      order: Number(record.order),
      name: record.name,
      category: record.category,
      imageUrl: record.imageUrl,
      url: record.url,
      style: record.style,
      mode: (record.mode || 'light') as 'light' | 'dark',
      primary_color: record.primary_color,
      secondary_color: record.secondary_color,
      cta_color: record.cta_color,
      background_color: record.background_color,
      implemented: record.implemented === 'true',
      prompt: record.prompt,
    });
  }
  return demos.sort((a, b) => a.order - b.order || a.id - b.id);
}

/**
 * Minimal RFC-4180-ish CSV reader: handles quoted fields, escaped
 * quotes, embedded newlines, and both LF / CRLF line endings.
 */
function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      // Close the current row on LF, swallowing a following LF for CRLF.
      if (ch === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      field = '';
      row = [];
    } else {
      field += ch;
    }
  }

  // Flush the trailing field/row if the file didn't end with a newline.
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
