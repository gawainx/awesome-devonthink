# awesome-devonthink

[English](README.md) | [简体中文](README.zh-CN.md) | 繁體中文

本專案記錄並維護 DEVONthink 的使用指南，包括腳本和適合 agent 使用的 skills。

## Using DEVONthink Skill set [using-dt-skills](using-dt-skills)

用於在 DEVONthink 中蒐集原始資料、撰寫調研報告與專案文件、記錄專案進度的 Agent Skills。

| 技能 | 用途 |
| --- | --- |
| dt-source-capture | 依使用者要求儲存 PDF 原始檔和完整 HTML 網頁，不自動歸檔一般調研中引用的資料 |
| dt-writing-research-report | 進行調研、審閱報告大綱，撰寫、修訂並儲存調研報告 |
| dt-writing-project-documents | 建立、修訂並儲存需求釐清、設計文件、開發計畫、復盤與實驗結果紀錄；優先使用 Markdown，呈現實驗資料或使用者明確要求時使用 HTML |
| dt-progress-recorder | 使用者驗收後，在專案進度檔案中追加完成結果與關鍵決策 |

### 安裝與更新

透過 [skills CLI](https://github.com/vercel-labs/skills) 從 GitHub 安裝技能。以下指令安裝 `master` 分支的最新內容；更新時，重新執行相應指令即可。

安裝或更新全套技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill '*'
```

安裝或更新單一技能：

```sh
npx skills add https://github.com/gawainx/awesome-devonthink/tree/master/using-dt-skills --global --skill dt-writing-project-documents
```

如需固定版本，可將上述 URL 中的 `master` 替換為版本 tag（例如 `v1.1.0`）；升級時，替換為目標版本 tag 後重新執行。

依提示選擇 AI 助理；出現安裝方式選項時，選擇 **Symlink (Recommended)**，讓多個助理共用同一份技能副本。

### 技能使用說明

DEVONthink MCP 支援對知識庫內容進行讀取、寫入、修改等操作。使用本儲存庫的技能時，只需在你正在開發的專案程式碼儲存庫中填入專案的 group URL，agent 呼叫技能時即可自動讀取。

優先順序如下（由高到低）：

1. 使用者 Prompt 中直接提供的有效 DEVONthink URL 來源
2. 目前對話歷史中提及的有效來源
3. 專案目錄中的 `AGENTS.*.md` 或 `CLAUDE.*.md`，例如 `AGENTS.env.md`、`AGENTS.local.md`
4. 專案目錄中的 `AGENTS.md` 或 `CLAUDE.md`
5. 系統提供的 `~/.codex/AGENTS.*.md` 或 `~/.claude/CLAUDE.*.md` 文件
6. 系統全域的 `~/.codex/AGENTS.md` 或 `~/.claude/CLAUDE.md` 文件

一個完整的知識庫除了用於儲存，還應該能被檢索和看見。因此，建議將下列指令貼到全域 AGENTS.md（或 CLAUDE.md）檔案中：

> 將 DEVONthink 知識庫、專案原始碼和網路資料作為常規資訊來源，根據任務主動檢索相關內容；涉及既有專案的需求、設計和歷史決策時，先讀取知識庫中的相關紀錄，並結合目前原始碼及外部資料做出判斷。

## 擴充美化腳本

- [KaTeX 支援腳本](extended-scripts/katex-support/devonthink-katex.js)：為 Markdown 預覽載入 KaTeX。使用教學請參考 [在 DEVONthink 中顯示 Markdown 數學公式](tutorials/markdown-math.zh-CN.md)（簡體中文）
