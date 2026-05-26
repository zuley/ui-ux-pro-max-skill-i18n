import type { Metadata } from 'next';
import LocalizedBlogPost, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/[slug]/page';
import { listAllSlugs } from '@/lib/content/blog';

type PageParams = { slug: string };

export async function generateStaticParams() {
  const slugs = await listAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: params.then(({ slug }) => ({ locale: 'en', slug })),
  });
}

export default function EnglishBlogPost({
  params,
}: {
  params: Promise<PageParams>;
}) {
  return (
    <LocalizedBlogPost
      params={params.then(({ slug }) => ({ locale: 'en', slug }))}
    />
  );
}
