# using-dt-skills

用于在 DEVONthink 中收集原始资料、编写调研报告与项目文档、记录项目进度的 Agent Skills。

## 技能

| 技能 | 用途 |
| --- | --- |
| dt-source-capture | 按用户要求保存 PDF 原件和完整 HTML 网页，不自动归档普通调研中引用的资料 |
| dt-writing-research-report | 开展调研、审核报告大纲，编写、修订和保存调研报告 |
| dt-writing-project-documents | 创建、修订和保存需求澄清、设计文档与开发计划 |
| dt-progress-recorder | 用户验收后，向项目进度文件追加完成结果与关键决策 |

## 安装

通过 [skills CLI](https://github.com/vercel-labs/skills) 安装：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global
```

按提示选择技能和 AI 助手。出现安装方式选项时，选择 **Symlink (Recommended)**，让多个助手共用一份技能副本。

如需仅在某个项目中使用，在该项目目录执行上述命令并省略 `--global`。
