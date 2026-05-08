'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Stats } from '@/components/stats';
import { QuickStart } from '@/components/quick-start';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { TechStacks } from '@/components/tech-stacks';
import { Gallery } from '@/components/gallery';
import { Footer } from '@/components/footer';

export function PageContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <QuickStart />
        <Features />
        <HowItWorks />
        <TechStacks />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
}
