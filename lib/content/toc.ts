import GithubSlugger from 'github-slugger';

export type TocHeading = {
  id: string;
  text: string;
  /** 2 or 3 — we only surface h2/h3 in the TOC. */
  level: 2 | 3;
};

/**
 * Extracts a flat list of h2/h3 headings from MDX source. Slugs are
 * computed with github-slugger to match what `rehype-slug` emits at
 * compile time, so `#id` jump links resolve to the rendered <h2 id=…>.
 *
 * We strip inline-code backticks, bold/italic markers, and any
 * `{#explicit-id}` overrides before slugging; the result is the text
 * the reader sees.
 */
export function extractToc(body: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const rawLine of body.split('\n')) {
    const fence = /^(```|~~~)/.test(rawLine.trim());
    if (fence) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(rawLine);
    if (!m) continue;

    const level = m[1]!.length as 2 | 3;
    const text = m[2]!
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\s*\{#[^}]+\}\s*$/, '')
      .trim();

    if (!text) continue;
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}
