'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { CodeBlock } from '@/components/tutorial/code-block';
import { useTranslations } from 'next-intl';
import { useModalFocus } from '@/lib/use-modal-focus';

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useModalFocus({ open, onClose, containerRef: dialogRef, initialFocusRef: closeButtonRef });

  if (!open) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-dialog-title"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col glass-card p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/70 dark:border-white/10">
          <h2 id="prompt-dialog-title" className="font-heading font-bold text-lg text-gray-900 dark:text-white truncate pr-4">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
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
    </div>,
    document.body
  );
}
