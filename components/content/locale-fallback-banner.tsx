import { Info } from 'lucide-react';

/**
 * Banner shown when a piece of content was loaded in a language other
 * than the one the user requested (i.e. a translation is missing and
 * we fell back to the default locale).
 */
export function LocaleFallbackBanner({ message }: { message: string }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200/70 dark:border-amber-400/20 bg-amber-50/80 dark:bg-amber-900/10 p-4">
      <Info className="w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-300" />
      <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
