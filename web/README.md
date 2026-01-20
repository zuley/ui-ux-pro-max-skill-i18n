# OpenNext Multi-language App

A modern Next.js application with multi-language support and smooth theme switching, optimized for Cloudflare Workers deployment.

## Features

- ✨ **Circular Theme Transition**: Smooth dark/light mode switching with circular expansion animation
- 🌍 **Multi-language Support**: English, Chinese (Simplified), and Vietnamese
- ⚡ **Edge Optimized**: Built for Cloudflare Workers deployment
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- ♿ **Accessible**: Respects `prefers-reduced-motion` and keyboard navigation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Animations**: Framer Motion + View Transitions API
- **Deployment**: Cloudflare Workers (via Wrangler)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

## Deployment to Cloudflare Workers

### Prerequisites

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

### Deploy

```bash
npm run deploy
```

This will:
1. Build the Next.js app
2. Deploy the static files to Cloudflare Pages

### Preview Locally

```bash
npm run preview
```

## Project Structure

```
web/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Root layout with providers
│   │   └── page.tsx       # Home page
│   └── globals.css        # Global styles + theme variables
├── components/
│   ├── theme-toggle.tsx   # Theme switcher button
│   └── language-switcher.tsx  # Language dropdown
├── i18n/
│   ├── routing.ts         # Locale routing config
│   └── request.ts         # Server-side i18n config
├── lib/
│   └── theme-context.tsx  # Theme provider with circular transition
├── messages/
│   ├── en.json           # English translations
│   ├── zh.json           # Chinese translations
│   └── vi.json           # Vietnamese translations
├── middleware.ts         # Next.js middleware for i18n
├── next.config.ts        # Next.js config (static export)
└── wrangler.toml         # Cloudflare Workers config
```

## Theme Switching

The app uses the View Transitions API for smooth circular expansion when switching themes. The animation:

- Starts from the click position
- Expands in a circular pattern
- Respects `prefers-reduced-motion`
- Falls back gracefully on unsupported browsers

## Internationalization

Supported languages:
- 🇺🇸 English (`en`)
- 🇨🇳 Chinese (`zh`)
- 🇻🇳 Vietnamese (`vi`)

Add new languages by:
1. Adding locale to `i18n/routing.ts`
2. Creating `messages/{locale}.json`
3. Adding flag to `components/language-switcher.tsx`

## Configuration

### Theme Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-secondary: #3B82F6;
  --color-cta: #F97316;
  --color-background: #F8FAFC;
  --color-text: #1E293B;
}
```

### Locales

Edit `i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en', 'zh', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Default locale accessible without prefix
});
```

**Note**: After building, a post-build script automatically copies the default locale (English) to the root directory, making it accessible from both `/` and `/en`.

## License

MIT
