# awesome-devonthink

[English](README.md) | 简体中文

本项目记录和维护 DEVONthink 的使用指南，包括脚本和适合agent使用的skills

## Using DEVONthink Skill set [using-dt-skills](using-dt-skills)

用于在 DEVONthink 中收集原始资料、编写调研报告与项目文档、记录项目进度的 Agent Skills。

| 技能 | 用途 |
| --- | --- |
| dt-source-capture | 按用户要求保存 PDF 原件和完整 HTML 网页，不自动归档普通调研中引用的资料 |
| dt-writing-research-report | 开展调研、审核报告大纲，编写、修订和保存调研报告 |
| dt-writing-project-documents | 创建、修订和保存需求澄清、设计文档、开发计划、复盘与实验结果记录；Markdown 优先，实验数据呈现或用户明确要求时使用 HTML |
| dt-progress-recorder | 用户验收后，向项目进度文件追加完成结果与关键决策 |

### 安装与更新

通过 [skills CLI](https://github.com/vercel-labs/skills) 从 GitHub 安装指定版本的技能，以下以 `v1.0.0` 为例。升级时，将 URL 中的版本号替换为目标版本后重新执行；重复使用同一版本号会保持该版本。

安装或更新全套技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/v1.0.0/using-dt-skills --global --skill '*'
```

安装或更新单个技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/v1.0.0/using-dt-skills --global --skill dt-writing-project-documents
```

按提示选择 AI 助手；出现安装方式选项时，选择 **Symlink (Recommended)**，让多个助手共用一份技能副本。

### 技能使用说明

DEVONThink MCP 支持对知识库内容进行读取、写入、修改等操作。在使用本仓库技能时，你只需要在你正在开发的项目代码仓中，填写项目的 group url，agent 调用技能时即可自动化读取。

优先级如下（从高到低排序）：

1. 用户Prompt中直接提供的有效 DEVONthink URL 来源
2. 当前会话历史中提及的有效来源
3. 项目目录的 `AGENTS.*.md`，例如 `AGENTS.env.md`、`AGENTS.local.md`
4. 项目目录的 `AGENTS.md`
5. 系统提供的 `~/.codex/AGENTS.*.md` 文档
6. 系统全局 `~/.codex/AGENTS.md` 文档

一个完整的知识库除了需要储存，还应该被检索和看见。因此，建议把下列指令粘贴到全局 AGENTS.md 文件中：

> 将 DEVONthink 知识库、项目源码和互联网资料作为常规信息来源，根据任务主动检索相关内容；涉及已有项目的需求、设计和历史决策时，先读取知识库中的相关记录，并结合当前源码及外部资料作出判断。

## 扩展美化脚本

- [KaTeX 支持脚本](extended-scripts/katex-support/devonthink-katex.js)：为 Markdown 预览加载 KaTeX。使用教程参考 [在 DEVONthink 中显示 Markdown 数学公式](tutorials/markdown-math.md)
