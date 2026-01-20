# UI UX Pro Max

> [English](i18n/README.en.md) | 简体中文

一个为跨多个平台和框架构建专业 UI/UX 提供设计智能的 AI 技能。

<p align="center">
  <img src="screenshots/website.png" alt="UI UX Pro Max" width="800">
</p>

## v2.0 新功能

### 智能设计系统生成

v2.0 的旗舰功能是**设计系统生成器** - 一个由 AI 驱动的推理引擎，可以分析您的项目需求并在几秒钟内生成完整、定制的设计系统。

```
+----------------------------------------------------------------------------------------+
|  目标：Serenity Spa - 推荐设计系统                                                        |
+----------------------------------------------------------------------------------------+
|                                                                                        |
|  模式：以英雄区为中心 + 社会证明                                                             |
|     转化：情感驱动，包含信任元素                                                             |
|     CTA：首屏可见，在客户评价后重复                                                          |
|     板块：                                                                              |
|       1. 英雄区                                                                         |
|       2. 服务                                                                           |
|       3. 客户评价                                                                        |
|       4. 预约                                                                           |
|       5. 联系方式                                                                        |
|                                                                                        |
|  风格：柔和 UI 进化                                                                       |
|     关键词：柔和阴影、微妙深度、平静、高级感、有机形状                                           |
|     最适合：健康、美容、生活方式品牌、高端服务                                                  |
|     性能：优秀 | 可访问性：WCAG AA                                                        |
|                                                                                        |
|  颜色：                                                                                 |
|     主色：    #E8B4B8 (柔和粉色)                                                         |
|     辅助色：  #A8D5BA (鼠尾草绿)                                                         |
|     CTA：     #D4AF37 (金色)                                                            |
|     背景：    #FFF5F5 (暖白色)                                                           |
|     文本：    #2D3436 (炭灰色)                                                           |
|     说明：平静的调色板，带有金色点缀以营造奢华感                                               |
|                                                                                        |
|  字体：Cormorant Garamond / Montserrat                                                 |
|     氛围：优雅、平静、精致                                                                 |
|     最适合：奢侈品牌、健康、美容、编辑                                                       |
|     Google Fonts：https://fonts.google.com/share?selection.family=...                  |
|                                                                                        |
|  关键效果：                                                                              |
|     柔和阴影 + 平滑过渡 (200-300ms) + 温和的悬停状态                                         |
|                                                                                        |
|  避免（反模式）：                                                                         |
|     明亮的霓虹色 + 生硬的动画 + 深色模式 + AI 紫色/粉色渐变                                    |
|                                                                                        |
|  交付前检查清单：                                                                         |
|     [ ] 不使用表情符号作为图标（使用 SVG：Heroicons/Lucide）                                |
|     [ ] 所有可点击元素添加 cursor-pointer                                                 |
|     [ ] 悬停状态使用平滑过渡 (150-300ms)                                                  |
|     [ ] 浅色模式：文本对比度最低 4.5:1                                                     |
|     [ ] 键盘导航的焦点状态可见                                                             |
|     [ ] 遵守 prefers-reduced-motion                                                    |
|     [ ] 响应式：375px、768px、1024px、1440px                                             |
|                                                                                        |
+----------------------------------------------------------------------------------------+
```

### 设计系统生成的工作原理

```
┌─────────────────────────────────────────────────────────────────┐
│  1. 用户请求                                                      │
│     "为我的美容水疗中心构建一个落地页"                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. 多领域搜索（5 个并行搜索）                                      │
│     • 产品类型匹配（100 个类别）                                    │
│     • 风格推荐（57 种风格）                                        │
│     • 调色板选择（95 个调色板）                                     │
│     • 落地页模式（24 种模式）                                       │
│     • 字体配对（56 种字体组合）                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. 推理引擎                                                      │
│     • 匹配产品 → UI 类别规则                                       │
│     • 应用风格优先级（BM25 排名）                                   │
│     • 过滤行业反模式                                               │
│     • 处理决策规则（JSON 条件）                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. 完整设计系统输出                                               │
│     模式 + 风格 + 颜色 + 字体 + 效果                                │
│     + 要避免的反模式 + 交付前检查清单                                │
└─────────────────────────────────────────────────────────────────┘
```

