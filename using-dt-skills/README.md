# using-dt-skills

本目录用于维护可直接编辑的 DEVONthink 技能，通过现成的 [skills CLI](https://github.com/vercel-labs/skills) 安装。本文件确定技能包的技术组织与安装方式；技能正文和支持文件由维护者直接编写、修改和重组。

## 目录结构

每个技能使用一个独立目录，目录内的 `SKILL.md` 是入口：

```text
using-dt-skills/
├── README.md
├── source-capture/
│   └── SKILL.md
├── research-report/
│   └── SKILL.md
└── project-documents/
    └── SKILL.md
```

| 技能入口 | 职责 |
| --- | --- |
| [source-capture](source-capture/SKILL.md) | 保存原始 PDF 和网页资料 |
| [research-report](research-report/SKILL.md) | 编写、修订和保存调研文档与报告 |
| [project-documents](project-documents/SKILL.md) | 创建、修订和保存需求澄清、设计文档与开发计划 |

三个入口目前为可安装的骨架，正文预留了内容规范、执行流程和产物要求的编辑位置。章节可直接修改或重组；需要支持文件时，再在对应技能目录中添加 `references/` 等目录。

`SKILL.md` 使用标准 YAML frontmatter，至少包含 `name` 和 `description`，正文使用 Markdown。`name` 与目录名一致，使用小写字母、数字和连字符。`description` 描述技能的用途和触发条件。格式依据 [Agent Skills specification](https://agentskills.io/specification)。

`using-dt-skills` 是容纳技能的目录，本层不放 `SKILL.md`，避免安装器将整个集合识别为一个技能。增加技能只需增加相应目录，无需注册清单、npm 包或构建步骤。

## 文件与引用

技能正文、规范和参考资料均保留为普通可编辑文件。增加支持文件时，在 `SKILL.md` 中说明用途，并使用相对于该技能目录的路径引用，例如 `[操作说明](references/operations.md)`。具体文件名称和内容组织由维护者决定。

安装器按技能目录复制内容，不会自动打包技能目录之外的文件。可随包分发的引用应在技能目录内部闭合；不能依赖 `../` 指向集合根目录中的公共文件。采用现成安装器时，不增加公共文件同步或生成机制。后续确有跨技能共享需求时，再按实际内容处理。

技能通过运行环境提供的 DEVONthink MCP 执行操作。安装技能不会安装、启动或配置 MCP。工具参数以运行时提供的接口定义为准，技能文件只需承载实际工作所需的说明。

## 安装

以下命令可发现并安装这三个技能骨架；具体业务规范在各自的 `SKILL.md` 中维护。

默认采用安装器的 Symlink 方式：用户从发布来源安装一份技能到公共目录，各 runtime 直接读取或通过符号链接使用这份副本。安装方式由 skills CLI 控制，技能包不提供自定义安装逻辑。

从 GitHub 的技能集合目录安装到用户范围，由用户选择 runtime：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global
```

使用明确的子目录 URL，将发现范围限定在本技能集合。安装器负责选择技能和 runtime；出现安装方式选项时，使用 `Symlink (Recommended)`。不传 `--copy`，也不使用 `--all` 自动选择所有 runtime。

上述 `master` 地址指向开发分支。正式发布时，用已发布的 Git tag 替换 URL 中的 `master`，使用户安装对应版本的技能内容。当前骨架尚未创建发布 tag。

例如，用户选择 Codex 和 Claude Code 后，可以使用以下非交互安装命令；runtime 名称是示例，不是技能包的固定要求：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --agent codex claude-code --skill '*' --yes
```

`skills@1.7.0` 在多个不同目标目录、未传 `--copy` 且使用 `--yes` 时默认采用 Symlink。只有一个目标目录时，安装器自动采用 Copy；对于 Codex，目标就是公共 `.agents/skills` 目录，不会因此生成多份 runtime 专属副本。安装器没有供技能包声明强制 Symlink 的配置，也没有公开的 `--symlink` 参数。

在本仓库根目录，列出本地技能：

```sh
npx skills add ./using-dt-skills --list
```

维护者也可以从本地目录安装，使用相同的 runtime 和安装方式选择：

```sh
npx skills add ./using-dt-skills --global
```

如只需其中一个技能，在命令末尾加 `--skill <skill-name>`。如需项目范围安装，从目标项目目录执行命令并省略 `--global`；本地源路径应指向本仓库的 `using-dt-skills` 目录。

## 编辑与再次安装

维护者直接编辑本仓库中的技能文件，无需编译；提交内容并发布 Git tag 后，用户通过对应发布地址安装。

Symlink 连接的是安装后的公共副本和 runtime 目录。修改这份公共副本时，共用它的 runtime 会读取同一份文件。

已安装的文件也可以直接编辑。但安装器再次安装时会重建目标技能目录，不能将安装目录的改动视为会被自动保留或合并。需要长期保留的修改应同步回自己维护的源文件，再从该来源安装。这里沿用安装器的既有行为，不增加自动更新、覆盖层或自定义合并逻辑。

## 技术验证范围

实现具体技能后，检查安装器能否发现它、安装后的支持文件是否完整，以及正文引用能否在安装目录中解析。这些检查针对打包和路径；技能内容是否达到预期，应使用对应的真实任务检验。

## 技术依据

- [skills CLI：来源格式、技能选择、安装范围和安装方式](https://github.com/vercel-labs/skills)
- [技能发现实现](https://github.com/vercel-labs/skills/blob/main/src/skills.ts)
- [文件复制与安装目录处理实现](https://github.com/vercel-labs/skills/blob/main/src/installer.ts)
- [Agent Skills 格式规范](https://agentskills.io/specification)
