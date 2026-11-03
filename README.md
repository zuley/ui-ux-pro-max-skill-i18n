# UI UX Pro Max Skill 非官方多语言翻译站

[English](README.en.md) · [网站](https://ui-ux-pro-max-skill.com) · [原项目](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

本站翻译、整理 UI UX Pro Max Skill 的文档和学习资料。技能、CLI、算法及数据集由原项目作者维护。本站与原项目无隶属关系，也不代表原作者或官方支持。

## 内容与来源

- 英文位于 `/`；中文、越南文、日文、印地文位于 `/zh`、`/vi`、`/ja`、`/hi`。不生成 `/en`。
- 当前文档基线是已发布的 `ui-ux-pro-max-cli@2.15.0`，不是上游 main 的未发布能力。
- 发布版本、目录统计和核查日期统一记录在 `lib/upstream-content.json`。语言文件的 `[[styles]]` 等占位标记在加载时解析。
- 译文应有原文链接、原作者、来源版本和核对日期；已有学习文章无法确认原始发表出处时明确标为来源待核实，不冒称官方译文。
- 画廊是外部演示参考，本站不主张其作者身份或认证生成过程。
- [更新计划与核查范围](UPDATE_PLAN.md)；[来源与验证记录](docs/UPSTREAM_AUDIT.md)。

## 本地开发

Node.js 24、pnpm 10。本仓库仅使用 `pnpm-lock.yaml`；不生成 npm 锁文件。

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check:content
pnpm lint
pnpm build:cf
```

如果全局 pnpm 版本不兼容，可使用 `npx --yes pnpm@10.27.0 <命令>`。构建输出到 `out/`，包含重复 `/en` 守卫与静态预取别名。`pnpm preview` 用于 Cloudflare 本地预览；`pnpm deploy` 会构建并部署，须明确决定发布后再执行。

## 反馈与署名

- [本站翻译、页面与来源反馈](https://github.com/zuley/ui-ux-pro-max-skill-i18n/issues)
- [上游技能或 CLI 问题](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues)
- 上游项目：Next Level Builder，MIT，Copyright (c) 2024 Next Level Builder。[完整许可证](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/v2.15.0/LICENSE)

引用或翻译上游材料时保留其适用署名与许可；第三方字体、图标、演示图片不能自动视为采用上游主仓库的许可证。本站不代为授予第三方素材权利。
