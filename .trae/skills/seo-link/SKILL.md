---
name: seo-link
description: "当用户需要在任意目标平台发布 SEO 外链文章，并把发布结果同步到飞书 Base 的外链发布记录和可投放站点池时使用。"
---

# SEO Link

用于把一个网站、工具、项目或文档站整理成适合目标平台的 SEO 外链文章，发布成功后同步到指定飞书多维表格。平台不固定，必须以用户本次指定的平台、当前浏览器页面、或 `可投放站点池` 中匹配到的平台记录为准。

## 飞书 Base

- 正确飞书 Base：`https://zley1991.feishu.cn/base/FcUabvEZFaXvJZsJG33coQBFnwd?table=tbl2XuhLgHVD3QVK&view=vewmeVsJBx`
- Base Token：`FcUabvEZFaXvJZsJG33coQBFnwd`
- `可投放站点池`：`tbl2XuhLgHVD3QVK`
- `外链发布记录`：`tblWNieYu3VN2fZ2`

## 平台规则

1. 不要在 skill 中固定发布平台；任何平台都只是本次任务的目标平台。
2. 发布前根据用户要求、浏览器当前页面、登录账号状态、或站点池记录确认本次平台。
3. 写入 `外链发布记录` 时，`发布平台` 必须使用本次真实发布平台。
4. 更新 `可投放站点池` 时，按本次真实平台搜索并更新对应记录。
5. 如果用户没有指定平台，也无法从当前上下文可靠判断，先查询 `可投放站点池` 或向用户确认，不要默认选择某个平台。

## 关键避坑

1. **不要误用旧 Base**
   - 不要写到 `QghHbB5Cta9pvusvvhQcVHALnic`
   - 正确 Base 永远是 `FcUabvEZFaXvJZsJG33coQBFnwd`

2. **先确认项目真实定位**
   - 发布前先读仓库、官网或文档，不要凭名字猜项目性质
   - 如果项目是“非官方多语言翻译站 / 文档整理站 / 本地化门户”，文章必须按这个定位写
   - 不要把“翻译站 / 镜像站 / 文档站”写成“原创产品 / 原创 skill”

3. **优先使用 Chrome DevTools MCP**
   - 不要默认改用普通浏览器工具
   - 先确认 `list_pages` 能看到用户现有 Chrome 标签页，而不是只有 `about:blank`
   - 如果只看到空白页，说明 MCP 没附着到已有浏览器，先停下来排查

4. **发布前核对平台表单**
   - 不同平台的标题、正文、标签、分类、文章来源、翻译声明、可见范围等字段不同
   - 发布前再次核对标题、正文、标签/分类、外链和平台要求的必填项
   - 不要套用某个平台专属表单规则到其他平台

5. **更新站点池时只改状态**
   - `可投放站点池` 默认只更新 `状态`
   - 除非用户明确要求，否则不要覆盖 `备注`

## 推荐工作流

### Step 1：确认目标平台和浏览器状态

先用 Chrome DevTools MCP：

- `list_pages`
- 找到目标平台标签页
- `select_page`
- `take_snapshot`

如果用户没有指定平台，先从当前页面或 `可投放站点池` 判断；仍不明确时向用户确认。

### Step 2：确认项目定位

至少读取以下信息中的一项：

- 项目仓库 README
- 官网首页
- 文档页
- 页面公告或说明文案

发布前确认：

- 这个项目到底是什么
- 它是不是原创产品
- 它是不是翻译站、文档站、本地化站或镜像站

只有确认后再写文案。

### Step 3：撰写平台适配文章

推荐结构：

1. 第一段说明项目真实定位
2. 第二段说明为什么要做它
3. 中间部分写使用场景 / 内容结构 / 实现重点
4. 文内放主链接
5. 如有必要补充文档页链接
6. 结尾给出一句适合点击的总结

推荐风格：

- 第一人称开发者口吻
- 真实、克制、不要吹成原创产品
- 适合 SEO，但不要堆砌关键词
- 按目标平台语境调整标题、标签、分类和原创/转载/翻译声明

### Step 4：发布后拿到链接

发布成功后记录：

- 平台名称
- 文章标题
- 发布时间
- 发布链接
- 工具链接 / 官网链接
- 项目真实名称

## 飞书写入流程

所有 Base 操作默认使用：

```bash
--as user
```

### 1. 先读表结构

```bash
lark-cli base +field-list --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tblWNieYu3VN2fZ2

lark-cli base +field-list --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tbl2XuhLgHVD3QVK
```

### 2. 写入 `外链发布记录`

```bash
lark-cli base +record-upsert --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tblWNieYu3VN2fZ2 \
  --json '{
    "文章语言": "中文",
    "工具名称": "<工具或项目名称>",
    "状态": "已发布",
    "发布平台": "<本次真实平台>",
    "文章标题": "<文章标题>",
    "发布时间": "<YYYY-MM-DD HH:mm:ss>",
    "发布者": "zley",
    "工具链接": "<工具或官网链接>",
    "发布链接": "<发布后的公开链接>"
  }'
```

### 3. 查询 `可投放站点池` 中的平台记录

```bash
lark-cli base +record-search --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tbl2XuhLgHVD3QVK \
  --format json \
  --json '{
    "keyword": "<本次真实平台>",
    "search_fields": ["平台"],
    "select_fields": ["平台", "状态", "备注"],
    "limit": 20
  }'
```

### 4. 更新 `可投放站点池`

如果找到了对应平台记录，只更新 `状态`：

```bash
lark-cli base +record-upsert --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tbl2XuhLgHVD3QVK \
  --record-id <platform_record_id> \
  --json '{
    "状态": "已提交"
  }'
```

如果发布失败：

- 把站点池状态改成更合适的值，比如 `需复查`
- 如用户明确要求，再在 `备注` 说明原因

## 字段对照

### 外链发布记录

- `文章语言`
- `工具名称`
- `状态`
- `发布平台`
- `文章标题`
- `发布时间`
- `发布者`
- `工具链接`
- `发布链接`

### 可投放站点池

- `平台`
- `状态`
- `备注`

## 完成标准

以下条件全部满足才算完成：

1. 目标平台文章已成功发布
2. 拿到可访问的公开文章链接
3. 正确 Base 的 `外链发布记录` 已新增记录
4. 正确 Base 的 `可投放站点池` 已把目标站点更新为 `已提交`
5. 没有把数据写到错误 Base
6. 没有把项目错误描述成原创产品

## 回复模板

完成后回复用户时至少包含：

- 发布是否成功
- 发布平台
- 文章标题
- 发布链接
- 更新到的正确 Base
- 是否已写入 `外链发布记录`
- 是否已更新 `可投放站点池`
- 如果失败，说明卡在哪一步
