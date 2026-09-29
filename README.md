# awesome-devonthink

本项目记录和维护 DEVONthink 的使用指南，包括脚本和适合agent使用的skills

## Using DEVONthink Skill set [using-dt-skills](using-dt-skills)

用于在 DEVONthink 中收集原始资料、编写调研报告与项目文档、记录项目进度的 Agent Skills。

| 技能 | 用途 |
| --- | --- |
| dt-source-capture | 按用户要求保存 PDF 原件和完整 HTML 网页，不自动归档普通调研中引用的资料 |
| dt-writing-research-report | 开展调研、审核报告大纲，编写、修订和保存调研报告 |
| dt-writing-project-documents | 创建、修订和保存需求澄清、设计文档、开发计划、复盘与实验结果记录；Markdown 优先，实验数据呈现或用户明确要求时使用 HTML |
| dt-progress-recorder | 用户验收后，向项目进度文件追加完成结果与关键决策 |

通过 [skills CLI](https://github.com/vercel-labs/skills) 全局安装，按提示选择技能和 AI 助手：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global
```

出现安装方式选项时，选择 **Symlink (Recommended)**，让多个助手共用一份技能副本。

例如，仅为 Codex 安装项目文档写作技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill dt-writing-project-documents --agent codex --yes
```

如需仅在某个项目中使用，在该项目目录执行安装命令并省略 `--global`。

## 使用教程

- [在 DEVONthink 中显示 Markdown 数学公式](tutorials/markdown-math.md)：开启 MathJax，或配置自定义 KaTeX 预览。

## 扩展脚本

- [KaTeX 支持脚本](extended-scripts/katex-support/devonthink-katex.js)：为 Markdown 预览加载 KaTeX。
