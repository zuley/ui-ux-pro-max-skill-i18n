import { Footer } from '@/components/footer';
import { Gallery } from '@/components/gallery';
import { Navbar } from '@/components/navbar';
import { getGalleryDemos } from '@/lib/gallery';

export function ExamplesPageContent() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0F172A]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 outline-none sm:pt-28">
        <Gallery demos={getGalleryDemos()} pageHeading />
      </main>
      <Footer />
    </div>
  );
}
