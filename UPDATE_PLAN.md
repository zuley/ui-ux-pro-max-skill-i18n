# 非官方多语言翻译站更新计划

核查日期：2026-11-03。本站基线：`84cf201`。状态：本轮网站修改已实施并通过本地验证；历史来源与素材授权记录仍有未核实项，见末尾执行记录。

## 1. 网站身份与内容边界

统一定位：**本站是 UI UX Pro Max Skill 的非官方多语言翻译网站，由独立维护者翻译、整理相关文档和学习资料。技能、CLI、算法与上游数据集由原项目作者维护。本站与原项目无隶属关系，也不代表原作者或官方支持。**

- “我们”只能指本站的翻译、整理、校对、网站维护工作。
- 描述技能功能、设计库和发布时使用“上游项目”“原作者”“官方仓库提供”。
- 禁止把“我们开发了技能”“我们编入的数据”“我们的设计引擎”作为本站陈述。
- 翻译内容标明原文、原作者、来源版本和译文更新日期；保留适用的原版权声明。
- 本站整理的学习材料标为“本站整理”，提供依据；未查明来源的文章不得冒称“官方译文”或虚构原作者。
- 不把历史演示、文案样例当成本站实测结果，不承诺上游发布频率或产品支持。
- 英文版同样是本站的非官方内容入口，不以“英文原版”暗示官方身份。

## 2. 核查范围与证据边界

已核查：首页与公共组件、5 个文档主题、5 份语言文件、博客和教程内容结构与身份措辞（35 篇博客 MDX、25 篇教程步骤 MDX）、About/Contact/Terms/Privacy、作者模型、SEO/JSON-LD、RSS、OG 图、Manifest、画廊数据与渲染逻辑、两份 README。

这次为源码与上游资料核查；上轮读取过线上中文首页。本轮未完成全部线上路由的交互回归，也未实际安装/卸载上游 CLI。文中“待验证”项目不能视为已经通过运行测试。

上游基线：

