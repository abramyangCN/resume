# 📄 JSON Resume — Bilingual as Code

**English** | [中文](./docs/README.zh.md)

## 🍴 Use This Template

> A résumé-as-code pipeline: write in YAML, auto-translate to Chinese via GitHub Models, publish as a bilingual GitHub Pages site — fully automated on every push.

### ✨ Features

- 📝 **YAML source** — edit `src/*.yaml`, the build step assembles `resume.json`
- 🤖 **AI translation** — `resume.zh.json` is auto-generated via GitHub Models (GPT-4o mini); works with the built-in `GITHUB_TOKEN`, no extra setup needed
- 🌐 **Bilingual GitHub Pages** — English at `/` and Chinese at `/zh/` with a floating language-switch button
- 📋 **Gist sync** *(optional)* — push `resume.json` to a Gist on every deploy for use with [registry.jsonresume.org](https://registry.jsonresume.org)
- 📄 **README auto-gen** — this file is regenerated from `resume.json` on every push

### 🚀 Quick Start

> **Prerequisites:** This template is designed for **GitHub Pages project sites** (URL: `https://<username>.github.io/<repo-name>/`).  
> If you are not familiar with GitHub Pages, read the [official guide](https://docs.github.com/en/pages) first.  
> User/org sites (`<username>.github.io`) have no repo-name prefix — the language switcher paths will need manual adjustment in the workflow.

1. **Fork** this repository
2. **Enable GitHub Actions**

   Forked repositories have Actions disabled by default.
   - Click the **Actions** tab in your forked repo
   - Click the green **"I understand my workflows, go ahead and enable them"** button

3. **Enable GitHub Pages**

   - Go to your forked repository on GitHub
   - Click the **Settings** tab (top menu of the repo)
   - In the left sidebar, click **Pages**
   - Under **Build and deployment → Source**, select **Deploy from a branch**
   - Under **Branch**, select `gh-pages` and keep the folder as `/ (root)`, then click **Save**

   > `gh-pages` branch doesn't exist yet — it will be created automatically on the first push to `main`. Come back and set this after your first push if you don't see it.

4. *(Optional)* **Set Gist secrets** if you want JSON Resume registry sync:

   | Secret | Description |
   |--------|-------------|
   | `GIST_TOKEN` | GitHub PAT with `gist` scope |
   | `GIST_ID` | ID of the target Gist (create a blank one first) |

   > If these secrets are not set, the Gist sync step will be skipped automatically.

5. **Edit your resume** in `src/*.yaml`:

   ```
   src/
   ├── basics.yaml   # name, contact, summary
   ├── work.yaml     # experience
   ├── skills.yaml   # skills & keywords
   ├── projects.yaml # side projects
   └── misc.yaml     # education, languages, awards
   ```

6. **Push to `main`** — the workflow will automatically:
   - Build `resume.json` from YAML
   - Translate to `resume.zh.json` via GitHub Models *(only when `resume.json` changes)*
   - Export bilingual HTML → deploy to GitHub Pages
   - Sync `resume.json` to Gist *(if configured)*
   - Regenerate this README

### 🛠 Local Development

```bash
pnpm install
pnpm run build    # build resume.json from YAML
pnpm run serve    # preview at http://localhost:4000
pnpm run export   # export to resume.html
```

---

## Abraham Yang 杨杨

**Senior Frontend Engineer / Frontend Lead**

📧 [abram.yang@outlook.com](mailto:abram.yang@outlook.com) · 🌐 [https://gh.abramyang.com/resume](https://gh.abramyang.com/resume) · 📍 Shanghai, Shanghai

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abramyang) [![Github](https://img.shields.io/badge/Github-0A66C2?style=flat&logo=github&logoColor=white)](https://www.github.com/abramyangCN)

## Summary

Senior Frontend Engineer / Frontend Lead with 7+ years of experience delivering complex web and cross-platform products and contributing to architecture across complex business applications. Experienced in independently owning React.js frontend architecture, technical decisions, engineering systems, real-time applications, SSR, Node.js services, and 0-to-1 product delivery. Hands-on with AI product development, including Dify-based RAG workflows, workflow orchestration, custom AI frontends, and AI-first engineering practices using Figma MCP and OpenAPI-driven tooling. Previously led cross-functional frontend teams and delivered products across APAC markets.

## Experience

### Senior Frontend Engineer · Trajectry (formerly EY Fabernovel China)
*May 2023 – Present · Shanghai, China*

- Owned frontend architecture and delivery across complex web and cross-platform products, spanning real-time systems, cross-platform applications, SSR websites, CMS, and AI-enabled experiences.
- Designed frontend architecture for Christie's products including real-time communication, multi-account permissions, cross-platform monorepo structure, reusable component systems, and OpenAPI-based API integration.
- Built and orchestrated Dify-based RAG workflows for a Richemont knowledge application, owning workflow and node logic as well as the custom frontend experience.
- Applied an AI-first development workflow on Kallista, combining Figma MCP and OpenAPI/Orval-generated API definitions to provide structured context for LLM implementation while owning business logic, architecture boundaries, and code review.
- Delivered products for global luxury and premium brands including Christie's, Richemont, Hermès, Kallista, Messika, Bucherer, Bulgari, and Monotype.

### Frontend Lead · Shanghai RJY Information Technology Co., Ltd
*Sep 2021 – Feb 2023 · Shanghai, China*

- Designed and implemented a customizable clothing platform with real-time 2D/3D rendering using React, Fabric.js, and Three.js.
- Led frontend architecture and delivery for a DIY clothing application and WeChat Miniprogram, managed agile teams, and built CI/CD infrastructure.
- Developed a Node.js headless rendering service to generate print-ready high-resolution output from user designs, enabling offline export without client-side rendering constraints.

### Senior Frontend Engineer · Shanghai Fumasoft Co., Ltd
*Dec 2020 – Sep 2021 · Shanghai, China*

- Refactored a React Native app into a WebView-based hybrid architecture, enabling a shared codebase across iOS, Android, and H5.
- Led a cross-functional team of 5 engineers (FE, iOS, Android), coordinating sprint planning and technical decisions.

### Frontend Engineer · Publicis Sapient
*Apr 2019 – Nov 2020 · Shanghai, China*

- Developed responsive campaign websites and minisites for Huawei, Marriott, and automotive brands.
- Collaborated across Singapore, Japan, and India teams in a distributed delivery model.

## Skills

**Web & Frontend Architecture:** React, TypeScript, Next.js, Astro, Vue, SSR, Component Architecture, Cross-platform Architecture, Mini Program

**Engineering & Backend:** Node.js, WebSocket, REST APIs, OpenAPI, Orval, pnpm Workspaces, Monorepo, CI/CD, Docker, Strapi

**AI Engineering:** Dify, RAG Workflow, LLM Workflow Orchestration, AI-first Development, Figma MCP, Claude Code, GitHub Copilot, Context Engineering

**Visualization & Complex Interaction:** Fabric.js, Three.js, WebGL, Canvas, Interactive Editing Systems

## Education

**Bachelor in Electronic Engineering** · Shanghai Dianji University · Sep 2015 – Jun 2019

## Languages

**Mandarin Chinese** (Native) · **English** (Professional Working Proficiency)

---

*Generated automatically from [resume.json](./resume.json) · Last updated: 2026-09-03*