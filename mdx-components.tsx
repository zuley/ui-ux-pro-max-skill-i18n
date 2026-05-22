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
        className="mt-10 mb-4 text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white tracking-tight"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-10 mb-3 text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white tracking-tight"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 mb-2 text-xl font-heading font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mt-6 mb-2 text-lg font-heading font-semibold text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      <p
        className="my-4 leading-7 text-gray-700 dark:text-gray-300"
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
        className="my-4 list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-4 list-decimal pl-6 space-y-1.5 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-indigo-300 dark:border-indigo-500/40 pl-4 italic text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),

    hr: () => (
      <hr className="my-10 border-t border-gray-200 dark:border-white/10" />
    ),

    // Inline + block code. The CodeBlock component handles its own styling,
    // so we keep these simple — MDX `code` for inline only.
    code: ({ children, ...props }) => (
      <code
        className="rounded-md bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-[0.9em] font-mono text-pink-700 dark:text-pink-300"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl border border-gray-200/70 dark:border-white/10 bg-gray-950 text-gray-100 p-4 text-sm leading-relaxed"
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
