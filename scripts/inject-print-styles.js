#!/usr/bin/env node
const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/inject-print-styles.js <html-file>');
  process.exit(1);
}

const style = `
<style id="resume-print-styles">
@page {
  size: A4;
  margin: 12mm 13mm 14mm;
}

@media print {
  html,
  body {
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    box-shadow: none !important;
  }

  body {
    font-size: 10pt !important;
    line-height: 1.35 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body > *,
  main,
  .container,
  .resume,
  .page,
  .content {
    width: auto !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-shadow: none !important;
  }

  h1 {
    font-size: 20pt !important;
    line-height: 1.15 !important;
    margin-top: 0 !important;
    margin-bottom: 4mm !important;
  }

  h2 {
    font-size: 12.5pt !important;
    line-height: 1.2 !important;
    margin-top: 5mm !important;
    margin-bottom: 2.5mm !important;
    break-after: avoid-page;
    page-break-after: avoid;
  }

  h3,
  h4 {
    break-after: avoid-page;
    page-break-after: avoid;
  }

  p {
    margin-top: 1.2mm !important;
    margin-bottom: 1.8mm !important;
    orphans: 3;
    widows: 3;
  }

  ul,
  ol {
    margin-top: 1.5mm !important;
    margin-bottom: 2.5mm !important;
    padding-left: 5mm !important;
  }

  li {
    margin-bottom: 1mm !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  section,
  article {
    break-inside: auto;
    page-break-inside: auto;
  }

  h2 + *,
  h3 + *,
  h4 + * {
    break-before: avoid-page;
    page-break-before: avoid;
  }

  a,
  a:visited {
    color: inherit !important;
    text-decoration: none !important;
  }

  #lang-switcher {
    display: none !important;
  }

  img {
    max-width: 100% !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
`;

let html = fs.readFileSync(file, 'utf8');
if (html.includes('id="resume-print-styles"')) {
  console.log(`Print styles already present in ${file}`);
  process.exit(0);
}

html = html.replace('</head>', `${style}</head>`);
fs.writeFileSync(file, html);
console.log(`Injected A4 print styles into ${file}`);
