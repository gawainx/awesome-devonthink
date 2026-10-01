# Git 全局条目链接门禁

此目录保存本机全局 Git hooks 的可复用副本。门禁使用固定格式正则识别完整的 DEVONthink 条目链接，不枚举 UUID，也不拦截单独出现的 UUID。

## 文件与行为

| 文件 | 职责 |
| --- | --- |
| item-link-guard | 检查 Git 暂存对象或待推送对象，命中后拒绝操作，不回显链接内容 |
| pre-commit | 提交前检查暂存内容和文件路径 |
| prepare-commit-msg | 检查暂存内容与初始提交信息 |
| commit-msg | 检查最终提交信息与暂存内容，并保留原有非空提交信息检查 |
| pre-merge-commit | 创建合并提交前检查暂存内容 |
| pre-applypatch | 应用邮件补丁后、创建提交前检查暂存内容 |
| pre-push | 检查待推送对象后，将原始输入交给既有推送 hook |
| pre-push.before-item-link-guard | 本机原有 Git LFS 推送 hook，供 pre-push 调用 |

检查直接读取 Git 对象，覆盖文本、二进制内容和符号链接目标，不按文件扩展名筛选。读取采用固定大小分块，并保留块边界重叠，以识别跨块出现的完整链接；同一次检查中的相同对象只读取一次。子模块内容由子模块自身的 Git 仓库检查。

推送检查覆盖待推送历史中的对象，因此中间提交加入、后续提交删除的链接仍会被拦截。新分支或本地缺少远端基点对象时会检查该引用的可达历史，耗时取决于对象数量和总大小。

## 使用方式

运行环境需要 Git、POSIX shell 和 Perl 的核心模块 IPC::Open2；本快照保留的 Git LFS 推送 hook 还需要 git-lfs。

先用 `git config --global --get core.hooksPath` 检查当前全局 hooks 目录。将门禁文件部署到该目录并保留可执行权限；没有配置时，选择专用目录并使用 `git config --global core.hooksPath <目录绝对路径>` 配置。不要直接覆盖已有 hooks，应先备份并合并其行为。

本目录中的 pre-push 依赖同目录的 pre-push.before-item-link-guard。迁移到其他机器时，该文件应保留目标机器原有的推送行为；没有原有推送 hook 时，可以将其替换为成功退出的空操作脚本。此目录是文件副本，不会自动安装或改变全局配置。

全局配置适用于未覆盖 core.hooksPath 的仓库。Git 允许仓库或命令行覆盖 hooks 配置，部分底层提交命令也不触发这些 hooks，因此本地 hooks 不是不可绕过的权限控制。
