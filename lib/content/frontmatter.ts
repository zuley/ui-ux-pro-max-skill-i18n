import { z } from 'zod';
import matter from 'gray-matter';
import { DEFAULT_AUTHOR_ID, AUTHORS } from '@/lib/authors';
import type { PostFrontmatter, TutorialStepFrontmatter } from './types';

// gray-matter / js-yaml auto-parses unquoted `2026-05-22` into a Date,
// while quoted "2026-05-22" stays a string. Accept both and normalise to
// an ISO yyyy-mm-dd string so the rest of the pipeline only sees strings.
const isoDate = z
  .union([z.string(), z.date()])
  .transform((val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    return val;
  })
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be yyyy-mm-dd'));

const authorIds = Object.keys(AUTHORS) as [string, ...string[]];
const authorEnum = z.enum(authorIds);

const baseSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(280),
  date: isoDate,
  updated: isoDate.optional(),
  tags: z.array(z.string().min(1)).default([]),
  author: authorEnum.default(DEFAULT_AUTHOR_ID),
  cover: z.string().optional(),
  draft: z.boolean().optional(),
});

const postSchema = baseSchema;

const tutorialStepSchema = baseSchema.extend({
  step: z.number().int().positive(),
});

/**
 * Parse and validate raw MDX source. Throws a descriptive error so any
 * invalid frontmatter fails the build instead of shipping broken pages.
 */
export function parsePostFrontmatter(
  raw: string,
  origin: string
): PostFrontmatter {
  const { data } = matter(raw);
  const result = postSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid blog frontmatter in ${origin}: ${formatZodError(result.error)}`
    );
  }
  return result.data;
}

export function parseTutorialStepFrontmatter(
  raw: string,
  origin: string
): TutorialStepFrontmatter {
  const { data } = matter(raw);
  const result = tutorialStepSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid tutorial-step frontmatter in ${origin}: ${formatZodError(result.error)}`
    );
  }
  return result.data;
}

/**
 * Strip frontmatter from raw MDX so the body can be measured (reading
 * time, word count) without YAML noise.
 */
export function stripFrontmatter(raw: string): string {
  return matter(raw).content;
}

function formatZodError(err: z.ZodError): string {
  return err.issues
    .map((i) => `${i.path.join('.') || '<root>'}: ${i.message}`)
    .join('; ');
}

/**
 * Rough reading-time estimate. CJK characters count per-character;
 * latin words are split on whitespace. 280 wpm is a reasonable blend
 * for mixed-language blog content.
 */
// Hiragana / Katakana / CJK Unified Ideographs / fullwidth forms.
const CJK_RE = /[　-ヿ㐀-䶿一-鿿＀-￯]/g;

export function estimateReadingMinutes(body: string): number {
  const cjkChars = (body.match(CJK_RE) || []).length;
  const stripped = body.replace(CJK_RE, ' ');
  const latinWords = stripped.split(/\s+/).filter(Boolean).length;
  const cjkWords = cjkChars / 2.5; // ~2.5 CJK chars per "word"
  const total = latinWords + cjkWords;
  return Math.max(1, Math.round(total / 280));
}
