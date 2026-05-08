'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CodeBlock } from '@/components/tutorial/code-block';
import { useTranslations } from 'next-intl';

export function PromptModal({
  open,
  onClose,
  title,
  content
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  const t = useTranslations('gallery');
  
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity"
        aria-label={t('closeModal')}
      />

      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col glass-card p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/70 dark:border-white/10">
          <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={t('closeModal')}
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50/50 dark:bg-black/20">
          <CodeBlock
            title={t('promptTitle')}
            language="text"
            code={content}
          />
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200/70 dark:border-white/10 bg-white/50 dark:bg-black/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
