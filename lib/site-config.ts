/**
 * Single source of truth for site-wide URLs. Everything that builds an
 * absolute URL (metadata, sitemap, RSS, JSON-LD, gallery links) must
 * import from here instead of hardcoding the domain.
 */
export const SITE_URL = 'https://ui-ux-pro-max-skill.com';
export const SITE_NAME = 'UI UX Pro Max Skill — Unofficial Translation';
export const SITE_PUBLISHER_NAME = 'Team';
export const OFFICIAL_PROJECT_URL =
  'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill';

/** Stable, generated social-preview assets shared by every route tree. */
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
export const DEFAULT_TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: 'UI UX Pro Max Skill — design intelligence for AI coding assistants',
  type: 'image/png'
};

/**
 * Build a canonical, locale-aware page URL. The production host enforces
 * trailing slashes, so every sitemap/RSS/JSON-LD URL should point directly
 * at the final response instead of a redirecting variant.
 */
export function absoluteSiteUrl(path = '/', locale = 'en'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const localizedPath =
    locale === 'en'
      ? normalizedPath
      : `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
  const finalPath = localizedPath.endsWith('/') ? localizedPath : `${localizedPath}/`;
  return `${SITE_URL}${finalPath}`;
}

/** External host that serves the live gallery demos + thumbnails. */
export const DEMO_BASE_URL = 'https://ui-ux-pro-max-skill.nextlevelbuilder.io';

/** Google Analytics measurement ID, referenced by the analytics scripts. */
export const GA_ID = 'G-Y3KXMDMBC1';

export const GOOGLE_ANALYTICS_INIT_SCRIPT =
  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;

/**
 * Inline script that applies the persisted theme before first paint so
 * there is no light/dark flash. It runs with `beforeInteractive` from the
 * shared root shell and stays centralized so both route trees remain in sync.
 * (Static export has no middleware/nonce, so this stays inline
 * — see the `'unsafe-inline'` note in public/_headers.)
 */
export const THEME_INIT_SCRIPT =
  "(()=>{try{const t=localStorage.getItem('theme');const d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.style.colorScheme='light';}else{d.classList.add('dark');d.style.colorScheme='dark';}}catch{}})();";
