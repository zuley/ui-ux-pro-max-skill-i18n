'use client';

import { useEffect, useState } from 'react';

type ChecklistItem = {
  id: string;
  label: string;
};

export function Checklist({
  storageKey,
  title,
  items
}: {
  storageKey: string;
  title: string;
  items: ChecklistItem[];
}) {
  const key = `checklist:${storageKey}`;
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {}
  }, [checked, key]);

  const doneCount = items.filter((i) => checked[i.id]).length;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="font-heading font-bold text-gray-900 dark:text-white">
          {title}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {doneCount}/{items.length}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-3 rounded-lg border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-black/20 p-3 cursor-pointer"
          >
            <input
              type="checkbox"
              className="mt-1"
              checked={Boolean(checked[item.id])}
              onChange={(e) =>
                setChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))
              }
            />
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
