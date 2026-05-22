import type { Metadata } from 'next';
import LocalizedBlogIndex, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/page';

export function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: 'en' }),
  });
}

export default function EnglishBlogIndex() {
  return (
    <LocalizedBlogIndex
      params={Promise.resolve({ locale: 'en' })}
    />
  );
}
