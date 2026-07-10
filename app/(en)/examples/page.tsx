import type { Metadata } from 'next';
import LocalizedExamplesPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/examples/page';

export function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({ params: Promise.resolve({ locale: 'en' }) });
}

export default function ExamplesPage() {
  return <LocalizedExamplesPage params={Promise.resolve({ locale: 'en' })} />;
}
