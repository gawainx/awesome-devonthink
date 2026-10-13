---
name: dt-writing-research-report
description: Use this skill when the user asks for a research, analysis, or report document; it creates or revises research documents to be saved in DEVONthink.
---

# Research Report

Write, revise, and save research documents and reports. Read and write records through the DEVONthink MCP; if the MCP is unavailable, stop.

**Never create any group or subgroup in DEVONthink, under any circumstances. If a required group does not exist, stop and ask the user.** This rule covers groups only: creating documents (files such as `.md` or `.html` records) inside an existing group is allowed, and so is creating tags as described in Output Requirements.

## Content Rules

The deliverable of this skill is a human-readable research report. Content must follow these rules:

1. The report must faithfully present the research findings.
2. Do not use marketing phrases such as "one-sentence summary" or "building a mental map". The purpose of a research report is to inform the user's decisions; do not summarize or decide on the user's behalf. Draw conclusions only from the research information available, and do not use hedging or disclaimer statements, e.g. "the available information focuses on model xx / version xx, but does not show that conclusion xx applies to all scenarios".
3. Do not dump raw experiment data, and without the user's consent do not record any information about the user's environment, absolute paths, or anything that leaks the user's source directories.
4. Deliver in markdown by default. If the user explicitly mentions another format, that takes precedence.
5. Use level-2 headings to separate the different aspects of the report.
6. Use cross-references appropriately to link existing information in the DEVONthink database, and faithfully record research sources.
7. If the user asks to keep the original materials, use the dt-source-capture skill to save the original sources.

### Using Multimedia

DEVONthink supports multimedia content, and Markdown supports mermaid and MathJax rendering, so images, flowcharts, etc. may be used for full expression. Never, under any circumstances or for any reason, embed images or other media files into Markdown or HTML as base64. Import images as follows:

1. Find the existing attachment group: if the source includes a group the user designated for attachments, use it directly; otherwise use the existing `Assets` or `medias` group (first letter in either case) in the database containing the user-provided group. If none exists, stop and ask the user.
2. Import the image or other attachment into that group and get its full x-devonthink-item link.
3. Insert the image according to the document format in use (md or html).

## Workflow

1. Following the user's request, research thoroughly on the internet and hold any necessary discussion with the user.
2. Draft the report outline and ask the user to review it.
3. Based on the user's feedback, do supplementary research, write the report, and determine the write location according to the "DEVONthink Write Target Rules" section.
4. Before writing, if a research report already exists, read it, compare contents, report the differences to the user, and confirm whether to modify or append. If the user has already explicitly asked to modify or append, do not repeatedly ask for a decision.
5. Write in the agreed way, then report the output path to the user.

## Output Requirements

1. You may add 2 to 3 tags to the output, preferring existing DEVONthink tags; if no suitable tag exists, you may create new ones. Do not use project details such as requirement IDs as tags.

## DEVONthink Write Target Rules

Check the following in order of priority, use the first one that provides a source, and stop there; if none provides one, stop and ask the user:

1. A valid DEVONthink URL given directly in the user's prompt
2. A valid source mentioned in the current conversation history
3. `AGENTS.*.md` or `CLAUDE.*.md` in the project directory, e.g. `AGENTS.env.md`, `AGENTS.local.md`
4. `AGENTS.md` or `CLAUDE.md` in the project directory
5. System-provided `~/.codex/AGENTS.*.md` or `~/.claude/CLAUDE.*.md`
6. Global `~/.codex/AGENTS.md` or `~/.claude/CLAUDE.md`
