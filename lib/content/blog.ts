import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ComponentType } from 'react';
import { routing } from '@/i18n/routing';
import {
  estimateReadingMinutes,
  parsePostFrontmatter,
  stripFrontmatter,
} from './frontmatter';
import { fallbackChain } from './fallback';
import type { Locale, PostSummary, ResolvedPost } from './types';

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');

/**
 * Lists all blog post slugs that exist for any locale. Used by both
 * `generateStaticParams` and the listing page (which then resolves each
 * via `getPost(locale, slug)` to apply locale fallback consistently).
 */
export async function listAllSlugs(): Promise<string[]> {
  const slugs = new Set<string>();
  for (const locale of routing.locales) {
    const dir = path.join(BLOG_ROOT, locale);
    const entries = await safeReaddir(dir);
    for (const entry of entries) {
      if (entry.startsWith('_')) continue; // ignore drafts / scaffolding
      if (!entry.endsWith('.mdx')) continue;
      slugs.add(entry.replace(/\.mdx$/, ''));
    }
  }
  return [...slugs].sort();
}

/**
 * Resolves a single post for the requested locale, falling back to the
 * default locale if the localized file is missing. Returns null when
 * neither variant exists or when the post is a draft.
 */
export async function getPost(
  locale: Locale,
  slug: string,
  options: { includeBody?: boolean } = {}
): Promise<ResolvedPost | null> {
  const chain = fallbackChain(locale);
  for (const sourceLocale of chain) {
    const filePath = path.join(BLOG_ROOT, sourceLocale, `${slug}.mdx`);
    const raw = await safeReadFile(filePath);
    if (!raw) continue;

    const frontmatter = parsePostFrontmatter(raw, filePath);
    if (frontmatter.draft) return null;

    const body = stripFrontmatter(raw);
    const readingMinutes = estimateReadingMinutes(body);

    let Body: ComponentType | undefined;
    if (options.includeBody) {
      Body = await loadBlogBody(sourceLocale, slug);
    }

    return {
      slug,
      locale,
      sourceLocale,
      frontmatter,
      readingMinutes,
      Body,
    };
  }
  return null;
}

/**
 * Returns a metadata-only list of posts available for the given locale,
 * sorted by date desc. Drafts and missing translations are filtered out.
 */
export async function getAllPosts(locale: Locale): Promise<PostSummary[]> {
  const slugs = await listAllSlugs();
  const results: PostSummary[] = [];
  for (const slug of slugs) {
    const post = await getPost(locale, slug, { includeBody: false });
    if (post) results.push(post);
  }
  results.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
  return results;
}

/**
 * Aggregated tag list with post counts, used by the tag filter UI.
 */
export async function getAllTags(
  locale: Locale
): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts(locale);
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.frontmatter.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// ---------------------------------------------------------------------------
// internals
// ---------------------------------------------------------------------------

async function safeReaddir(dir: string): Promise<string[]> {
  try {
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

/**
 * Loads the compiled MDX component for a specific (locale, slug). The
 * template literal is statically constrained to `content/blog/<locale>/<slug>.mdx`
 * so the bundler can generate a context module covering every real file.
 */
async function loadBlogBody(
  sourceLocale: Locale,
  slug: string
): Promise<ComponentType> {
  const mod = await import(
    /* webpackInclude: /\.mdx$/ */
    `@/content/blog/${sourceLocale}/${slug}.mdx`
  );
  return mod.default as ComponentType;
}
