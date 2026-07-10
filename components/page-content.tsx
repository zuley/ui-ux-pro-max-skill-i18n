import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Stats } from '@/components/stats';
import { QuickStart } from '@/components/quick-start';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { TechStacks } from '@/components/tech-stacks';
import { Gallery } from '@/components/gallery';
import { Footer } from '@/components/footer';
import { getGalleryDemos } from '@/lib/gallery';

/**
 * Top-level homepage layout. Accepts an optional `latestContent` slot
 * so a server component (which can fetch MDX content at build time)
 * can be rendered between the static marketing sections without
 * turning the entire shell into a server tree.
 *
 * Each child component declares its own `'use client'` where needed,
 * so this wrapper itself is a server component now.
 */
export function PageContent({
  latestContent,
}: {
  latestContent?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Stats />
        <QuickStart />
        <Features />
        <HowItWorks />
        <TechStacks />
        {latestContent}
        <Gallery demos={getGalleryDemos().slice(0, 6)} preview />
      </main>

      <Footer />
    </div>
  );
}
