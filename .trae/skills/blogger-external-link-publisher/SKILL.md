---
name: blogger-external-link-publisher
description: "在 Blogger 发布外链 SEO 文章，并把结果同步到指定飞书多维表格。当用户需要用 Chrome DevTools MCP 在 Blogger 发文、随后更新飞书 Base 中的外链发布记录和可投放站点池时使用。"
---

# Blogger External Link Publisher

用于把一个网站/工具/项目整理成一篇适合 Blogger 的外链 SEO 文章，发布成功后同步到指定飞书多维表格。

## 固定目标

- 发布平台：`https://www.blogger.com/`
- 正确飞书 Base：`https://zley1991.feishu.cn/base/FcUabvEZFaXvJZsJG33coQBFnwd?table=tbl2XuhLgHVD3QVK&view=vewmeVsJBx`
- Base Token：`FcUabvEZFaXvJZsJG33coQBFnwd`
- `可投放站点池`：`tbl2XuhLgHVD3QVK`
- `外链发布记录`：`tblWNieYu3VN2fZ2`

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

4. **Blogger 编辑器要注意焦点**
   - 输入正文前先确认焦点在正文编辑区，不要把正文误打进标题
   - 输入标题后切到正文框，再粘贴正文
   - 发布前再次核对标题、正文和标签

5. **更新站点池时只改状态**
   - `可投放站点池` 默认只更新 `状态`
   - 除非用户明确要求，否则不要覆盖 `备注`

## 推荐工作流

### Step 1：确认浏览器已接管

先用 Chrome DevTools MCP：

- `list_pages`
- 找到 Blogger 标签页
- `select_page`
- `take_snapshot`

如果能看到真实标签页，再继续。

### Step 2：确认项目定位

至少读取以下信息中的一项：

- 项目仓库 README
- 官网首页
- 文档页
- 页面公告或说明文案

输出时先回答：

- 这个项目到底是什么
- 它是不是原创产品
- 它是不是翻译站、文档站、本地化站或镜像站

只有确认后再写文案。

### Step 3：撰写 Blogger 文章

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

### Step 4：发布后拿到链接

发布成功后记录：

- 文章标题
- 发布时间
- 发布链接
- 工具链接 / 官网链接
- 项目真实名称

本次已验证可用示例：

- 发布标题：`我给 UI UX Pro Max Skill 做了一个非官方多语言翻译站，顺手补了安装文档`
- 发布链接：`https://zley1991.blogspot.com/2026/05/ui-ux-pro-max-skill.html`
- 工具链接：`https://ui-ux-pro-max-skill.com/zh/`

## 飞书写入流程

> **前置条件：** 先阅读 [`../lark-shared/SKILL.md`](../lark-shared/SKILL.md)。

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
    "工具名称": "UI UX Pro Max Skill 多语言翻译站",
    "状态": "已发布",
    "发布平台": "Blogger",
    "文章标题": "我给 UI UX Pro Max Skill 做了一个非官方多语言翻译站，顺手补了安装文档",
    "发布时间": "2026-05-04 12:09:58",
    "发布者": "zley",
    "工具链接": "https://ui-ux-pro-max-skill.com/zh/",
    "发布链接": "https://zley1991.blogspot.com/2026/05/ui-ux-pro-max-skill.html"
  }'
```

### 3. 查询 `可投放站点池` 中的平台记录

```bash
lark-cli base +record-search --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tbl2XuhLgHVD3QVK \
  --format json \
  --json '{
    "keyword": "Blogger",
    "search_fields": ["平台"],
    "select_fields": ["平台", "状态", "备注"],
    "limit": 20
  }'
```

### 4. 更新 `可投放站点池`

如果找到了 `Blogger` 对应记录，只更新 `状态`：

```bash
lark-cli base +record-upsert --as user \
  --base-token FcUabvEZFaXvJZsJG33coQBFnwd \
  --table-id tbl2XuhLgHVD3QVK \
  --record-id <Blogger_record_id> \
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

1. Blogger 文章已成功发布
2. 拿到可访问的公开文章链接
3. 正确 Base 的 `外链发布记录` 已新增记录
4. 正确 Base 的 `可投放站点池` 已把目标站点更新为 `已提交`
5. 没有把数据写到错误 Base
6. 没有把项目错误描述成原创产品

## 回复模板

完成后回复用户时至少包含：

- 发布是否成功
- 文章标题
- 发布链接
- 更新到的正确 Base
- 是否已写入 `外链发布记录`
- 是否已更新 `可投放站点池`
- 如果失败，说明卡在哪一步