### 100 条行业特定推理规则

推理引擎包含以下专业规则：

| 类别 | 示例 |
|----------|----------|
| **科技与 SaaS** | SaaS、微型 SaaS、B2B 企业、开发者工具、AI/聊天机器人平台 |
| **金融** | 金融科技、银行、加密货币、保险、交易仪表板 |
| **医疗保健** | 医疗诊所、药房、牙科、兽医、心理健康 |
| **电子商务** | 通用、奢侈品、市场、订阅盒 |
| **服务** | 美容/水疗、餐厅、酒店、法律、咨询 |
| **创意** | 作品集、代理、摄影、游戏、音乐流媒体 |
| **新兴技术** | Web3/NFT、空间计算、量子计算、自主系统 |

每条规则包括：
- **推荐模式** - 落地页结构
- **风格优先级** - 最佳匹配的 UI 风格
- **颜色氛围** - 适合行业的调色板
- **字体氛围** - 字体个性匹配
- **关键效果** - 动画和交互
- **反模式** - 不应该做什么（例如，银行业的"AI 紫色/粉色渐变"）

## 功能特性

- **57 种 UI 风格** - 玻璃态、粘土态、极简主义、野兽派、新拟态、便当网格、深色模式、AI 原生 UI 等
- **95 个调色板** - 针对 SaaS、电子商务、医疗保健、金融科技、美容等行业的专用调色板
- **56 种字体配对** - 精选的字体组合，包含 Google Fonts 导入
- **24 种图表类型** - 仪表板和分析的推荐
- **11 个技术栈** - React、Next.js、Vue、Nuxt.js、Nuxt UI、Svelte、SwiftUI、React Native、Flutter、HTML+Tailwind、shadcn/ui
- **98 条 UX 指南** - 最佳实践、反模式和可访问性规则
- **100 条推理规则** - 行业特定的设计系统生成（v2.0 新增）

## 安装

### 使用 Claude 市场（Claude Code）

在 Claude Code 中使用两个命令直接安装：

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

### 使用 CLI（推荐）

```bash
# 全局安装 CLI
npm install -g uipro-cli

# 进入您的项目
cd /path/to/your/project

# 为您的 AI 助手安装
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai antigravity # Antigravity (.agent + .shared)
uipro init --ai copilot     # GitHub Copilot
uipro init --ai kiro        # Kiro
uipro init --ai codex       # Codex CLI
uipro init --ai qoder       # Qoder
uipro init --ai roocode     # Roo Code
uipro init --ai gemini      # Gemini CLI
uipro init --ai trae        # Trae
uipro init --ai all         # 所有助手
```

### 其他 CLI 命令

```bash
uipro versions              # 列出可用版本
uipro update                # 更新到最新版本
uipro init --offline        # 跳过 GitHub 下载，使用捆绑资源
```

### 手动安装

将相应的文件夹复制到您的项目：

| AI 助手   | 要复制的文件夹                                                      |
| -------------- | -------------------------------------------------------------------- |
| Claude Code    | `.claude/skills/ui-ux-pro-max/`                                      |
| Cursor         | `.cursor/commands/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`       |
| Windsurf       | `.windsurf/workflows/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`    |
| Antigravity    | `.agent/workflows/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`       |
| GitHub Copilot | `.github/prompts/ui-ux-pro-max.prompt.md` + `.shared/ui-ux-pro-max/` |
| Kiro           | `.kiro/steering/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`         |
| Codex CLI      | `.codex/skills/ui-ux-pro-max/`                                       |
| Qoder          | `.qoder/skills/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`          |
| Roo Code       | `.roo/rules/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`             |
| Gemini CLI     | `.gemini/skills/ui-ux-pro-max/` + `.shared/ui-ux-pro-max/`           |
| Trae           | `.trae/skills/ui-ux-pro-max/` + `.shared/ui-ux-pro-max/`             |

## 前置要求

搜索脚本需要 Python 3.x。

```bash
# 检查是否安装了 Python
python3 --version

# macOS
brew install python3

# Ubuntu/Debian
sudo apt update && sudo apt install python3

# Windows
winget install Python.Python.3.12
```

## 使用方法

