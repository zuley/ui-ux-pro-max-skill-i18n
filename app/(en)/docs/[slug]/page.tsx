import type { Metadata } from 'next';
import LocalizedDocPage, {
  generateMetadata as generateLocalizedMetadata
} from '@/app/[locale]/docs/[slug]/page';
import { docsNav } from '@/content/docs/nav';

type PageParams = { slug: string };

export function generateStaticParams() {
  return docsNav.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: params.then(({ slug }) => ({ locale: 'en', slug }))
  });
}

export default function DocPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  return (
    <LocalizedDocPage
      params={params.then(({ slug }) => ({ locale: 'en', slug }))}
    />
  );
}
