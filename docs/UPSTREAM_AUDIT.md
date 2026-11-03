# 上游来源与验证记录

核查日期：2026-11-03。本站定位：独立的非官方多语言翻译网站。

## 固定基线

- [发布包 ui-ux-pro-max-cli@2.15.0](https://www.npmjs.com/package/ui-ux-pro-max-cli/v/2.15.0)，npm tarball SHA-1：`c19bf89b591770420b75a333b1dd0b6449d5e3dd`。
- [对应 Release](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases/tag/v2.15.0)。Git 仓库 package.json 的 2.5.0 不代表 npm 发布包版本。
- 目录数量从发布包 `assets/data/catalog-summary.json` 读取，并核对 CSV：79 可搜索风格（50 active / 29 supplemental，另有 9 deprecated）、192 配色/产品/规则、74 字体配对、119 UX 指南、22 技术栈、25 图表、34 落地页模式、1,260 技术栈指南。
- main 核查快照 `713eef51b04efc98d6fa565323b495f7c9c89fd4` 仅用于比较。其 1,278 技术栈指南、`--rtl`、`--dry-run`、新增助手不作为当前教程基线。
- [上游许可证](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/v2.15.0/LICENSE)：MIT，Copyright (c) 2024 Next Level Builder。

## 命令验证与边界

包解压至临时目录，未在用户真实全局环境安装技能。检查真实 `uipro init --help`、`search.py --help` 和打包后的命令实现。

- 项目级 `init --ai claude --offline` 成功，生成模板路径正确。
- 设计系统 JSON 输出、项目 slug 路径、页面覆盖、三项 1–10 调节参数已运行。
- 重复 `--persist` 返回 `skipped_exists`；MASTER 文件 SHA-256 未变。页面覆盖可生成且保留主文件；加入测试标记后，--force 已验证会重写该文件。
- `--design-system` 分支优先于 `--stack`；技术栈搜索必须另行执行，文档不再承诺联用过滤。
- `uipro update` 的版本检查和 npm 自升级分支依据发布包实现核实，未实际执行自动升级。相同版本刷新与不同版本升级分别说明。
- 已使用测试用 homedir 替身在临时目录验证全局技能安装/卸载，未修改真实用户目录。全局技能卸载与 npm CLI 卸载是不同操作；设计系统文件不属于技能卸载范围。
- 发布包不支持 `--dry-run`、`--rtl`；未照搬 main 文档。

## 文章与演示的来源状态

现有 7 篇博客主题和 5 个教程步骤，各有五种语言，共 60 个 MDX 文件。没有足够证据将它们归为上游官方文章的翻译，因此所有文件明确登记 `contentKind: unverified`。页面显示来源待核实，维护者在结构化数据中是 editor，而非虚构原作者；RSS 使用 contributor。

已移除“我们编入 Skill”“our Skill”等作者冒称、旧数字和不存在的 `+style` / `+palette` / `+font` 命令。保留学习示例并明确其非实录性质。不能把本次技术核对等同于确认每篇文章的全部原创出处。

画廊保留原有 39 个外部演示引用与缩略图，HTTP 检查 39/39 返回 200，39/39 本地 AVIF 存在。可访问性不等于作者或许可认证。素材最初取得的授权记录未在仓库中找到，继续明确其外部参考身份，不声称已完成权利认证；新增或再分发素材前需核实其独立来源。

## 可复现检查

`pnpm check:content` 检查五语言结构、目录 token、过期命令、署名和来源字段。`pnpm lint` 与 `pnpm build:cf` 验证代码与静态导出。浏览器回归与最终结果记录在更新计划的执行记录中。
