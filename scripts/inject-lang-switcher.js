#!/usr/bin/env node
// Injects floating language + PDF download controls into resume HTML files.
// Usage: node scripts/inject-lang-switcher.js <html-file> <current-lang> <other-lang> <other-href> [pdf-href]

const fs = require("fs");

const [filePath, currentLang, otherLang, otherHref, pdfHref] = process.argv.slice(2);
if (!filePath || !currentLang || !otherLang || !otherHref) {
  console.error("Usage: inject-lang-switcher.js <file> <current-lang> <other-lang> <other-href> [pdf-href]");
  process.exit(1);
}

const langLabel = otherLang === "zh" ? "中文" : "English";
const pdfLabel = currentLang === "zh" ? "下载 PDF" : "Download PDF";

const downloadLink = pdfHref
  ? `<a id="pdf-download" class="resume-control" href="${pdfHref}" download>${pdfLabel}</a>`
  : "";

const snippet = `
<style>
  #resume-controls {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 9999;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .resume-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #333;
    color: #fff !important;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    text-decoration: none !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transition: background 0.2s;
  }
  .resume-control:hover { background: #555; }
  @media print {
    #resume-controls { display: none !important; }
  }
</style>
<div id="resume-controls">
  <a id="lang-switcher" class="resume-control" href="${otherHref}">${langLabel}</a>
  ${downloadLink}
</div>
`;

let html = fs.readFileSync(filePath, "utf8");
html = html.replace("</body>", `${snippet}</body>`);
fs.writeFileSync(filePath, html);
console.log(`✓ Injected resume controls into ${filePath}`);
