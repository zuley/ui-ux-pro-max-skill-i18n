import type { Metadata } from 'next';
import LocalizedSeriesPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/tutorials/[series]/page';
import { listSeries } from '@/lib/content/tutorials';

type PageParams = { series: string };

export async function generateStaticParams() {
  const series = await listSeries();
  return series.map((s) => ({ series: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: params.then(({ series }) => ({ locale: 'en', series })),
  });
}

export default function EnglishSeriesPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  return (
    <LocalizedSeriesPage
      params={params.then(({ series }) => ({ locale: 'en', series }))}
    />
  );
}
