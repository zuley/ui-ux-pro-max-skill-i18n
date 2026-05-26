'use client';

import { createContext, useContext } from 'react';
import type { SearchIndexItem } from '@/lib/search-index';

const SearchIndexContext = createContext<SearchIndexItem[]>([]);

/**
 * Client-side wrapper exposing the build-time search index to any
 * descendant. Layouts call `buildSearchIndex(locale)` server-side and
 * pass the result in as `value`.
 */
export function SearchIndexProvider({
  value,
  children,
}: {
  value: SearchIndexItem[];
  children: React.ReactNode;
}) {
  return (
    <SearchIndexContext.Provider value={value}>
      {children}
    </SearchIndexContext.Provider>
  );
}

export function useSearchIndex(): SearchIndexItem[] {
  return useContext(SearchIndexContext);
}
