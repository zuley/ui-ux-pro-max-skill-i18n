export function localePath(locale: string, href: string) {
  if (href.startsWith('http')) return href;
  const normalized = href.startsWith('/') ? href : `/${href}`;
  return `/${locale}${normalized}`;
}

export function docPath(locale: string, slug: string) {
  return localePath(locale, ['', 'docs', slug].join('/'));
}
