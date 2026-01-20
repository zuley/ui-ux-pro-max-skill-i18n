import { AlertTriangle, Info } from 'lucide-react';

export function Callout({
  tone = 'info',
  title,
  children
}: {
  tone?: 'info' | 'warning';
  title: string;
  children: React.ReactNode;
}) {
  const Icon = tone === 'warning' ? AlertTriangle : Info;
  const toneClass =
    tone === 'warning'
      ? 'border-orange-200/70 dark:border-orange-400/20 bg-orange-50/80 dark:bg-orange-900/10'
      : 'border-blue-200/70 dark:border-blue-400/20 bg-blue-50/80 dark:bg-blue-900/10';
  const iconClass =
    tone === 'warning' ? 'text-orange-600 dark:text-orange-300' : 'text-blue-600 dark:text-blue-300';

  return (
    <div className={`rounded-xl border ${toneClass} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${iconClass}`} />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

