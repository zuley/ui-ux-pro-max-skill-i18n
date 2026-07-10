/**
 * Renders an Article (or TechArticle) JSON-LD blob inside the page body
 * so crawlers can pick up authored metadata. Kept as plain markup —
 * next/script with `beforeInteractive` only works in root layouts.
 */
export function ArticleJsonLd({
  type = 'Article',
  url,
  title,
  description,
  datePublished,
  dateModified = datePublished,
  authorName,
  authorUrl,
  inLanguage,
  keywords,
  image,
}: {
  type?: 'Article' | 'TechArticle';
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  inLanguage: string;
  keywords?: string[];
  image?: string;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    description,
    datePublished,
    dateModified,
    inLanguage,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'UI UX Pro Max Skill',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ui-ux-pro-max-skill.com/favicon.ico',
      },
    },
  };
  if (keywords && keywords.length > 0) data.keywords = keywords.join(', ');
  if (image) data.image = image;

  // Escape `<` so frontmatter content can never close the <script> tag
  // (e.g. a title containing "</script>") and inject markup.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
