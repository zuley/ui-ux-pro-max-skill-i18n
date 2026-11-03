import snapshot from './upstream-content.json';
import { OFFICIAL_PROJECT_URL } from './site-config';

export const UPSTREAM = snapshot;
export const UPSTREAM_SOURCE_URL = `${OFFICIAL_PROJECT_URL}/tree/${UPSTREAM.release}`;
export const UPSTREAM_README_URL = `${OFFICIAL_PROJECT_URL}/blob/${UPSTREAM.release}/README.md`;

/** Resolve catalog tokens before next-intl parses messages, including t.raw arrays. */
export function resolveCatalogMessages<T>(value: T): T {
  function resolve(item: unknown): unknown {
    if (typeof item === 'string') return item.replace(/\[\[([a-zA-Z]+)\]\]/g, (_, key: string) => {
      if (!(key in UPSTREAM.counts)) throw new Error(`Unknown catalog token: ${key}`);
      return String(UPSTREAM.counts[key as keyof typeof UPSTREAM.counts]);
    });
    if (Array.isArray(item)) return item.map(resolve);
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).map(([k, v]) => [k, resolve(v)]));
    return item;
  }
  return resolve(value) as T;
}
