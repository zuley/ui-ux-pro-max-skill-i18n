'use client';

export type TocItem = {
  id: string;
  title: string;
};

export function DocsToc({ items, title }: { items: TocItem[]; title: string }) {
  if (items.length === 0) return null;

  return (
    <div className="glass-card p-4">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
        {title}
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md px-2 py-1 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

