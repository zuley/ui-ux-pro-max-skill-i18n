import Script from 'next/script';
import { adsensePublisherId } from '@/lib/adsense';

/** Load Auto Ads globally after React hydration to avoid DOM races. */
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
