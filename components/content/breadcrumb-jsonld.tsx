/**
 * Renders a BreadcrumbList JSON-LD blob so Google can display breadcrumb
 * rich results in SERPs.  Accepts an array of { name, url } items and
 * renders them in order.  The last item is treated as the current page
 * (no link needed in the schema, but we still include @id for clarity).
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
