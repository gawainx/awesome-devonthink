/* Load KaTeX in DEVONthink Markdown previews. Disable built-in MathJax first. */
(() => {
  "use strict";

  const base = "https://cdn.jsdelivr.net/npm/katex@0.18.9/dist/";

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`加载失败：${url}`));
      document.head.appendChild(script);
    });
  }

  function loadStylesheet(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = () => reject(new Error(`加载失败：${url}`));
      document.head.appendChild(link);
    });
  }

  async function start() {
    try {
      await Promise.all([
        loadStylesheet(`${base}katex.min.css`),
        loadScript(`${base}katex.min.js`)
      ]);
      await loadScript(`${base}contrib/auto-render.min.js`);

      const style = document.createElement("style");
      style.textContent = `
        .katex-display {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.3em 0;
          margin: 1.2em 0;
        }
        .katex {
          font-size: 1.05em;
        }
      `;
      document.head.appendChild(style);

      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ],
        ignoredClasses: ["katex"],
        throwOnError: false,
        trust: false
      });
    } catch (error) {
      console.error("[DEVONthink KaTeX]", error);
      const message = document.createElement("p");
      message.textContent = `KaTeX 未完成加载：${error.message}`;
      message.style.color = "#c0392b";
      document.body.prepend(message);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
