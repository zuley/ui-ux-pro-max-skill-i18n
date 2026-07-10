import type { ComponentType } from 'react';
import type { routing } from '@/i18n/routing';
import type { TocHeading } from './toc';

export type Locale = (typeof routing.locales)[number];

/** Frontmatter shared by blog posts and tutorial steps. */
export type BaseFrontmatter = {
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string; // ISO yyyy-mm-dd; omitted when never revised
  tags: string[];
  author: string; // author id, defaults to "admin"
  cover?: string;
  draft?: boolean;
};

export type PostFrontmatter = BaseFrontmatter;

export type TutorialStepFrontmatter = BaseFrontmatter & {
  /** Sequence index within the series (1-based). */
  step: number;
};

/** A compiled blog post resolved for a specific locale (after fallback). */
export type ResolvedPost = {
  slug: string;
  locale: Locale;
  /** Locale the content was actually loaded from (may differ from `locale`). */
  sourceLocale: Locale;
  frontmatter: PostFrontmatter;
  /** Estimated reading time in minutes (>=1). */
  readingMinutes: number;
  /** h2/h3 outline extracted from the body — only set when includeBody:true. */
  toc?: TocHeading[];
  /** The compiled MDX body — only set on detail pages, omitted in lists. */
  Body?: ComponentType;
};

/** Metadata-only view of a post, suitable for listing pages. */
export type PostSummary = Omit<ResolvedPost, 'Body'>;

/** Static descriptor for a tutorial series, declared in content/tutorials/<slug>/meta.ts. */
export type TutorialSeriesMeta = {
  slug: string;
  /** i18n key in messages/*.json. */
  titleKey: string;
  /** i18n key in messages/*.json. */
  descriptionKey: string;
  /** Ordered list of step file basenames (without .mdx extension). */
  steps: readonly string[];
};

export type ResolvedTutorialStep = {
  seriesSlug: string;
  stepSlug: string;
  /** 1-based position within the series. */
  index: number;
  total: number;
  locale: Locale;
  sourceLocale: Locale;
  frontmatter: TutorialStepFrontmatter;
  readingMinutes: number;
  toc?: TocHeading[];
  prev?: { seriesSlug: string; stepSlug: string };
  next?: { seriesSlug: string; stepSlug: string };
  Body?: ComponentType;
};

export type TutorialStepSummary = Omit<ResolvedTutorialStep, 'Body'>;
