/**
 * Single source of truth for site-wide URLs. Everything that builds an
 * absolute URL (metadata, sitemap, RSS, JSON-LD, gallery links) must
 * import from here instead of hardcoding the domain.
 */
export const SITE_URL = 'https://ui-ux-pro-max-skill.com';

/** External host that serves the live gallery demos + thumbnails. */
export const DEMO_BASE_URL = 'https://ui-ux-pro-max-skill.nextlevelbuilder.io';

/** Google Analytics measurement ID, referenced by the analytics scripts. */
export const GA_ID = 'G-Y3KXMDMBC1';

/**
 * Inline script that applies the persisted theme before first paint so
 * there is no light/dark flash. Runs with `beforeInteractive` from the
 * shared root shell; kept as a single source so both route trees stay
 * in sync. (Static export has no middleware/nonce, so this stays inline
 * — see the `'unsafe-inline'` note in public/_headers.)
 */
export const THEME_INIT_SCRIPT =
  "(()=>{try{const t=localStorage.getItem('theme');const d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.style.colorScheme='light';}else{d.classList.add('dark');d.style.colorScheme='dark';}}catch{}})();";
