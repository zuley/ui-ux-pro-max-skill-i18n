import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withMDX = createMDX({
  // We render MDX content through compiled .mdx files imported from
  // content/. Page-level .mdx files are not used as routes, but we still
  // register the extension so the loader picks them up.
  extension: /\.mdx?$/,
  options: {
    // Turbopack requires plugin options to be JSON-serialisable, so
    // we pass plugin **names** as strings instead of imported function
    // references; the loader resolves them from node_modules.
    remarkPlugins: [
      // Strip the `---` YAML block from the rendered body. Without this,
      // Markdown parses the second `---` as a setext h2 underline and
      // renders the frontmatter as a giant heading in the article.
      ['remark-frontmatter', ['yaml']],
      // GFM tables, strikethrough, task lists, autolinks.
      ['remark-gfm'],
    ],
  },
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withNextIntl(withMDX(nextConfig));
