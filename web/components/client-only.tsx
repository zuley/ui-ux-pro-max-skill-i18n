'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!hydrated) return null;
  return children;
}

