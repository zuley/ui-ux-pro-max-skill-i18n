import { GET as LocalizedGet } from '@/app/[locale]/blog/rss.xml/route';

// Required when next.config.ts uses output: 'export'.
export const dynamic = 'force-static';

export async function GET(req: Request) {
  return LocalizedGet(req, {
    params: Promise.resolve({ locale: 'en' }),
  });
}
