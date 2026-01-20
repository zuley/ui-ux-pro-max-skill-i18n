export type DocSlug =
  | 'getting-started'
  | 'design-system-generator'
  | 'cli-reference'
  | 'examples'
  | 'faq';

export type DocsNavItem = {
  slug: DocSlug;
  titleKey: string;
  descriptionKey: string;
};

export const docsNav: DocsNavItem[] = [
  {
    slug: 'getting-started',
    titleKey: 'docs.nav.gettingStarted.title',
    descriptionKey: 'docs.nav.gettingStarted.description'
  },
  {
    slug: 'design-system-generator',
    titleKey: 'docs.nav.designSystemGenerator.title',
    descriptionKey: 'docs.nav.designSystemGenerator.description'
  },
  {
    slug: 'cli-reference',
    titleKey: 'docs.nav.cliReference.title',
    descriptionKey: 'docs.nav.cliReference.description'
  },
  {
    slug: 'examples',
    titleKey: 'docs.nav.examples.title',
    descriptionKey: 'docs.nav.examples.description'
  },
  {
    slug: 'faq',
    titleKey: 'docs.nav.faq.title',
    descriptionKey: 'docs.nav.faq.description'
  }
];

