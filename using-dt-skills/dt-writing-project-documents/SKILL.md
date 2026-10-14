---
name: dt-writing-project-documents
description: Create or revise project documents to be saved in DEVONthink. Use when the user asks to write or update requirement clarifications, design documents, development plans, retrospectives, or experiment result records. Supports Markdown and HTML.
---

# Project Document Writing

Create, revise, and save project documents. Read and write records through the DEVONthink MCP.

**Never create any group or subgroup in DEVONthink, under any circumstances. If a required group does not exist, stop and ask the user.**

## Document Types

- Requirement clarifications, designs, development plans, development process records, retrospectives, and records or summaries of experiment results are treated as project engineering-state documents by default. Faithfully record the current project state, existing implementation, plans, and process information without repeatedly confirming the type.
- Documents for external publication are treated as formal release documents: do not disclose internal engineering-state information such as mock API implementations or automated tests; keep only formal content intended for the audience.
- If the document type cannot be reliably determined, confirm with the user before writing.

## Document Format

Prefer Markdown, used for requirement clarifications, design documents, development plans, handoff documents, progress records, etc. Use HTML when presenting experiment data or when the user explicitly asks for it.

### Using Multimedia

DEVONthink supports multimedia content, and Markdown supports mermaid and MathJax rendering, so images, flowcharts, etc. may be used for full expression. Never, under any circumstances or for any reason, embed images or other media files into Markdown or HTML as base64. Import images as follows:

1. Find the existing attachment group: if the source includes a group the user designated for attachments, use it directly; otherwise use the existing `Assets` or `medias` group (first letter in either case) in the database containing the user-provided group. If none exists, stop and ask the user.
2. Import the image or other attachment into that group and get its full x-devonthink-item link.
3. Insert the image according to the document format in use (md or html).

### HTML Requirements

1. Use the `effective-html` plugin to produce the final HTML page. The plugin only produces the page; final save location and delivery follow this skill's DEVONthink workflow. If the plugin is not available in the current environment, write the HTML directly following this section. Make full use of charts to improve readability; do not use HTML for its own sake, and do not write Markdown first and mechanically convert it to HTML.
2. All math formulas in the HTML must render correctly.
3. The deliverable must be a single HTML file that opens directly in a browser.
4. Do not write unit tests for generated HTML, and do not use Computer Use or Browser Use for style verification. Keep these restrictions when invoking the plugin, and skip its browser style-verification flow.

## Content Rules

Project documents include requirement clarifications, design documents, development plans, retrospectives, and experiment result records. Content must satisfy the following constraints:

1. Unless the user explicitly asks, do not record development-process logs, including but not limited to "xx tests passed" or "added xx files, xx functions".
2. Record the date at the beginning of the document, precise to the day only, without time of day.
3. Use cross-references properly: DEVONthink's cross-reference feature may be used to link documents to each other.
4. When content comes from another skill's output or a summary of conversation history, it must still satisfy these requirements, but do not alter the document's core content.
5. For each requirement, the "requirement clarification, design document, development plan" sections go in one document by default, separated by level-2 headings.
6. Content must faithfully reflect user-provided information and objective facts about the project, without exaggeration and without omitting existing implementation. Do not add qualifiers such as "scope of applicability", "experimental limits", "not found", or "cannot prove" on your own; record them only when the user explicitly asks or existing objective materials explicitly contain them. Do not use disclaimers such as "xxx experiment has not been run, so xxx cannot be determined"; describe facts and their corresponding conclusions objectively.
7. Write in the language the user commonly uses, keeping code and technical terms in English. Keep each Markdown body paragraph on a single line; break lines only where structures such as headings, lists, tables, and code blocks require it, and never insert hard line breaks to control display width.
8. Use absolute paths when referring to file paths; for non-local environments, include the server IP.

### Document Naming

1. Project document names start with the requirement ID, e.g. `r001 Project Init.md` or `r002 Experiment Results.html`. Requirement IDs strictly increase, and the extension matches the chosen format.
2. Write names as readable titles with normal spaces; do not replace spaces with hyphens or underscores. Keep names reasonably short.

## Workflow

1. Get the target group according to the `DEVONthink Write Target Rules` section of this file. If no source provides a target group, stop and tell the user.
2. If the user provided only the project group, write directly into that project group. Never create or use a `docs` subgroup.
3. Write the document according to the type, format, and content rules, then write it in the chosen format to the target group through the DEVONthink MCP.
4. After writing, report the list of files written. You must use markdown links to explicitly tell the user each file's location and x-devonthink-item, e.g. `Document written: [Prefill P1 GPU0 GEMM and Chunk Validation](<DEVONthink item link>)`. Never write silently.
5. If the MCP fails, stop and report issues; do not use Computer Use or similar features to start the MCP, and do not write to the code repository's local `docs/` folder on disk on your own.

## Output Requirements

1. Do not tag files or groups unless the user explicitly asks.

## DEVONthink Write Target Rules

Check the following in order of priority, use the first one that provides a source, and stop there; if none provides one, stop and ask the user:

1. A valid DEVONthink URL given directly in the user's prompt
2. A valid source mentioned in the current conversation history
3. `AGENTS.*.md` or `CLAUDE.*.md` in the project directory, e.g. `AGENTS.env.md`, `AGENTS.local.md`
4. `AGENTS.md` or `CLAUDE.md` in the project directory
5. System-provided `~/.codex/AGENTS.*.md` or `~/.claude/CLAUDE.*.md`
6. Global `~/.codex/AGENTS.md` or `~/.claude/CLAUDE.md`
