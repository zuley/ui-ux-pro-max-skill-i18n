# AGENTS.md

本文件为 AI 代理在此仓库中工作时提供指导。

## 架构

- **双布局策略**：`app/(en)/` 在根路径 `/` 提供英文版；`app/[locale]/` 提供 `/zh`、`/vi`、`/ja`。两棵路由树有独立的 layout 和 metadata。
- **i18n**：使用 `next-intl` v4，`localePrefix: 'as-needed'`。默认语言 `en` 无前缀。支持语言：`en`、`zh`、`vi`、`ja`。
- **Middleware 已禁用**（matcher 为空数组）。所有路由为静态路由，语言检测和重定向通过 route group + 客户端逻辑处理。
- **构建后脚本**（`scripts/postbuild.mjs`）：构建后将 `/en` 输出复制到根路径。不要假设 `/` 由 `app/page.tsx` 提供。
- **not-found.tsx**：必须用 `NextIntlClientProvider` 包裹并传入 messages——它运行在 `[locale]` layout 之外。参见已知的 intl context 运行时错误。

## 添加新语言

1. 在 `i18n/routing.ts` 的 `locales` 数组中添加语言代码
2. 创建 `messages/<locale>.json`（从 `en.json` 复制）
3. 更新 `language-switcher.tsx` 中的选项
4. 运行 `npm run test:content` 验证同步

## 部署

- 目标平台：**Cloudflare Workers**（通过 `@opennextjs/cloudflare`）
- 构建：`npm run build:cf`（执行 `opennextjs-cloudflare build`）
- 部署：`npm run deploy`（build:cf + wrangler deploy）
- 配置文件：项目根目录的 `wrangler.toml`
- 不要启用 next.config.ts 中的 `output: 'export'`（已被注释掉，这是有意为之）

## 测试与验证

- `npm run test:content` — 验证各语言内容同步（运行 `scripts/verify-content-sync.mjs`）
- `npm run lint` — ESLint，使用 next/core-web-vitals + typescript 规则
- 未配置单元测试框架；验证基于脚本

## 代码风格

- Tailwind CSS v4，`darkMode: 'class'`
- 无 Prettier/Biome——仅依赖 ESLint
- 路径别名：`@/*` 映射到项目根目录（`./`）
- 组件放在 `components/`，工具函数放在 `lib/`
