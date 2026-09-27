# using-dt-skills

用于在 DEVONthink 中保存原始资料、调研报告和项目文档的 Agent Skills。

## 技能

| 技能 | 用途 |
| --- | --- |
| source-capture | 保存已有 PDF 文件和网页资料 |
| research-report | 编写、修订和保存调研文档与报告 |
| dt-writing-project-documents | 创建、修订和保存需求澄清、设计文档与开发计划 |

## 安装

通过 [skills CLI](https://github.com/vercel-labs/skills) 安装：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global
```

按提示选择技能和 AI 助手。出现安装方式选项时，选择 **Symlink (Recommended)**，让多个助手共用一份技能副本。

如需仅在某个项目中使用，在该项目目录执行上述命令并省略 `--global`。
