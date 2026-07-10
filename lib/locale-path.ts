export function localePath(locale: string, href: string) {
  if (href.startsWith('http')) return href;
  const normalized = href.startsWith('/') ? href : `/${href}`;
  if (locale === 'en') return normalized;
  return `/${locale}${normalized}`;
}

export function docPath(locale: string, slug: string) {
  return localePath(locale, ['', 'docs', slug].join('/'));
}

export function blogIndexPath(locale: string) {
  return localePath(locale, '/blog');
}

export function blogPostPath(locale: string, slug: string) {
  return localePath(locale, ['', 'blog', slug].join('/'));
}

export function tutorialsIndexPath(locale: string) {
  return localePath(locale, '/tutorials');
}

export function examplesPath(locale: string) {
  return localePath(locale, '/examples');
}

export function tutorialSeriesPath(locale: string, seriesSlug: string) {
  return localePath(locale, ['', 'tutorials', seriesSlug].join('/'));
}

export function tutorialStepPath(
  locale: string,
  seriesSlug: string,
  stepSlug: string
) {
  return localePath(locale, ['', 'tutorials', seriesSlug, stepSlug].join('/'));
}
