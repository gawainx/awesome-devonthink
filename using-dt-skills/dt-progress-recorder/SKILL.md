---
name: dt-progress-recorder
description: Record project progress in DEVONthink after a requirement has been implemented and the user has accepted it. Use when a requirement is complete and the user explicitly states acceptance.
---

# Project Progress Recording

Record completed requirements in the project's dedicated `progress.md` file. Read and write records through the DEVONthink MCP; if the MCP is unavailable, stop and tell the user. Add a new entry only after the user has accepted the work.

**Never create any group or subgroup in DEVONthink, under any circumstances. If a required group does not exist, stop and ask the user.** This rule covers groups only: creating documents (files such as `.md` or `.html` records) inside an existing group is allowed.

## Content Rules

Project progress is recorded in a single `progress.md` file covering requirement development and completion. Content must follow these rules:

1. The file content must be a single top-level list. Each item is the progress of one requirement and may contain only one paragraph; never use line breaks inside an item under any circumstances.
2. Record the requirement information and the user's key decisions as continuous prose.
3. Each item starts with `<requirement-id>(<8-char git hash>)`, e.g. `- r001(asbdhxfs): Initialized the skills repository; the user explicitly required installation via the standard npx skills method`. `<8-char git hash>` is the HEAD hash after the requirement is completed and its changes are committed.

### Prohibited

1. Do not over-record implementation details, e.g. "implemented xxx using MainActor".
2. Do not record routine log information such as "xxx unit tests passed" or "user accepted".
3. Do not modify existing entries.

## Workflow

1. Locate the target file according to the `DEVONthink Write Target Rules`; a single `progress.md` markdown file is expected. If multiple candidate progress files exist, ask the user to decide; never silently write to any "default" location.
2. If the project group exists but has no `progress.md` file, you may create an empty `progress.md` document directly in that project group and continue. This creates a file, not a group.
3. Read the last line of the existing content to get the highest existing requirement ID, and increment it for the new entry; if the file is empty, start from r001.
4. Append the entry: write only at the end of the file. Never write at the beginning of the file or reorder existing content.

## Output Requirements

1. Do not tag files or groups unless the user explicitly asks.

## DEVONthink Write Target Rules

Use only sources explicitly designated as the current project's progress file or project group; other document links are not write targets. Check the following in order of priority, use the first one that provides a source, and stop there; if none provides one, stop and ask the user:

1. A valid DEVONthink URL given directly in the user's prompt
2. `AGENTS.*.md` or `CLAUDE.*.md` in the project directory, e.g. `AGENTS.env.md`, `AGENTS.local.md`
3. `AGENTS.md` or `CLAUDE.md` in the project directory
4. System-provided `~/.codex/AGENTS.*.md` or `~/.claude/CLAUDE.*.md`
5. Global `~/.codex/AGENTS.md` or `~/.claude/CLAUDE.md`
