'use client';

import { useEffect, useState } from 'react';

/**
 * Thin progress bar fixed to the top of the viewport, showing how far
 * the visitor has scrolled through the article body. Uses
 * documentElement.scrollHeight so it covers the entire page (header +
 * article + footer); good enough for a long-form read where the
 * article dominates the page height.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const value = max > 0 ? doc.scrollTop / max : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
