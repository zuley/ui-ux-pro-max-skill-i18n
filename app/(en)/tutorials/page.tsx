import type { Metadata } from 'next';
import LocalizedTutorialsIndex, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/tutorials/page';

export function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: 'en' }),
  });
}

export default function EnglishTutorialsIndex() {
  return (
    <LocalizedTutorialsIndex
      params={Promise.resolve({ locale: 'en' })}
    />
  );
}
