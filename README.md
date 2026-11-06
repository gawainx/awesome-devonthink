# awesome-devonthink

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

This project maintains DEVONthink usage guides, scripts, and skills for AI agents.

## DEVONthink Skill Set [using-dt-skills](using-dt-skills)

Agent skills for collecting source materials, writing research reports and project documents, and recording project progress in DEVONthink.

| Skill | Purpose |
| --- | --- |
| dt-source-capture | Save original PDFs and complete HTML web pages at the user's request; does not automatically archive sources cited during routine research |
| dt-writing-research-report | Conduct research, review report outlines, and write, revise, and save research reports |
| dt-writing-project-documents | Create, revise, and save requirements clarifications, design documents, development plans, retrospectives, and experiment records; prefer Markdown, using HTML for presenting experimental data or when explicitly requested |
| dt-progress-recorder | Append completed results and key decisions to the project's progress file after user acceptance |

### Installation and Updates

Use the [skills CLI](https://github.com/vercel-labs/skills) to install skills from GitHub. The commands below install the latest content from the `master` branch. To update, run the corresponding command again.

Install or update all skills:

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill '*'
```

Install or update a single skill:

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill dt-writing-project-documents
```

To pin a version, replace `master` in the URLs above with a version tag such as `v1.1.0`. To upgrade, replace it with the target version tag and run the command again.

Select your AI assistants when prompted. When asked for an installation method, choose **Symlink (Recommended)** so multiple assistants can share one copy of the skills.

### Using the Skills

DEVONthink MCP supports reading, writing, and modifying knowledge base content. To use this repository's skills, specify your project's group URL in the repository you are working on. The agent can then read it automatically when invoking a skill.

Sources are checked in the following order, from highest to lowest priority:

1. A valid DEVONthink URL provided directly in the user's prompt
2. A valid source mentioned earlier in the current conversation
3. `AGENTS.*.md` or `CLAUDE.*.md` files in the project directory, such as `AGENTS.env.md` or `AGENTS.local.md`, then `devonthink-target*.mdc` files whose names contain `.local.` under the project's `.cursor/rules/`
4. `AGENTS.md` or `CLAUDE.md` in the project directory, then the other `.mdc` files under the project's `.cursor/rules/`
5. System-provided `~/.codex/AGENTS.*.md` or `~/.claude/CLAUDE.*.md` files, then `~/.cursor/rules/devonthink-target.local.mdc`
6. The global `~/.codex/AGENTS.md` or `~/.claude/CLAUDE.md` file, then persistent `devonthink-*.mdc` files under `~/.cursor/rules/`. Cursor User Rules already present in the conversation count at this same level

The distributed rules do not include a project group URL. Write that URL into one of the files above, for example `.cursor/rules/devonthink-target.mdc` in the project, or `~/.cursor/rules/devonthink-target.mdc` for every project.

A complete knowledge base should be searched and consulted as well as used for storage. For Claude and Codex, add the following instruction to your global AGENTS.md (or CLAUDE.md) file. For Cursor, the same instruction is `devonthink-knowledge.mdc` in the rules section below.

> Treat the DEVONthink knowledge base, project source code, and online resources as regular information sources, and proactively retrieve relevant content for the task. When working on an existing project's requirements, design, or past decisions, first read the relevant knowledge base records, then form your conclusions using both the current source code and external sources.

## Cursor Rules [rules](rules)

Always-on DEVONthink instructions for Cursor.

| Rule | Purpose |
| --- | --- |
| devonthink-knowledge | Treat the DEVONthink knowledge base, project source code, and online resources as regular information sources |
| devonthink-groups | Never create a DEVONthink group or subgroup; stop and ask when a required group is missing |

### Installation and Updates

[rulesx](https://github.com/refinist/rulesx) copies `rules/*.mdc` into `.cursor/rules/` under the current working directory. It has no global install flag and cannot select a git tag. Run the command again to update. Pass `--rule 'devonthink-*'` so the installer takes only these rules. Interactive selection and `--rule '*'` also copy this repository's `AGENTS.md` and `CLAUDE.md` into the destination.

Install or update the rules for every project. `rulesx` writes relative to the current directory, so start from the home directory and the files land in `~/.cursor/rules/`:

```sh
cd "$HOME"
npx rulesx add https://github.com/gawainx/awesome-devonthink --rule 'devonthink-*'
```

Install or update them for a single project by running the `npx` command from that project's root. The files then land in that project's `.cursor/rules/`.

To pin a version, check out the tag and install from that directory:

```sh
git clone --branch v1.1.0 --depth 1 https://github.com/gawainx/awesome-devonthink.git /tmp/awesome-devonthink
cd "$HOME"
npx rulesx add /tmp/awesome-devonthink --rule 'devonthink-*'
```

## Appearance Customization Scripts

- [KaTeX support script](extended-scripts/katex-support/devonthink-katex.js): Load KaTeX for Markdown previews. See [Displaying Markdown Math in DEVONthink](tutorials/markdown-math.md) for instructions.
