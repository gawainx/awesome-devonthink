---
name: dt-source-capture
description: Save materials to DEVONthink when the user explicitly asks to save raw materials, PDF files, or web pages. Do not capture automatically during ordinary research, reading, or citation.
---

# Raw Sources

Collect and save PDF files and HTML web pages. Perform operations through the DEVONthink MCP.

**Never create any group or subgroup in DEVONthink, under any circumstances. If a required group does not exist, stop and ask the user.** This rule covers groups only: creating documents (files such as `.md` or `.html` records) inside an existing group is allowed.

## Content Rules

1. Capture only when the user asks to save raw materials, limited to the scope the user requested; if the user explicitly specifies another format or method, follow it. Ordinary research, reading, and citation never trigger archiving.
2. Keep PDFs as the original file, saved in PDF format; never substitute extracted text or a summary for the original.
3. Save web pages as HTML by default, keeping the full page with content extraction disabled. When calling a web capture tool that supports a `readability` parameter, explicitly set it to `false` and set the format to `html`.

## Workflow

1. Determine the PDF files or web page URLs the user wants saved from the conversation history and agent execution history. Do not repeatedly ask the user for sources at this step; decide automatically based on prior research results.
2. Determine the save location according to the "DEVONthink Write Target Rules" in this file.
3. Import the original PDF file, or capture the web page as full HTML, through the MCP. For a PDF download link, fetch the actual PDF and import it; never save the download page as the PDF. When the web page URL or PDF source link is known, keep the source information for later traceability.
4. Check that the saved result is the intended material in the intended format, then return the Markdown item link of the record actually saved.

## DEVONthink Write Target Rules

If the user explicitly specifies a save location, use it. Otherwise, determine the target database from the sources below in order of priority, and use the `raw-resources` group at the root of that database as the save location.

If a source provides a database link, use that database; if it provides a project group or another item link as a way to locate the database, get its database through the MCP. Locate objects directly by the identifier in the link; do not re-search by the link's display name.

Use the first source, in order of priority, that determines the target database, and stop there. If no unique target database can be determined, or the database root has no `raw-resources` group, stop and ask the user; do not create or choose another location yourself.

1. A valid DEVONthink URL given directly in the user's prompt
2. A valid source mentioned in the current conversation history
3. `AGENTS.*.md` or `CLAUDE.*.md` in the project directory, e.g. `AGENTS.env.md`, `AGENTS.local.md`
4. `AGENTS.md` or `CLAUDE.md` in the project directory
5. System-provided `~/.codex/AGENTS.*.md` or `~/.claude/CLAUDE.*.md`
6. Global `~/.codex/AGENTS.md` or `~/.claude/CLAUDE.md`
