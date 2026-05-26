import type { Metadata } from 'next';
import LocalizedStepPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/tutorials/[series]/[step]/page';
import { listAllStepParams } from '@/lib/content/tutorials';

type PageParams = { series: string; step: string };

export async function generateStaticParams() {
  const all = await listAllStepParams();
  return all.map(({ seriesSlug, stepSlug }) => ({
    series: seriesSlug,
    step: stepSlug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: params.then(({ series, step }) => ({
      locale: 'en',
      series,
      step,
    })),
  });
}

export default function EnglishStepPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  return (
    <LocalizedStepPage
      params={params.then(({ series, step }) => ({
        locale: 'en',
        series,
        step,
      }))}
    />
  );
}
