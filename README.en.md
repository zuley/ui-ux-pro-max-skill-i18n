# UI UX Pro Max Skill — Unofficial Multilingual Translation

[简体中文](README.md) · [Website](https://ui-ux-pro-max-skill.com) · [Original project](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

This independent site translates and organizes documentation and learning material about UI UX Pro Max Skill. The original authors maintain the skill, CLI, algorithms and datasets. This site is not affiliated with or endorsed by the original project and does not provide official product support.

## Content and sources

English is served at `/`; Chinese, Vietnamese, Japanese and Hindi at `/zh`, `/vi`, `/ja` and `/hi`. There is no `/en` export.

Documentation targets the published `ui-ux-pro-max-cli@2.15.0` package. Do not advertise features found only on upstream main. `lib/upstream-content.json` records the release, catalog counts and review date. Catalog tokens such as `[[styles]]` in locale messages are resolved when messages load.

Translations require a source URL, original author, source revision and review date. Existing learning articles whose original publication cannot be verified are explicitly marked as unverified, not attributed to the upstream authors. Gallery entries are external references, not a claim of authorship or certified generation results.

See [the update plan](UPDATE_PLAN.md) and [source/verification record](docs/UPSTREAM_AUDIT.md).

## Development

Use Node.js 24 and pnpm 10. Keep `pnpm-lock.yaml` as the only package lockfile.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check:content
pnpm lint
pnpm build:cf
```

If the global pnpm is incompatible, use `npx --yes pnpm@10.27.0 <command>`. Static output is written to `out/`; postbuild rejects duplicate `/en` routes and creates segment-prefetch aliases. `pnpm preview` runs a local Cloudflare preview. `pnpm deploy` builds and publishes; run it only when publication is intended.

## Feedback and attribution

- [Translation, website and source corrections](https://github.com/zuley/ui-ux-pro-max-skill-i18n/issues)
- [Upstream skill / CLI issues](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues)
- Upstream: Next Level Builder, MIT, Copyright (c) 2024 Next Level Builder. [Full license](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/v2.15.0/LICENSE).

Preserve applicable attribution and license notices when using upstream material. Third-party fonts, icons and demo images may have separate terms; this site does not grant rights to them.
