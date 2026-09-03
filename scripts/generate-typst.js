#!/usr/bin/env node
const fs = require('fs');

const [input, output, lang = 'en'] = process.argv.slice(2);
if (!input || !output) process.exit(1);

const r = JSON.parse(fs.readFileSync(input, 'utf8'));
const zh = lang === 'zh';

const esc = s => String(s ?? '')
  .replace(/\\/g, '\\\\')
  .replace(/([#*_<>@$])/g, '\\$1')
  .replace(/\[/g, '\\[')
  .replace(/\]/g, '\\]')
  .replace(/Christie's/g, '#text("Christie\'s")');

const date = s => s ? s.slice(0, 7).replace('-', '.') : '';
const range = x => `${date(x.startDate)} - ${x.endDate ? date(x.endDate) : (zh ? '至今' : 'Present')}`;
const heading = s => `\n#section[${s}]\n`;
const bullets = xs => (xs || []).map(x => `- ${esc(x)}`).join('\n');
const selected = ['Christie', 'Shantec', 'Richemont', 'Kallista', 'Monotype', 'Tootools'];
const projects = (r.projects || []).filter(p => selected.some(k => p.name.includes(k))).slice(0, 6);
const skills = r.skills || [];
const interests = r.interests || [];
const b = r.basics || {};

const font = '"Noto Sans CJK SC"';
const leading = zh ? '0.62em' : '0.64em';
const paragraphSpacing = zh ? '0.72em' : '0.62em';
const listSpacing = zh ? '0.48em' : '0.36em';

let t = `#set page(paper: "a4", margin: (x: 13mm, top: 12mm, bottom: 13mm))
#set text(size: 9.2pt, font: ${font}, fill: rgb("#202124"))
#set par(leading: ${leading}, spacing: ${paragraphSpacing}, justify: false)
#set list(indent: 1.1em, body-indent: .45em, spacing: ${listSpacing})
#let accent = rgb("#1f4e79")
#let section(title) = { v(6pt); text(size: 11pt, weight: "bold", fill: accent, title); v(2.5pt); line(length: 100%, stroke: .6pt + rgb("#9aa0a6")); v(4pt) }
#let role(title, org, dates) = { grid(columns: (1fr, auto), column-gutter: 8pt, [*#title*  ·  #org], text(size: 8.6pt, fill: rgb("#5f6368"), dates)); v(2pt) }

#align(center)[
#text(size: 20pt, weight: "bold")[${esc(b.name || 'Abraham Yang')}]
#v(2pt)
#text(size: 10.5pt, fill: accent, weight: "medium")[${esc(b.label || '')}]
#v(4pt)
#text(size: 8.6pt)[${esc([b.location?.city, b.email, b.phone, b.url].filter(Boolean).join('  ·  '))}]
]
`;

if (b.summary) t += heading(zh ? '👤 个人简介' : '👤 SUMMARY') + esc(b.summary) + '\n';
t += heading(zh ? '💼 工作经历' : '💼 EXPERIENCE');
for (const w of (r.work || [])) t += `#block(breakable: false)[\n#role[${esc(w.position)}][${esc(w.name)}][${esc(range(w))}]\n${bullets(w.highlights)}\n]\n#v(${zh ? '7pt' : '6pt'})\n`;
t += heading(zh ? '🚀 精选项目' : '🚀 SELECTED PROJECTS');
for (const p of projects) t += `#block(breakable: false)[\n*${esc(p.name)}*\n${esc(p.description || '')}\n${bullets((p.highlights || []).slice(0, 3))}\n]\n#v(${zh ? '7pt' : '6pt'})\n`;
t += heading(zh ? '🛠 技能' : '🛠 SKILLS');
for (const s of skills) t += `#block(breakable: false)[\n*${esc(s.name)}*#linebreak()\n#v(1.5pt)\n${esc((s.keywords || []).join(' · '))}\n]\n#v(${zh ? '5pt' : '4pt'})\n`;
if (interests.length) {
  t += heading(zh ? '🚴 爱好' : '🚴 INTERESTS');
  for (const i of interests) {
    const label = i.name ? `*${esc(i.name)}:* ` : '';
    t += `${label}${esc((i.keywords || []).join(' · '))}\n#v(${zh ? '4pt' : '3pt'})\n`;
  }
}
if (r.education?.length) {
  t += heading(zh ? '🎓 教育经历' : '🎓 EDUCATION');
  for (const e of r.education) t += `#block(breakable: false)[*${esc(e.institution)}* · ${esc(e.studyType)} ${esc(e.area)}  #h(1fr) ${esc(range(e))}]\n`;
}
fs.writeFileSync(output, t);
console.log(`Generated ${output}`);
