'use client';

import { BookOpen, Home, Images, SearchX } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import { notoSansDevanagari } from '@/lib/fonts';

const copy = {
  en: {
    eyebrow: 'Page not found',
    title: 'This route wandered off the design system.',
    description: 'The page may have moved, or the address may be incomplete. Choose a reliable path below.',
    home: 'Back home',
    docs: 'Open docs',
    examples: 'Browse examples'
  },
  zh: {
    eyebrow: '页面不存在',
    title: '这个页面暂时不在设计系统里。',
    description: '页面可能已移动，或者地址不完整。你可以从下面的入口继续访问。',
    home: '返回首页',
    docs: '查看文档',
    examples: '浏览示例'
  },
  vi: {
    eyebrow: 'Không tìm thấy trang',
    title: 'Trang này đã đi lạc khỏi design system.',
    description: 'Trang có thể đã được di chuyển hoặc địa chỉ chưa đầy đủ. Hãy chọn một lối đi bên dưới.',
    home: 'Về trang chủ',
    docs: 'Mở tài liệu',
    examples: 'Xem ví dụ'
  },
  ja: {
    eyebrow: 'ページが見つかりません',
    title: 'このページはデザインシステムから外れたようです。',
    description: 'ページが移動したか、URL が不完全な可能性があります。以下から移動してください。',
    home: 'ホームへ戻る',
    docs: 'ドキュメントを見る',
    examples: '事例を見る'
  },
  hi: {
    eyebrow: 'पृष्ठ नहीं मिला',
    title: 'यह रास्ता डिज़ाइन सिस्टम से भटक गया है।',
    description: 'यह पृष्ठ शायद स्थानांतरित हो गया है या पता अधूरा है। नीचे कोई भरोसेमंद रास्ता चुनें।',
    home: 'होम पर जाएँ',
    docs: 'दस्तावेज़ खोलें',
    examples: 'उदाहरण देखें'
  }
} as const;

type NotFoundLocale = keyof typeof copy;

function localeFromPathname(pathname: string): NotFoundLocale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment === 'zh' || segment === 'vi' || segment === 'ja' || segment === 'hi' ? segment : 'en';
}

function subscribeToPathname() {
  return () => {};
}

export function GlobalNotFoundContent() {
  const locale = useSyncExternalStore<NotFoundLocale>(
    subscribeToPathname,
    () => localeFromPathname(window.location.pathname),
    () => 'en'
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `404 | UI UX Pro Max Skill`;
  }, [locale]);

  const t = copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <main
      id="main-content"
      lang={locale}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F172A] px-4 py-16 text-white ${locale === 'hi' ? notoSansDevanagari.className : ''}`}
    >
      <div className="absolute inset-0 aurora-bg opacity-100" />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-800/80 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          404 · {t.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
          {t.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a href={`${prefix}/`} className="btn-primary min-h-11 inline-flex items-center justify-center gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            {t.home}
          </a>
          <a href={`${prefix}/docs/getting-started/`} className="btn-secondary min-h-11 inline-flex items-center justify-center gap-2">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {t.docs}
          </a>
          <a href={`${prefix}/examples/`} className="btn-secondary min-h-11 inline-flex items-center justify-center gap-2">
            <Images className="h-4 w-4" aria-hidden="true" />
            {t.examples}
          </a>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-gray-400">
          UI UX Pro Max Skill
        </div>
      </div>
    </main>
  );
}
