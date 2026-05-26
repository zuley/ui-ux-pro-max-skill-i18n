import Link from 'next/link';
import { Clock } from 'lucide-react';
import { blogPostPath } from '@/lib/locale-path';
import { getAuthor } from '@/lib/authors';
import type { PostSummary } from '@/lib/content/types';

/**
 * Compact card used on the blog listing page. Cover image is optional;
 * when omitted, the card collapses gracefully to a text-only summary.
 */
export function PostCard({
  post,
  locale,
  minReadLabel,
}: {
  post: PostSummary;
  locale: string;
  minReadLabel: (n: number) => string;
}) {
  const { frontmatter } = post;
  const author = getAuthor(frontmatter.author);

  return (
    <Link
      href={blogPostPath(locale, post.slug)}
      className="group glass-card p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {frontmatter.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frontmatter.cover}
          alt=""
          className="w-full h-40 object-cover rounded-lg border border-gray-200/70 dark:border-white/10"
        />
      ) : null}

      {frontmatter.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
        {frontmatter.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
        {frontmatter.summary}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{author.name}</span>
        <span className="flex items-center gap-3">
          <span>
            <time dateTime={frontmatter.date}>{frontmatter.date}</time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {minReadLabel(post.readingMinutes)}
          </span>
        </span>
      </div>
    </Link>
  );
}
