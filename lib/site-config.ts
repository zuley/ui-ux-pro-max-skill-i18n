/**
 * Single source of truth for site-wide URLs. Everything that builds an
 * absolute URL (metadata, sitemap, RSS, JSON-LD, gallery links) must
 * import from here instead of hardcoding the domain.
 */
export const SITE_URL = 'https://ui-ux-pro-max-skill.com';

/** External host that serves the live gallery demos + thumbnails. */
export const DEMO_BASE_URL = 'https://ui-ux-pro-max-skill.nextlevelbuilder.io';
