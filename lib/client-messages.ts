const CLIENT_NAMESPACES = [
  'common',
  'announcement',
  'navbar',
  'hero',
  'quickStart',
  'search',
  'stats',
  'features',
  'howItWorks',
  'techStacks',
  'gallery',
  'footer'
] as const;

/**
 * Only serialize messages read by Client Components. Documentation body copy
 * remains available to server translations without adding ~45 KB of JSON to
 * every hydrated page.
 */
export function pickClientMessages<T>(messages: T): T {
  const all = messages as Record<string, unknown>;
  const docs = all.docs as Record<string, unknown>;
  const selected = Object.fromEntries(
    CLIENT_NAMESPACES.map((namespace) => [namespace, all[namespace]])
  ) as Record<string, unknown>;

  selected.docs = {
    sidebarTitle: docs.sidebarTitle,
    toc: docs.toc,
    nav: docs.nav
  };

  return selected as T;
}
