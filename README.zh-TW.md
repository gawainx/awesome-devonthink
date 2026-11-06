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
3. 專案目錄中的 `AGENTS.*.md` 或 `CLAUDE.*.md`，例如 `AGENTS.env.md`、`AGENTS.local.md`，然後是專案 `.cursor/rules/` 中檔名包含 `.local.` 的 `devonthink-target*.mdc`
4. 專案目錄中的 `AGENTS.md` 或 `CLAUDE.md`，然後是專案 `.cursor/rules/` 中的其餘 `.mdc`
5. 系統提供的 `~/.codex/AGENTS.*.md` 或 `~/.claude/CLAUDE.*.md`，然後是 `~/.cursor/rules/devonthink-target.local.mdc`
6. 系統全域的 `~/.codex/AGENTS.md` 或 `~/.claude/CLAUDE.md`，然後是 `~/.cursor/rules/` 中常駐的 `devonthink-*.mdc`。已經注入目前上下文的 Cursor User Rules 與這一級並列

隨規則分發的檔案裡不包含專案群組 URL。把這個 URL 寫進上面某一級的檔案，例如專案內的 `.cursor/rules/devonthink-target.mdc`，或對所有專案生效的 `~/.cursor/rules/devonthink-target.mdc`。

一個完整的知識庫除了用於儲存，還應該能被檢索和看見。Claude 與 Codex 將下列指令貼到全域 AGENTS.md（或 CLAUDE.md）。Cursor 的同一條指令在下一節的 `devonthink-knowledge.mdc` 中。

> 將 DEVONthink 知識庫、專案原始碼和網路資料作為常規資訊來源，根據任務主動檢索相關內容；涉及既有專案的需求、設計和歷史決策時，先讀取知識庫中的相關紀錄，並結合目前原始碼及外部資料做出判斷。

## Cursor 規則 [rules](rules)

給 Cursor 使用的 DEVONthink 常駐指令。

| 規則 | 用途 |
| --- | --- |
| devonthink-knowledge | 將 DEVONthink 知識庫、專案原始碼和網路資料作為常規資訊來源 |
| devonthink-groups | 不建立 DEVONthink 群組或子群組；所需群組不存在時停下來詢問使用者 |

### 安裝與更新

[rulesx](https://github.com/refinist/rulesx) 會把 `rules/*.mdc` 複製到目前工作目錄下的 `.cursor/rules/`。它沒有全域安裝參數，也不能選擇 git tag。更新時重新執行同一條指令。安裝時加上 `--rule 'devonthink-*'`，只取這些規則。互動選擇和 `--rule '*'` 還會把本儲存庫的 `AGENTS.md` 與 `CLAUDE.md` 複製到目標目錄。

為所有專案安裝或更新時，先進入使用者主目錄。rulesx 依目前目錄寫入，檔案會落到 `~/.cursor/rules/`：

```sh
cd "$HOME"
npx rulesx add https://github.com/gawainx/awesome-devonthink --rule 'devonthink-*'
```

只給一個專案安裝或更新時，在該專案根目錄執行上面的 `npx` 指令。檔案會落到該專案的 `.cursor/rules/`。

需要固定版本時，先檢出對應 tag，再從該目錄安裝：

```sh
git clone --branch v1.1.0 --depth 1 https://github.com/gawainx/awesome-devonthink.git /tmp/awesome-devonthink
cd "$HOME"
npx rulesx add /tmp/awesome-devonthink --rule 'devonthink-*'
```

## 擴充美化腳本

- [KaTeX 支援腳本](extended-scripts/katex-support/devonthink-katex.js)：為 Markdown 預覽載入 KaTeX。使用教學請參考 [在 DEVONthink 中顯示 Markdown 數學公式](tutorials/markdown-math.zh-CN.md)（簡體中文）
