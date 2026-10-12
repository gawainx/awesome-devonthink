# Displaying Markdown Math in DEVONthink

English | [简体中文](markdown-math.zh-CN.md)

DEVONthink has MathJax built in. If you want to replace the formula rendering engine in previews, you can load KaTeX through the Markdown custom JavaScript setting. This guide is for DEVONthink on Mac, and setting names refer to DEVONthink 4.4.

## Enable Built-in MathJax

1. Open **DEVONthink → Settings**, or press `⌘,`.
2. Go to **Files → Markdown**.
3. Under **Extensions**, check **MathJax support**.
4. Open a Markdown document and switch to **Preview** or the side-by-side view.
5. To also show formulas while editing, enable **WYSIWYG tables, images, links & MathJax** on the same settings page.

Built-in support requires no extra scripts or style sheets. The official guide requires MathJax to be enabled but does not state whether it is checked by default; check the settings page to confirm. See [DEVONtechnologies' guide to equations](https://shop.devontechnologies.com/blog/20230221-equations-markdown).

## Switch to KaTeX

This repository provides [devonthink-katex.js](../extended-scripts/katex-support/devonthink-katex.js). The script loads the stylesheet, fonts, core script, and auto-render extension of KaTeX, pinned to version 0.18.9, from jsDelivr, so it needs an internet connection. Formulas are rendered in the local preview, and the script contains no logic that uploads document content.

### Setup

1. Save `devonthink-katex.js` to a stable location. If downloading from GitHub, open the script's Raw content and save that, so you don't download the GitHub web page instead.
2. Go to **Settings → Files → Markdown** and uncheck **MathJax support**, so the two engines don't both process formulas.
3. Under **JavaScript → Select…**, choose the script. If another script is already configured, save the original setting first, merge any code you want to keep into one file, then select that file.
4. Keep your existing **Style Sheet** setting. The script loads the CSS KaTeX needs on its own, so you don't need to replace your document theme with it.
5. Reopen the Markdown document and switch to the preview.

The JavaScript setting applies to Markdown document previews. This setup does not take over DEVONthink's native WYSIWYG formula editing, and does not configure the AI chat window or DEVONthink To Go. See [DEVONthink's JavaScript setting documentation](https://download.devontechnologies.com/download/devonthink/3.8.2/DEVONthink.help/Contents/Resources/pgs/preferences-files.html).

### Try Some Formulas

Paste the following into the Markdown source, without the triple backticks that wrap the example. Do not insert blank paragraphs inside formula blocks.

```markdown
Inline formula: $E = mc^2$, another formula: $a^2 + b^2 = c^2$.

Display formula:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Multi-line formula:

$$
\begin{aligned}
a &= b + c \\
d &= e + f
\end{aligned}
$$
```

The preview should show two separate inline formulas, a fraction with a square root, and two lines aligned on the equals sign. Long formulas can scroll horizontally. The script supports `$…$`, `$$…$$`, `\(…\)`, and `\[…\]`; whether backslash delimiters reach KaTeX intact depends on Markdown parsing, so start with the dollar-sign examples.

Auto-render skips code blocks and inline code. Paired dollar signs in ordinary text may also be treated as formulas, so write amounts as `USD 10` or put them in inline code. As KaTeX requires, the script matches `$$` before `$`; see the [auto-render documentation](https://katex.org/docs/autorender.html).

### Adjust the Display

`.katex` in the script controls the formula font size, which defaults to `1.05em` of the body text; `.katex-display` controls the margin, padding, and horizontal scrolling of display formulas. After editing the script, reopen the preview.

CSS can only adjust the appearance of formulas that have already been rendered. If Markdown has already turned underscores in a formula into emphasis tags, or removed required backslashes, you need to fix the source or the Markdown parsing; CSS cannot restore the formula content.

### Resources for Offline Deployment

The default script uses a CDN. To use local resources instead, download the prebuilt `katex.zip` of the same version from [KaTeX Releases](https://github.com/KaTeX/KaTeX/releases) and keep this structure:

```text
katex/
├── katex.min.js
├── katex.min.css
├── fonts/
└── contrib/
    └── auto-render.min.js
```

Change `base` in the script to a resource directory URL the DEVONthink preview can access, keeping the trailing `/`. `fonts` must stay in the relative position shown above relative to the CSS. Whether local resources load also depends on the DEVONthink preview's file access permissions; after configuring, disconnect from the network and reopen the document to verify, since a CDN cache does not count as an offline installation. See [KaTeX's guide to hosting the resources yourself](https://katex.org/docs/browser.html#download-host-things-yourself).

## Troubleshooting and Restoring

| Symptom | Fix |
| --- | --- |
| Formulas are not rendered and there is no loading error message | Check that the JavaScript file is selected, then reopen the document preview |
| A loading failure message appears at the top of the preview | Check whether the resource URL in the message is reachable; for local deployment, check the resource directory and read permissions |
| Formulas are shown as red source code | Check the formula syntax and see [KaTeX's supported commands](https://katex.org/docs/supported.html) |
| Subscripts become italic or backslashes disappear | Check the Markdown source and parsed result; use the simple examples in this guide to narrow down the problem |
| The preview is fine but the editor still shows source | The KaTeX script only handles the preview; the editor's native formula feature uses MathJax |
| The preview doesn't update after changes | Save the document and script, then reopen the document to rerun the script |

To restore the built-in setup, clear the KaTeX script from the JavaScript field or restore your previous script setting, check **MathJax support** again, then reopen the document.
