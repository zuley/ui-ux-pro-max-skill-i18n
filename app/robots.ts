import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Required when next.config.ts uses output: 'export'. Without it, the
// route handler is treated as dynamic and the build fails.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
