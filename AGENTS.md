# AGENTS.md

本文件为 AI 代理在此仓库中工作时提供指导。

## 架构

- **双布局策略**：`app/(en)/` 在根路径 `/` 提供英文版（dev 与生产一致）；`app/[locale]/` 只提供 `/zh`、`/vi`、`/ja`、`/hi`。两棵路由树有独立的 layout 和 metadata。
- **不生成 `/en/*`**：`app/[locale]` 树的所有 `generateStaticParams` 必须使用 `i18n/routing.ts` 导出的 `prefixedLocales`（不含 `en`），而不是 `routing.locales`。否则会导出一份与根路径完全重复的 `/en/*` 站点副本——`scripts/postbuild.mjs` 会检测到 `out/en` 并使构建失败。
- **i18n**：使用 `next-intl` v4，`localePrefix: 'as-needed'`。默认语言 `en` 无前缀。支持语言：`en`、`zh`、`vi`、`ja`、`hi`。无 middleware（与 `output: 'export'` 不兼容），语言切换通过链接完成。
- **构建后脚本**（`scripts/postbuild.mjs`）：只做两件事——(1) 防止 `out/en` 重复内容的守卫检查；(2) 为 Next 16 静态导出生成 segment-prefetch 别名文件（修复静态托管下 `<Link>` 预取 404）。升级 Next 后请验证该 hack 是否仍然必要。
- **站点 URL**：所有绝对 URL（metadata、sitemap、RSS、JSON-LD、gallery 链接）统一从 `lib/site-config.ts` 导入（`SITE_URL` / `DEMO_BASE_URL`），不要硬编码域名。
- **404**：由 `app/global-not-found.tsx` 导出 `404.html`（wrangler `not_found_handling = "404-page"`），使用共享的非官方翻译站身份文案。
- **安全响应头**：`public/_headers` 由 Cloudflare Workers Static Assets 提供服务，修改响应头在此文件进行。

## 添加新语言

1. 在 `i18n/routing.ts` 的 `locales` 数组中添加语言代码（`prefixedLocales` 会自动包含它）
2. 创建 `messages/<locale>.json`（从 `en.json` 复制）
3. 更新 `language-switcher.tsx` 中的选项
4. 检查新增语言页面可以通过 `pnpm run build:cf` 静态导出

## 部署

- 目标平台：**Cloudflare Workers Static Assets**
- 包管理器：**pnpm**（唯一锁文件为 `pnpm-lock.yaml`，不要生成 `package-lock.json`）
- 构建：`pnpm run build:cf`（执行 `next build && node scripts/postbuild.mjs`，输出到 `out/`）
- 部署：`pnpm run deploy`（build:cf + `wrangler deploy`，通过 `wrangler.toml` 的 `[assets]` 上传 `out/`）
- `next.config.ts` 必须启用 `output: 'export'`，保持英文根路径 `/`、本地化路径 `/zh`、`/vi`、`/ja`、`/hi` 为静态导出页面。

## 测试与验证

- `pnpm run lint` — ESLint，使用 next/core-web-vitals + typescript 规则
- 未配置单元测试框架；验证基于脚本与构建产物检查

## 代码风格

- Tailwind CSS v4，`darkMode: 'class'`
- 无 Prettier/Biome——仅依赖 ESLint
- 路径别名：`@/*` 映射到项目根目录（`./`）
- 组件放在 `components/`，工具函数放在 `lib/`

## 内容身份与上游同步

- 本站是非官方多语言翻译站，不是技能或 CLI 的作者；“我们”仅指本站翻译与维护。
- 上游发布包基线与目录数量统一维护在 `lib/upstream-content.json`；语言文件使用 `[[styles]]` 等目录 token，由 `resolveCatalogMessages` 解析。
- 来源未核实的学习材料不得标成官方译文；文章出处状态记录在 frontmatter。本站问题与上游问题使用各自的反馈入口。
- 内容修改运行 `pnpm run check:content`、lint 与静态构建，并验证五语言页面。
