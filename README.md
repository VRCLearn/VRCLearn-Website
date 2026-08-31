# VRCLearn Website

VRCLearn 主站前端项目，基于 Vite + React，部署目标为 Cloudflare Pages。

生产环境地址：<https://www.vrclearn.com>

VRCLearn 与 ALCOMD 共用的文档站由 [`VRCLearn/VRCLearn-Docs`](https://github.com/VRCLearn/VRCLearn-Docs) 独立维护并部署到 <https://docs.vrclearn.com>。本仓库不再拉取、编译或承载文档内容。

> 开发前请先阅读仓库根目录的 `AGENTS.md`。

## 技术栈

- Vite
- npm
- React
- JavaScript / JSX
- Material Web (`@material/web`)
- Cloudflare Pages

## 本地开发

```bash
npm clean-install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

## 站点边界

- 主站页面：`https://www.vrclearn.com/*`
- 主站文档入口页：`https://www.vrclearn.com/docs`
- 文档站：`https://docs.vrclearn.com/*`
- 主站导航先进入本地 `/docs` 入口页，再由页面按钮直接链接到文档站；该页面不拉取、编译或内嵌文档内容。

VRCLearn 主站的项目名称、规范域名、文档入口、仓库地址、页面元信息和统计 ID 统一维护在 `site.config.json`。Vite、React 页面和构建脚本均读取该文件，不需要在部署平台重复配置这些信息。

## 图标生成

`public/favicon.svg` 是网站品牌图标的唯一源文件。PWA SVG、PWA PNG 和 Apple Touch Icon 均由该文件确定性生成，请勿分别手动维护。

替换源图标后运行：

```bash
npm run generate:icons
```

开发和生产构建前也会自动执行图标生成与校验。

## 站点地图

生产构建会读取 `site.config.json` 中的主站规范域名，生成 `sitemap.xml`，并在 `robots.txt` 中声明站点地图。

## Cloudflare Pages

为本仓库配置独立的 Pages 项目：

- 构建命令：`npm run build`
- 构建输出目录：`dist`
- 生产分支：`main`
- 自定义域名：`www.vrclearn.com`

自定义域名必须先在 Pages 项目的 **Custom domains** 中关联，再确认对应的 Cloudflare DNS CNAME 记录已生效。

## 注意事项

- `public/theme/` 来自 Material Theme Builder，禁止手动修改。
- 所有字体和静态资源必须本地托管。
- 文档站相关改动应在 `VRCLearn-Docs` 仓库完成。
