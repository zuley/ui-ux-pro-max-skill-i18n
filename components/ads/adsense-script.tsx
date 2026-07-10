import Script from 'next/script';
import { adsensePublisherId } from '@/lib/adsense';

/** Load Auto Ads only on substantive editorial routes. */
export function AdSenseScript() {
  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
      crossOrigin="anonymous"
    />
  );
}
