'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export type CodeTab = {
  label: string;
  language?: string;
  code: string;
};

export function CodeBlock({
  title,
  tabs,
  code,
  language,
  defaultTab = 0
}: {
  title?: string;
  tabs?: CodeTab[];
  code?: string;
  language?: string;
  defaultTab?: number;
}) {
  const normalizedTabs = useMemo<CodeTab[]>(() => {
    if (tabs && tabs.length > 0) return tabs;
    return [{ label: language ?? 'text', language, code: code ?? '' }];
  }, [code, language, tabs]);

  const [activeTab, setActiveTab] = useState(() =>
    Math.min(Math.max(defaultTab, 0), normalizedTabs.length - 1)
  );
  const [copied, setCopied] = useState(false);

  const current = normalizedTabs[activeTab]!;

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-gray-950 text-gray-100 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
        <div className="min-w-0">
          {title ? (
            <div className="text-xs font-medium text-gray-200 truncate">{title}</div>
          ) : null}
          {normalizedTabs.length > 1 ? (
            <div className="mt-2 flex items-center gap-1">
              {normalizedTabs.map((t, idx) => {
                const active = idx === activeTab;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={[
                      'px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer',
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    ].join(' ')}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={copy}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Copy"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-200" />
          )}
        </button>
      </div>

      <pre className="px-4 py-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}

