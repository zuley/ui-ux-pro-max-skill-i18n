import { routing } from '@/i18n/routing';
import type { Locale } from './types';

/**
 * Returns the ordered list of locales to try when resolving content for
 * `requested`. Always falls back to the default locale (en) last so a
 * missing translation still renders something.
 */
export function fallbackChain(requested: Locale): Locale[] {
  const def = routing.defaultLocale as Locale;
  if (requested === def) return [def];
  return [requested, def];
}

/** True if the resolved source locale differs from what was requested. */
export function isFallback(requested: Locale, resolved: Locale): boolean {
  return requested !== resolved;
}
