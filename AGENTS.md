# AGENTS.md

## Directory Structure

- `toolbar-scripts` contains AppleScript scripts for the DEVONthink toolbar
- `using-dt-skills` contains DEVONthink skills for agents to use

## Development Principles

- Skills must be installable via `npx skills add`

## Version Management

This repository uses the standard `vx.y.z` version format, e.g. `v1.0.0`. When the user asks for a release, base the new version on the existing version tags. By default it is a major update, e.g. `v0.1.0` to `v0.2.0`. If the user says it is a bugfix, it is a patch update, i.e. `v0.1.0` to `v0.1.1`. First make sure everything in the working tree is committed, then create the tag and push it to the remote.

The initial version of this repository is `v1.0.0`.
