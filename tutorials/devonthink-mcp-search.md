# DEVONthink MCP 搜索与读取范例

整个过程没有使用专门的搜索技能。

## 实际验证结果

在打算开发 dt-search 技能用于专门搜索之前，我让 Astra 直接裸跑 DEVONThink MCP 的搜索接口，对已经沉淀的文档做了一个有趣的尝试：

| 验证 | 实际结果 |
| --- | --- |
| 按标题搜索 `name:需求`，`limit: 5` | 返回 2 条：一份项目复盘，以及 DeepSeek V4.1-Flash KV Cache 与容量规划需求澄清 |
| 全文搜索 `text:"KV Cache" kind:markdown`，`limit: 5` | 总计命中 106 条，本页返回 5 条、vLLM 调参、llm-d 调研、昇腾 A3 PD 分离优化和成本估算 |
| 按项目名搜索，`sort: modified`，`limit: 6` | 总计命中 7 条，本页包含日报、复盘、项目 group、MoE 节点卡数拓扑准入 bugfix 和设计文档 |
| 使用 `group_uuid` 限定项目 group，再按需求编号搜索 | 返回 5 条：对应需求澄清、设计、开发计划、项目索引及另一需求的 MoE 拓扑准入 bugfix |
| 用 `extract_record_content` 读取需求文档 | 返回需求理解、范围确认、验收标准和后续文档等章节；其中明确要求 Engram 主机卸载方案扣减 GPU 常驻权重，并计算主机内存需求，避免重复计量 |
| 用 `extract_record_content` 按 `Engram,卸载` 提取内容 | 返回需求理解、范围确认、验收标准三个章节的相关片段 |
| 用 `get_record_text` 读取同一文档 | 返回完整 Markdown 源文，包括正文及链接目标 |
| 用 `find_similar_records` 查找相似记录，`limit: 3` | 依次返回同一需求的开发计划、设计，以及另一需求的 Qwen3.8-Flash-Next 模型准入文档 |
| 用 `get_record_links` 读取出链 | 返回设计和开发计划两条 item link，均带关联记录 UUID |
| 将完整问题 `DeepSeek V4.1 容量规划之前确认了哪些需求` 直接传给 `search_records` | 仅命中 1 篇日报，没有返回上述需求澄清文档 |

这个搜索过程很有意思，它足够表明，其实我并不需要开发专用的 dt-search 技能来教会模型怎么搜索，模型用 DEVONThink MCP 的搜索接口，就像调用 web search 一样自然方便。真正需要做的只是让模型知道有这么一个数据源。

## 接口提供的能力

| 能力 | 接口与用途 |
| --- | --- |
| 全文与条件检索 | `search_records`：布尔运算、短语、标题、正文、标签、类型、日期、自定义元数据等条件 |
| 控制检索范围 | 按数据库、group 或 smart group 限定；支持相关性排序、日期排序和分页 |
| 精确定位 | `lookup_records`：按名称、URL、文件名或位置等精确匹配 |
| 按目录浏览 | `get_record_children`：分页列出 group 的直接子记录；`get_group_tree`：按指定深度递归展开 group 层级，可选择包含文档 |
| 读取正文 | `get_record_text`：获取 Markdown 等文本记录的原始内容，可批量读取 |
| 提取相关内容 | `extract_record_content`：按章节或 PDF 页面提取，可设置关键词与 token 预算 |
| 扩展关联资料 | `find_similar_records`：根据已有记录或一段文本寻找相似记录 |
| 跟随知识链接 | `get_record_links`：读取入链、出链及 wiki 链接 |
