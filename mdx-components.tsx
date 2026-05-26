import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Callout } from '@/components/tutorial/callout';
import { Checklist } from '@/components/tutorial/checklist';
import { CodeBlock } from '@/components/tutorial/code-block';

/**
 * Global MDX component map. Picked up automatically by @next/mdx for any
 * .mdx file compiled in the project (including content/blog/** and
 * content/tutorials/**).
 *
 * We intentionally keep prose styling minimal here — the actual article
 * shell (max-width, vertical rhythm, dark mode) is applied by the page
 * layout wrapping the MDX body, so these defaults focus on element-level
 * typography and component overrides.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings — anchors are added later via rehype-slug (PR2).
    h1: ({ children, ...props }) => (
      <h1
        className="mt-12 mb-5 text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      // Generous top margin gives chapters room to breathe; the small
      // indigo bar to the left of the text acts as an anchor cue
      // without resorting to numbered prefixes.
      <h2
        className="group mt-16 mb-5 text-2xl sm:text-[28px] font-heading font-bold text-gray-900 dark:text-white tracking-tight scroll-mt-28 relative pl-4 -ml-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full before:bg-indigo-400/70 dark:before:bg-indigo-300/60"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-10 mb-3 text-xl font-heading font-semibold text-gray-900 dark:text-white scroll-mt-28"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mt-8 mb-2 text-lg font-heading font-semibold text-gray-900 dark:text-white scroll-mt-28"
        {...props}
      >
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      // 17px / 1.75 leading is the long-form reading optimum for this
      // body font (DM Sans). text-gray-800 (not 700) holds enough
      // contrast on light backgrounds without hitting pure black.
      <p
        className="my-6 text-[17px] leading-[1.75] text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </p>
    ),

    a: ({ href = '#', children, ...props }) => {
      const isExternal = /^https?:\/\//i.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-500"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-500"
        >
          {children}
        </Link>
      );
    },

    ul: ({ children, ...props }) => (
      <ul
        className="my-6 list-disc pl-6 space-y-2 text-[17px] text-gray-800 dark:text-gray-200 marker:text-gray-400 dark:marker:text-gray-500"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-6 list-decimal pl-6 space-y-2 text-[17px] text-gray-800 dark:text-gray-200 marker:text-gray-400 dark:marker:text-gray-500"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-[1.75] pl-1" {...props}>
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      // Thinner border, bigger type, no italic (CJK reads worse italicised).
      // Reads as "the author wants to say one thing", not as decoration.
      <blockquote
        className="my-8 border-l-2 border-gray-900 dark:border-white pl-5 text-lg leading-[1.7] text-gray-900 dark:text-white font-medium"
        {...props}
      >
        {children}
      </blockquote>
    ),

    hr: () => (
      // Centered short rule reads as "section break" rather than the
      // default full-width divider which competes with the article frame.
      <hr className="my-12 mx-auto w-16 border-0 h-px bg-gray-300 dark:bg-white/15" />
    ),

    // Inline + block code. The CodeBlock component handles its own styling,
    // so we keep these simple — MDX `code` for inline only. Tinted indigo
    // to stay in the same colour family as links / accent UI.
    code: ({ children, ...props }) => (
      <code
        className="rounded-md bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 text-[0.875em] font-mono text-indigo-700 dark:text-indigo-200 ring-1 ring-indigo-100 dark:ring-indigo-400/10"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="my-8 overflow-x-auto rounded-xl ring-1 ring-white/5 bg-[#0E1116] text-gray-100 p-5 text-[13.5px] leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),

    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-gray-200/70 dark:border-white/10">
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50 dark:bg-white/5" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-3 py-2 text-left font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-3 py-2 border-t border-gray-200/70 dark:border-white/10 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </td>
    ),

    img: ({ src = '', alt = '', ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src as string}
        alt={alt as string}
        className="my-6 rounded-xl border border-gray-200/70 dark:border-white/10"
        {...props}
      />
    ),

    // Custom components usable directly inside MDX.
    Callout,
    Checklist,
    CodeBlock,

    ...components,
  };
}
