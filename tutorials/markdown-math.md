# 在 DEVONthink 中显示 Markdown 数学公式

DEVONthink 内置 MathJax。需要替换预览中的公式渲染引擎时，可以通过 Markdown 的自定义 JavaScript 设置加载 KaTeX。本文面向 Mac 版 DEVONthink，设置名称以 DEVONthink 4.4 为参考。

## 开启内置 MathJax

1. 打开 **DEVONthink → Settings（设置）**，或按 `⌘,`。
2. 进入 **Files（文件）→ Markdown**。
3. 在 **Extensions（扩展）** 中勾选 **MathJax support**。
4. 打开 Markdown 文档，切换到 **Preview（预览）** 或左右并排视图。
5. 如果希望编辑时也显示公式，在同一设置页启用 **WYSIWYG tables, images, links & MathJax**。

内置支持不需要额外安装脚本或样式表。官方使用说明要求启用 MathJax，但没有声明出厂默认勾选状态；检查设置页即可确认是否已经开启。参见 [DEVONtechnologies 的公式使用说明](https://shop.devontechnologies.com/blog/20230221-equations-markdown)。

## 改用 KaTeX

本仓库提供 [devonthink-katex.js](../extended-scripts/katex-support/devonthink-katex.js)。脚本通过 jsDelivr 加载固定版本 KaTeX 0.18.9 的样式、字体、核心脚本和自动渲染扩展，需要联网。公式在本机预览中渲染，脚本没有上传文档内容的逻辑。

### 配置步骤

1. 将 `devonthink-katex.js` 保存到一个稳定位置。如果从 GitHub 下载，打开脚本的 Raw 内容并保存，避免下载成 GitHub 网页。
2. 进入 **Settings → Files → Markdown**，取消勾选 **MathJax support**，避免两个引擎同时处理公式。
3. 在 **JavaScript → Select…** 中选择该脚本。若已配置其他脚本，先保存原设置，并将需要保留的代码合并到一个文件后再选择。
4. 保留原来的 **Style Sheet** 设置。脚本会额外加载 KaTeX 所需 CSS，不需要用它替换文档主题。
5. 重新打开 Markdown 文档并切换到预览。

JavaScript 设置作用于 Markdown 文档预览。这套方案不接管 DEVONthink 的原生 WYSIWYG 公式编辑，也不配置 AI 聊天窗口或 DEVONthink To Go。参见 [DEVONthink 的 JavaScript 设置说明](https://download.devontechnologies.com/download/devonthink/3.8.2/DEVONthink.help/Contents/Resources/pgs/preferences-files.html)。

### 试用公式

将下面内容粘贴到 Markdown 源码中，不要包含包裹示例的三反引号。公式块内不要插入空白段落。

```markdown
行内公式：$E = mc^2$，另一个公式：$a^2 + b^2 = c^2$。

独立公式：

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

多行公式：

$$
\begin{aligned}
a &= b + c \\
d &= e + f
\end{aligned}
$$
```

预览中应显示两个独立的行内公式、带根号的分式，以及等号对齐的两行公式。长公式可以横向滚动。脚本支持 `$…$`、`$$…$$`、`\(…\)` 和 `\[…\]`；反斜杠分隔符能否完整到达 KaTeX 取决于 Markdown 解析过程，建议先使用美元符号示例。

自动渲染会跳过代码块和行内代码。普通文本中的成对美元符号也可能被当作公式，金额可写为 `USD 10`，或放入行内代码。脚本按 KaTeX 要求将 `$$` 放在 `$` 之前匹配，参见 [自动渲染文档](https://katex.org/docs/autorender.html)。

### 调整显示

脚本中的 `.katex` 控制公式字号，默认是正文的 `1.05em`；`.katex-display` 控制独立公式的外边距、内边距和横向滚动。修改脚本后重新打开预览。

CSS 只能调整已经渲染的公式外观。如果 Markdown 先把公式下划线转换成强调标签，或移除了必要的反斜杠，需要处理源文或 Markdown 解析，调整 CSS 无法恢复公式内容。

### 离线部署所需资源

默认脚本使用 CDN。要改成本地资源，从 [KaTeX Releases](https://github.com/KaTeX/KaTeX/releases) 下载同版本的预构建 `katex.zip`，保留以下结构：

```text
katex/
├── katex.min.js
├── katex.min.css
├── fonts/
└── contrib/
    └── auto-render.min.js
```

将脚本的 `base` 改成 DEVONthink 预览可访问的资源目录 URL，保留末尾 `/`。`fonts` 必须与 CSS 保持上述相对位置。本地资源是否能加载还取决于 DEVONthink 预览的文件访问权限，配置后应断网重新打开文档验证，不能将 CDN 缓存视为离线安装。参见 [KaTeX 资源部署说明](https://katex.org/docs/browser.html#download-host-things-yourself)。

## 排查与恢复

| 现象 | 处理方式 |
| --- | --- |
| 公式没有渲染，也没有加载错误提示 | 检查 JavaScript 文件是否选中，重新打开文档预览 |
| 预览顶部出现加载失败提示 | 检查提示中的资源地址能否访问；本地部署则检查资源目录和读取权限 |
| 公式以红色源码显示 | 检查公式语法，并查阅 [KaTeX 支持的命令](https://katex.org/docs/supported.html) |
| 下标变成斜体或反斜杠消失 | 检查 Markdown 源码和解析结果，先用本文的简单示例定位问题 |
| 预览正常，编辑区仍显示源码 | KaTeX 脚本只处理预览；编辑区的原生公式功能使用 MathJax |
| 修改后预览没有更新 | 保存文档和脚本，重新打开文档以重新执行脚本 |

恢复内置方案时，在 JavaScript 栏清除 KaTeX 脚本或恢复之前的脚本设置，重新勾选 **MathJax support**，再重新打开文档。