### Claude Code

当您请求 UI/UX 工作时，该技能会自动激活。只需自然对话：

```
为我的 SaaS 产品构建一个落地页
```

### Cursor / Windsurf / Antigravity

使用斜杠命令调用该技能：

```
/ui-ux-pro-max 为我的 SaaS 产品构建一个落地页
```

### Kiro

在聊天中输入 `/` 查看可用命令，然后选择 `ui-ux-pro-max`：

```
/ui-ux-pro-max 为我的 SaaS 产品构建一个落地页
```

### GitHub Copilot

在 VS Code 中使用 Copilot，在聊天中输入 `/` 查看可用提示，然后选择 `ui-ux-pro-max`：

```
/ui-ux-pro-max 为我的 SaaS 产品构建一个落地页
```

### Codex CLI

该技能会自动激活 UI/UX 请求。您也可以显式调用它：

```
$ui-ux-pro-max 为我的 SaaS 产品构建一个落地页
```

### Qoder

当您请求 UI/UX 工作时，该技能会自动激活：

```
为我的 SaaS 产品构建一个落地页
```

### Roo Code

当您请求 UI/UX 工作时，该技能会自动激活：

```
为我的 SaaS 产品构建一个落地页
```

### Gemini CLI

当您请求 UI/UX 工作时，该技能会自动激活：

```
为我的 SaaS 产品构建一个落地页
```

### Trae

_免责声明：Trae 技能处于测试阶段。请报告任何问题或反馈。_

要使用 Trae 技能，您需要切换到 **SOLO** 模式。如果您的请求与技能相关，将使用技能：

```
为我的 SaaS 产品构建一个落地页（仅前端）。
```

### 示例提示

```
为我的 SaaS 产品构建一个落地页

为医疗保健分析创建一个仪表板

设计一个带深色模式的作品集网站

为电子商务制作一个移动应用 UI

构建一个带深色主题的金融科技银行应用
```

### 工作原理

1. **您提问** - 请求任何 UI/UX 任务（构建、设计、创建、实现、审查、修复、改进）
2. **生成设计系统** - AI 使用推理引擎自动生成完整的设计系统
3. **智能推荐** - 根据您的产品类型和需求，找到最佳匹配的风格、颜色和字体
4. **代码生成** - 使用适当的颜色、字体、间距和最佳实践实现 UI
5. **交付前检查** - 验证常见的 UI/UX 反模式

### 支持的技术栈

该技能为以下技术栈提供特定指南：

- **HTML + Tailwind**（默认）
- **React** / **Next.js** / **shadcn/ui**
- **Vue** / **Nuxt.js** / **Nuxt UI** / **Svelte**
- **SwiftUI** / **React Native** / **Flutter**

只需在提示中提及您首选的技术栈，或让它默认为 HTML + Tailwind。

## 设计系统命令（高级）

直接访问设计系统生成器：

```bash
# 使用 ASCII 输出生成设计系统
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# 使用 Markdown 输出生成
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown

# 特定领域搜索
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart

# 特定技术栈指南
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
```

### 持久化设计系统（主文件 + 覆盖模式）

将您的设计系统保存到文件以实现**跨会话的分层检索**：

```bash
# 生成并持久化到 design-system/MASTER.md
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"

# 同时创建页面特定的覆盖文件
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"
```

这将创建一个 `design-system/` 文件夹结构：

```
design-system/
├── MASTER.md           # 全局真实来源（颜色、字体、间距、组件）
└── pages/
    └── dashboard.md    # 页面特定覆盖（仅与主文件的偏差）
```

**分层检索的工作原理：**
1. 构建特定页面（例如"结账"）时，首先检查 `design-system/pages/checkout.md`
2. 如果页面文件存在，其规则**覆盖**主文件
3. 如果不存在，则专门使用 `design-system/MASTER.md`

**上下文感知检索提示：**
```
我正在构建 [页面名称] 页面。请阅读 design-system/MASTER.md。
同时检查 design-system/pages/[page-name].md 是否存在。
如果页面文件存在，优先使用其规则。
如果不存在，则专门使用主文件规则。
现在，生成代码...
```

## 许可证

本项目采用 [MIT 许可证](LICENSE)。
