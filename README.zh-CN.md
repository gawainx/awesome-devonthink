# awesome-devonthink

[English](README.md) | 简体中文 | [繁體中文](README.zh-TW.md)

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

通过 [skills CLI](https://github.com/vercel-labs/skills) 从 GitHub 安装技能。以下命令安装 `master` 分支的最新内容；更新时，重新执行相应命令。

安装或更新全套技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill '*'
```

安装或更新单个技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill dt-writing-project-documents
```

如果需要固定版本，可将上述 URL 中的 `master` 替换为版本 tag（例如 `v1.1.0`）；升级时，替换为目标版本 tag 后重新执行。

按提示选择 AI 助手；出现安装方式选项时，选择 **Symlink (Recommended)**，让多个助手共用一份技能副本。

### 技能使用说明

DEVONThink MCP 支持对知识库内容进行读取、写入、修改等操作。在使用本仓库技能时，你只需要在你正在开发的项目代码仓中，填写项目的 group url，agent 调用技能时即可自动化读取。

优先级如下（从高到低排序）：

1. 用户Prompt中直接提供的有效 DEVONthink URL 来源
2. 当前会话历史中提及的有效来源
3. 项目目录的 `AGENTS.*.md` 或 `CLAUDE.*.md`，例如 `AGENTS.env.md`、`AGENTS.local.md`，然后是项目 `.cursor/rules/` 中文件名包含 `.local.` 的 `devonthink-target*.mdc`
4. 项目目录的 `AGENTS.md` 或 `CLAUDE.md`，然后是项目 `.cursor/rules/` 中的其余 `.mdc`
5. 系统提供的 `~/.codex/AGENTS.*.md` 或 `~/.claude/CLAUDE.*.md`，然后是 `~/.cursor/rules/devonthink-target.local.mdc`
6. 系统全局 `~/.codex/AGENTS.md` 或 `~/.claude/CLAUDE.md`，然后是 `~/.cursor/rules/` 中常驻的 `devonthink-*.mdc`。已经注入当前上下文的 Cursor User Rules 与这一级并列

随规则分发的文件里不包含项目组 URL。把这个 URL 写进上面某一级的文件，例如项目内的 `.cursor/rules/devonthink-target.mdc`，或对所有项目生效的 `~/.cursor/rules/devonthink-target.mdc`。

一个完整的知识库除了需要储存，还应该被检索和看见。Claude 与 Codex 把下列指令粘贴到全局 AGENTS.md（或 CLAUDE.md）。Cursor 的同一条指令在下一节的 `devonthink-knowledge.mdc` 中。

> 将 DEVONthink 知识库、项目源码和互联网资料作为常规信息来源，根据任务主动检索相关内容；涉及已有项目的需求、设计和历史决策时，先读取知识库中的相关记录，并结合当前源码及外部资料作出判断。

## Cursor 规则 [rules](rules)

给 Cursor 使用的 DEVONthink 常驻指令。

| 规则 | 用途 |
| --- | --- |
| devonthink-knowledge | 将 DEVONthink 知识库、项目源码和互联网资料作为常规信息来源 |
| devonthink-groups | 不创建 DEVONthink 分组或子分组；所需分组不存在时停下来询问用户 |

### 安装与更新

[rulesx](https://github.com/refinist/rulesx) 把 `rules/*.mdc` 复制到当前工作目录下的 `.cursor/rules/`。它没有全局安装参数，也不能选择 git tag。更新时重新执行同一条命令。安装时带上 `--rule 'devonthink-*'`，只取这些规则。交互选择和 `--rule '*'` 还会把本仓库的 `AGENTS.md` 与 `CLAUDE.md` 复制到目标目录。

为所有项目安装或更新时，先进入用户主目录。rulesx 按当前目录写入，文件会落到 `~/.cursor/rules/`：

```sh
cd "$HOME"
npx rulesx add https://github.com/gawainx/awesome-devonthink --rule 'devonthink-*'
```

只给一个项目安装或更新时，在该项目根目录执行上面的 `npx` 命令。文件会落到该项目的 `.cursor/rules/`。

需要固定版本时，先检出对应 tag，再从该目录安装：

```sh
git clone --branch v1.1.0 --depth 1 https://github.com/gawainx/awesome-devonthink.git /tmp/awesome-devonthink
cd "$HOME"
npx rulesx add /tmp/awesome-devonthink --rule 'devonthink-*'
```

## 扩展美化脚本

- [KaTeX 支持脚本](extended-scripts/katex-support/devonthink-katex.js)：为 Markdown 预览加载 KaTeX。使用教程参考 [在 DEVONthink 中显示 Markdown 数学公式](tutorials/markdown-math.zh-CN.md)