- [最新 Release v2.15.0](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases/tag/v2.15.0)，发布时间 2026-08-13。
- 核查时 main 固定到 `713eef51b04efc98d6fa565323b495f7c9c89fd4`，不要把 main 新增内容全部称为 v2.15.0 发布内容。
- [目录统计快照](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/713eef51b04efc98d6fa565323b495f7c9c89fd4/src/ui-ux-pro-max/data/catalog-summary.json)，其 verifiedAt 为 2026-11-01。
- [npm 当前发布包](https://registry.npmjs.org/ui-ux-pro-max-cli/latest)查得 `ui-ux-pro-max-cli@2.15.0`；Git 仓库 `cli/package.json` 仍写 `2.5.0`，应分开记录，不能从仓库 package.json 推断 npm 最新版。
- [上游版权声明](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/713eef51b04efc98d6fa565323b495f7c9c89fd4/LICENSE)：MIT，Copyright (c) 2024 Next Level Builder。第三方字体、图标、图片另核各自来源与许可。

## 3. 修改清单

### P0-A：消除作者身份混淆

**已确认问题**

- 顶部公告、About、作者 bio 已说明非官方身份，应保留；但首页标题、页脚、分享图、Manifest、RSS 未一致表达。
- `lib/site-config.ts` 的发布者只是 `Team`，文章卡片、署名和 RSS 无法明确区分翻译维护者与技能作者。
- `content/blog/*/font-pairing-beyond-inter.mdx` 摘要称字体配对是“我们编进 Skill”的；`glassmorphism-neumorphism-flat.mdx` 称决策表是“我们编进 Skill”的；`avoiding-ai-slop.mdx` 英文摘要称 `our Skill`。五种语言均须逐篇校正，不只改中文。
- Contact 将文档问题和产品问题统一导向公告中的官方仓库；About 也让翻译反馈走上游。
- README 以技能项目本身的口吻介绍功能与安装，缺少本站维护说明，且图片/语言链接需要重查。

**实施任务**

- [x] 统一站名、副标题、页脚、作者显示为“非官方多语言翻译站／本站翻译维护者”；保留产品名作为被介绍对象。
- [x] 为文档、文章、教程提供简洁的来源与翻译说明；不得伪造文章来源。
- [x] 清理所有语言中暗示本站开发技能、筛选上游数据、实施上游算法的第一人称表述。
- [x] 检查“我们实测”“团队经验”“社区贡献”“发布前人工审核”等陈述；没有可追溯依据则改成中性建议。
- [x] 本站翻译错误、页面问题导向本站仓库或现有站点邮箱；技能缺陷、上游功能请求导向官方仓库。按钮文案明确目标。
- [x] FAQ 宣称任意文档页底部有反馈入口，但当前文档组件未检出该入口；补上实际入口或删除承诺。
- [x] Rewrite README.md / README.en.md 为本站说明：定位、上游链接、五语言结构、本地开发、静态构建、来源维护。

主要文件：`messages/*.json`、`lib/site-config.ts`、`lib/authors.ts`、`components/announcement-bar.tsx`、`components/footer.tsx`、`components/legal/legal-content.tsx`、`content/blog/**/*.mdx`、两份 README。

验收：独立打开首页、文章、搜索分享卡片、RSS 时均能识别非官方翻译身份；无“本站就是技能作者”的表述；反馈去向正确。

### P0-B：安装、更新与卸载说明

**已确认问题**

- 五语言文案和 README 使用旧包 `uipro-cli`；`content/docs/page-definitions.tsx:490` 还硬编码旧包名，仅改翻译 JSON 不会修复页面。
- FAQ 声称技能只能项目级安装，与上游 `--global` 支持不符。
- `docs.cli.uninstall.commands` 将 `uipro uninstall --global` 注释为卸载全局 CLI，实际删除的是全局技能安装，npm 包卸载是另一项操作。
- 手动安装表、FAQ 仍描述 Cursor/Windsurf/Antigravity 的旧 `.shared/` 布局，需要按当前平台模板逐一核实。
- 更新/离线文案把安装包版本、技能资源刷新和 GitHub 下载混为一谈。

**上游文档与源码冲突，需要明确处理**

上轮答复“update 只刷新已安装包”不够准确。[v2.15.0 update.ts](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/v2.15.0/cli/src/commands/update.ts) 和核查时 main 均先查询 GitHub Release：版本不同则尝试 npm 升级并提示重新 `init --force`；版本相同才调用初始化刷新内置资源。README 的简短注释不足以表达完整行为。实施时必须检查 npm 发布包，不能只照搬 README。

**实施任务**

- [x] 推荐安装包统一为 `ui-ux-pro-max-cli`；`uipro-cli` 只在明确的旧版迁移说明中出现。
- [x] 分别说明安装 CLI、安装技能、全局安装技能、更新 CLI、刷新技能、卸载技能和卸载 CLI。
- [x] 按发布包核实 `--offline`、`--dry-run`、`--force`、`--global`、`--ai all` 与自动检测行为；删去未经证实的绝对保证。
- [x] 补全新增助手目标，并同步命令清单、手动路径、自动激活/命令触发说明、FAQ；数量由核实后的列表生成。
- [x] 校对 Windows Python 命令、Node/npm 前置条件；删除“近期 macOS 默认自带 Python 3”等未经支持的断言。
- [x] 将故障排查与降级示例按发布包重写，区分 Release 标签与 npm 包版本。
- [x] 从常规卸载流程移除 `rm -rf design-system`；用户自己的设计资料不应被当成技能卸载的一部分。

主要文件：`content/docs/page-definitions.tsx`、`messages/*.json` 的 `docs.cli` / `docs.faq` / `docs.examples`、`components/quick-start.tsx`、两份 README。

验收：在临时目录与隔离的测试用户目录验证发布包，禁止触碰真实全局技能；网页展示与复制的命令一致。

### P0-C：设计系统生成器的事实与路径

**已确认或必须复核的内容**

- 站内写 `design-system/MASTER.md` 和 `design-system/pages/...`；[当前 search.py](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/713eef51b04efc98d6fa565323b495f7c9c89fd4/src/ui-ux-pro-max/scripts/search.py) 定义的是 `design-system/<project-slug>/MASTER.md` 与同项目的 `pages/`。
- `-f` 的格式是 ASCII/Markdown，默认 ASCII，JSON 由 `--json` 指定；站内以“Markdown 代替 JSON”描述默认输出容易误导。
- `--persist` 默认保护已存在的 MASTER，覆盖需 `--force`；站内缺少保护条件。
- “五路并行”“不到一秒”“自动锁定以后所有会话”“生成器自动读取 MASTER 参与推理”等需要按源码与代理指令分开解释，不能当作运行保证。
- `--stack` 独立搜索与 `--design-system` 联用的实际行为需要按发布包验证，不能仅根据参数存在就承诺已参与生成。

**实施任务**

- [x] 同步路径、`-p` slug、`--output-dir`、页级覆盖、`--force`，同时修改正文、代码、FAQ、错误排查和输出示例。
- [x] 明确“写文件”与“AI 助手后续读取文件”是两个步骤；写出文件不等于每个客户端都会自动遵守。
- [x] 去掉无实测依据的时间保证、并行实现描述和绝对遵守承诺；保留有来源的功能解释。
- [x] 按选定版本验证 `--density`、`--motion`、`--variance`、`--rtl`，稳定可用后补充为进阶说明，不强塞到首页。
- [x] 整理现有应用换肤教程：先检查版本与已有 token，再渐进修改，明确这是使用上游技能的操作建议。

主要文件：`messages/*.json` 的 `docs.dsg` / `docs.faq` / `docs.examples`、`content/docs/page-definitions.tsx`、README、相关教程。

### P1-A：统一能力数据与分类

| 指标 | 本站现值 | 本次核实的 main 数据 |
|---|---:|---:|
| 风格 | 67 | 79 可搜索 = 50 active + 29 supplemental；另有 9 deprecated |
| 产品/配色/推理规则 | 161 | 各 192 |
| 字体配对 | 57，部分旧内容 50 | 74 |
| UX 指南 | 99 | 119 |
| 技术栈 | 16 | 22 |
| 图表 | 25 | 25，保留 |
| 落地页模式 | 24 与 34 并存 | README 为 34，实施时与固定版本 CSV 再核对 |

- [x] 建立单一的上游内容快照，记录 repo/ref、核查日期、数字和来源，不在多个组件各写一份。
- [x] 统计卡、介绍、功能区、页脚、文档、文章 CTA、SEO、JSON-LD、OG、Manifest 统一消费该数据。
- [x] 风格不得直接改成“79 种默认推荐”；清楚区分 50 活跃、29 补充及弃用条目。
- [x] 技术栈补齐 JavaFX、WPF、WinUI 3、UWP、Avalonia、Uno Platform，并补五语言说明。
- [x] 不把 Google Fonts 总量当字体配对数、不把官方图标源总量当精选指南数、不把画廊示例数当风格数。
- [x] Release 的 stack guidelines 为 1,260，main 快照为 1,278；展示时注明所用基线，不能混写成同一发布版本。

主要文件：拟新增 `lib/upstream-content.ts`，`components/stats.tsx`、`components/tech-stacks.tsx`、`components/features.tsx`、`components/footer.tsx`、`components/site-jsonld.tsx`、`lib/social-image.tsx`、`public/site.webmanifest`、`messages/*.json`。

### P1-B：内容来源与署名模型

- [x] 在 `lib/content/types.ts` / `frontmatter.ts` 增加适量的来源元数据：内容类型、原文链接、原作者、来源 ref、译者/整理者、校对日期；按内容类型校验必需字段。
- [x] 现有 `sourceLocale` 只是语言 fallback 信息，不能当作原文来源记录。
- [x] 逐篇登记 7 个博客主题 × 5 语言、5 个教程步骤 × 5 语言的来源状态；未查明的保持“待核实”，不得自动归为官方翻译。
- [x] 原创整理与译文采用不同署名，页面、列表卡片、RSS 和 Article JSON-LD 同步；原作者与译者不能合并成 `Team`。
- [x] 不改写历史发布日期；实质更新记录 updated，修订日期以真实实施日期为准。
- [x] 对样例输出标明“说明性示例”；要标实测则保留版本、命令和实际输出证据。

### P1-C：SEO、分享与对外入口

- [x] 首页与文档 metadata、OG/Twitter 图片及 alt、Manifest 名称/描述明确“非官方翻译/文档”。
- [x] 保留 JSON-LD 中本站 WebSite 与上游 SoftwareApplication 的实体分离；本站 publisher 只对应本站，不能把维护者设为软件作者。
- [x] 校正文章作者/翻译者、来源和 RSS 描述；删除无实证的 field reports/experiments 暗示。
- [x] 官方仓库、官方问题入口、本站仓库、本站问题入口分开配置；统一从配置导出，清理公告与文章 CTA 的硬编码。
- [x] 检查搜索索引与摘要同步，不出现页面已修正而站内搜索仍保留旧表述。

主要文件：`lib/site-config.ts`、`lib/social-image.tsx`、`components/site-jsonld.tsx`、`components/content/article-jsonld.tsx`、`lib/search-index.ts`、两棵路由树的 metadata 与 RSS、`public/site.webmanifest`。

### P1-D：画廊与外部素材

- [x] 核实 `public/gallery.csv` 的 39 个演示、缩略图、外链可用性和来源，失效项修复或隐藏。
- [x] 标明上游/第三方演示来源；来源未核实前不声称由本站制作、由技能实际生成或通过本站测试。
- [x] 现有为“网站演示画廊”，与上游“风格目录”是不同集合。不要因为风格数变化就把 39 个演示改为 79 个。
- [x] 不直接覆盖 CSV：上游新版分类字段与本站 Demo 类型不同，按需映射；只有引入风格目录时才增加 taxonomy 状态筛选。
- [ ] 核对截图、字体和图标的署名/许可依据，保留来源说明；不据上游主仓库 MIT 推断所有第三方素材都相同许可。

主要文件：`public/gallery.csv`、`public/thumbnails/`、`lib/gallery.ts`、`components/gallery.tsx`、`components/examples-page-content.tsx`。

### P2：维护与回归

- [x] 五语言 key/占位符/命令一致性检查；页脚目前硬编码英文，改为本地化。
- [x] 建立轻量检查：旧包仅允许出现在迁移说明、缺少来源的译文、数字漂移、身份冒称、外链失效分别报告。
- [x] 记录上游核查日期与 ref；后续更新人工审阅差异后同步，不自动把未核实的上游营销文案发布到本站。
- [x] 同步 AGENTS.md 的实际架构说明：它写“Next 默认 404”，仓库已有 `app/global-not-found.tsx`，应按现状核对后修正文档。

## 4. 执行顺序与验收

1. 固定发布包与上游数据基线，解决 README/源码/npm 版本差异，建立来源清单。
2. 完成 P0 身份、安装和生成器文档修正，再按同一事实表翻译五种语言。
3. 同步统计、技术栈、来源署名、SEO、RSS、OG 和 Manifest。
4. 核对画廊外链与素材，完成逐篇博客/教程检查。
5. 运行 `pnpm run lint`、`pnpm run build:cf`；检查 `out/en` 不存在，五种语言静态页面、404、segment-prefetch、canonical/hreflang、sitemap/RSS/JSON-LD 正确。
6. 浏览器验证五种语言首页、5 类文档、博客/教程、About/Contact、画廊；覆盖窄屏、长译文换行、代码复制、语言切换、来源链接、反馈去向、分享图可读性。
7. 汇报文件清单、来源基线、检查通过项和仍待核实项；提交、推送和部署不包含在本次计划工作中。

保持英文根路径及 `/zh`、`/vi`、`/ja`、`/hi` 双路由结构，保持 pnpm 与 Cloudflare Workers Static Assets；本轮不顺带做布局重构或依赖升级。


## 5. 执行记录（2026-11-03）

- 实际采用 npm 发布包 `ui-ux-pro-max-cli@2.15.0` 为文档与目录统计基线。main 中新增但发布包没有的 `--dry-run`、`--rtl` 和助手目标没有写成已发布能力。
- 首页、五语言文案、页脚、作者显示、About/Contact、README、JSON-LD、RSS、OG/Twitter、Manifest、404 已统一非官方翻译站身份；公开链接区分本站与上游问题。
- 安装包名、项目/全局安装、卸载、update 分支、Python 搜索、ASCII/Markdown/JSON、project slug 路径、`--force`、页面覆盖和独立 `--stack` 搜索说明已修正。
- 新增共享目录快照与消息 token 解析，技术栈扩至 22 个。原先散落的统计数字同步；教程中不存在的 `+style` / `+palette` / `+font` 命令已移除。
- 60 个 MDX 文件都登记原始来源未核实状态。新增来源字段与校验、可见说明、维护者署名和 editor/contributor 结构化元数据；没有编造原作者或官方译文身份。
- 39 个外部演示链接 HTTP 检查通过，39 个本地 AVIF 缩略图存在。保持网站演示与上游风格目录的区别，没有将 39 改成 79。
- npm 包在临时目录执行安装；通过测试用的 homedir 替身隔离全局安装/卸载，未修改用户真实全局技能。已运行生成器格式、三项调节参数、持久化、页面覆盖、重复写入保护和强制覆盖检查。自动 npm 升级分支仅审查实现，未执行全局 CLI 升级。
- `pnpm check:content`、`pnpm lint`、`pnpm build:cf` 通过；构建完成 TypeScript 检查。导出 138 个 HTML，验证 3,087 个内部链接，没有 `/en` 副本。另核查 60 个 Article schema、5 份 RSS、2 张分享 PNG 与 canonical/hreflang 尾斜杠。
- Chrome 浏览器覆盖 55 个桌面页面、25 个 375px 窄屏页面，无页面运行错误、旧命令/未解析 token 或横向溢出。五语言切换、教程代码复制、画廊筛选、弹窗 Escape 关闭和主题切换通过；查看了首页、印地文窄屏文档和分享图截图。最后一轮文案修订后另验证了五语言首页/About/Contact 共 15 个窄屏页面，以及 404 的非官方身份。
- 当前系统 pnpm 12 与旧锁文件配置不兼容；已通过 `packageManager: pnpm@10.27.0` 固定兼容版本。依赖版本及 pnpm-lock.yaml 未改动。
- 保持现有双路由与 Cloudflare 静态导出架构。未提交、推送或部署。

### 未核实事项

1. 历史文章的原始发表出处：已逐篇明确为 `unverified`，需要取得真实来源后才可改为 translation 并填写原作者、原文链接和版本。当前修正不声称完成原创性认证。
2. 演示图片及第三方素材的原始授权记录：仓库未提供完整证据。已标外部参考身份并保存已确认的上游 MIT 声明；链接可访问不等于授权已确认。未新增或重新下载演示素材。

源码与运行依据见 `docs/UPSTREAM_AUDIT.md`，上游版权声明见 `docs/UPSTREAM_LICENSE.txt`。
