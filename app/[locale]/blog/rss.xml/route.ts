import { prefixedLocales } from '@/i18n/routing';
import { getAllPosts } from '@/lib/content/blog';
import { getAuthor } from '@/lib/authors';
import type { Locale } from '@/lib/content/types';
import { absoluteSiteUrl } from '@/lib/site-config';

// Required for output: 'export' — without it the route is treated as
// dynamic and the build fails.
export const dynamic = 'force-static';


export async function generateStaticParams() {
  // English RSS is emitted at /blog/rss.xml by app/(en) — skip /en/*.
  return prefixedLocales.map((locale) => ({ locale }));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as Locale);
  const channelLink = absoluteSiteUrl('/blog', locale);
  const pubDate = posts.length > 0
    ? new Date(
        Math.max(...posts.map((post) => Date.parse(post.frontmatter.updated ?? post.frontmatter.date)))
      ).toUTCString()
    : new Date(0).toUTCString();

  const itemsXml = posts
    .map((post) => {
      const url = absoluteSiteUrl(`/blog/${post.slug}`, locale);
      const author = getAuthor(post.frontmatter.author);
      const postDate = new Date(post.frontmatter.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.summary)}</description>
      <pubDate>${postDate}</pubDate>
      <dc:creator>${escapeXml(author.name)}</dc:creator>${post.frontmatter.tags
        .map((tag) => `\n      <category>${escapeXml(tag)}</category>`)
        .join('')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>UI UX Pro Max Skill — Blog</title>
    <link>${channelLink}</link>
    <description>Notes, experiments, and field reports from designing with the UI UX Pro Max Skill.</description>
    <language>${locale}</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${absoluteSiteUrl('/blog/rss.xml', locale)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
