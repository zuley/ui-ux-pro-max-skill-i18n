'use client';

import { useEffect } from 'react';

/**
 * Root page: client-side locale redirect.
 * Since middleware is disabled (all pages served statically via Cloudflare Assets),
 * we detect the user's preferred locale here and redirect accordingly.
 */
export default function RootPage() {
  useEffect(() => {
    const lang = navigator.language || navigator.languages?.[0] || 'en';
    const locale = lang.startsWith('zh') ? 'zh'
                 : lang.startsWith('vi') ? 'vi'
                 : 'en';
    window.location.replace(`/${locale}/`);
  }, []);

  return null;
}
