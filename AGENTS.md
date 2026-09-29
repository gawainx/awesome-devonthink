# AGENTS.md

## 目录结构

- `toolbar-scripts` 存放适用于DEVONthink toolbar的apple scripts脚本
- `using-dt-skills` 存放适用于agent使用的DEVONthink skills。

## 开发原则

- 技能包需要满足使用 `npx skills add` 的方式完成安装

## 版本号管理

本仓库使用 `vx.y.z` 标准版本号格式，例如 `v1.0.0`。用户要求发版后，需要根据历史版本 tag，默认为 major update，例如 `v0.1.0` 更新到 `v0.2.0`。如果用户提及为 bugfix，则为patch update，即 `v0.1.0 to v0.1.1`。你需要先保证当前工作区所有内容已经提交，然后打 tag 并推送到 remote。

本仓库起始版本号为 `v1.0.0`
