import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ComponentType } from 'react';
import {
  estimateReadingMinutes,
  parseTutorialStepFrontmatter,
  stripFrontmatter,
} from './frontmatter';
import { fallbackChain } from './fallback';
import { extractToc } from './toc';
import type {
  Locale,
  ResolvedTutorialStep,
  TutorialSeriesMeta,
  TutorialStepSummary,
} from './types';

const TUTORIALS_ROOT = path.join(process.cwd(), 'content', 'tutorials');

/**
 * Loads every series defined under content/tutorials/<slug>/meta.ts in
 * a single pass. Series order is determined by directory name; within a
 * series, step order is determined by `meta.steps`.
 */
export async function listSeries(): Promise<TutorialSeriesMeta[]> {
  const dirs = await safeReaddir(TUTORIALS_ROOT, { withFileTypes: true });
  const series: TutorialSeriesMeta[] = [];
  for (const entry of dirs) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_')) continue;
    const meta = await loadSeriesMeta(entry.name);
    if (meta) series.push(meta);
  }
  return series.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Returns all (series, step) pairs for `generateStaticParams`. Every
 * step is always emitted under every locale — locale fallback is applied
 * when the actual page renders.
 */
export async function listAllStepParams(): Promise<
  { seriesSlug: string; stepSlug: string }[]
> {
  const series = await listSeries();
  return series.flatMap((s) =>
    s.steps.map((stepSlug) => ({ seriesSlug: s.slug, stepSlug }))
  );
}

export async function getStep(
  locale: Locale,
  seriesSlug: string,
  stepSlug: string,
  options: { includeBody?: boolean } = {}
): Promise<ResolvedTutorialStep | null> {
  const meta = await loadSeriesMeta(seriesSlug);
  if (!meta) return null;

  const index = meta.steps.indexOf(stepSlug);
  if (index === -1) return null;

  const chain = fallbackChain(locale);
  for (const sourceLocale of chain) {
    const filePath = path.join(
      TUTORIALS_ROOT,
      seriesSlug,
      sourceLocale,
      `${stepSlug}.mdx`
    );
    const raw = await safeReadFile(filePath);
    if (!raw) continue;

    const frontmatter = parseTutorialStepFrontmatter(raw, filePath);
    if (frontmatter.draft) return null;

    const body = stripFrontmatter(raw);
    const readingMinutes = estimateReadingMinutes(body);

    let Body: ComponentType | undefined;
    let toc: ResolvedTutorialStep['toc'];
    if (options.includeBody) {
      Body = await loadStepBody(seriesSlug, sourceLocale, stepSlug);
      toc = extractToc(body);
    }

    return {
      seriesSlug,
      stepSlug,
      index: index + 1,
      total: meta.steps.length,
      locale,
      sourceLocale,
      frontmatter,
      readingMinutes,
      toc,
      prev:
        index > 0
          ? { seriesSlug, stepSlug: meta.steps[index - 1]! }
          : undefined,
      next:
        index < meta.steps.length - 1
          ? { seriesSlug, stepSlug: meta.steps[index + 1]! }
          : undefined,
      Body,
    };
  }
  return null;
}

/**
 * Returns metadata for every step of a series, in declared order. Used
 * by the series landing page (table of contents) and the sidebar.
 */
export async function getSeriesSteps(
  locale: Locale,
  seriesSlug: string
): Promise<TutorialStepSummary[]> {
  const meta = await loadSeriesMeta(seriesSlug);
  if (!meta) return [];
  const results: TutorialStepSummary[] = [];
  for (const stepSlug of meta.steps) {
    const step = await getStep(locale, seriesSlug, stepSlug, {
      includeBody: false,
    });
    if (step) results.push(step);
  }
  return results;
}

// ---------------------------------------------------------------------------
// internals
// ---------------------------------------------------------------------------

const seriesMetaCache = new Map<string, TutorialSeriesMeta | null>();

async function loadSeriesMeta(
  seriesSlug: string
): Promise<TutorialSeriesMeta | null> {
  if (seriesMetaCache.has(seriesSlug)) {
    return seriesMetaCache.get(seriesSlug) ?? null;
  }
  try {
    const mod = await import(`@/content/tutorials/${seriesSlug}/meta`);
    const meta = (mod.default ?? mod.meta) as TutorialSeriesMeta;
    seriesMetaCache.set(seriesSlug, meta);
    return meta;
  } catch {
    seriesMetaCache.set(seriesSlug, null);
    return null;
  }
}

async function safeReaddir(
  dir: string,
  opts?: { withFileTypes?: false }
): Promise<string[]>;
async function safeReaddir(
  dir: string,
  opts: { withFileTypes: true }
): Promise<import('node:fs').Dirent[]>;
async function safeReaddir(
  dir: string,
  opts?: { withFileTypes?: boolean }
): Promise<string[] | import('node:fs').Dirent[]> {
  try {
    if (opts?.withFileTypes) {
      return await fs.readdir(dir, { withFileTypes: true });
    }
    return await fs.readdir(dir);
  } catch (err) {
    if (isMissing(err)) return [];
    throw err;
  }
}

async function safeReadFile(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, 'utf8');
  } catch (err) {
    if (isMissing(err)) return null;
    throw err;
  }
}

function isMissing(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: string }).code === 'ENOENT'
  );
}

async function loadStepBody(
  seriesSlug: string,
  sourceLocale: Locale,
  stepSlug: string
): Promise<ComponentType> {
  const mod = await import(
    /* webpackInclude: /\.mdx$/ */
    `@/content/tutorials/${seriesSlug}/${sourceLocale}/${stepSlug}.mdx`
  );
  return mod.default as ComponentType;
}
