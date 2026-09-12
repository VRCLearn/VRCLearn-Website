import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import siteConfig from '../site.config.json' with {type: 'json'};

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');
const indexPath = path.join(outputRoot, 'index.html');

function escapeHtmlAttribute(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function replaceMetaContent(html, attribute, name, content) {
    const escapedContent = escapeHtmlAttribute(content);
    const pattern = new RegExp(`(<meta ${attribute}="${name}" content=")[^"]*("/>)`);
    return html.replace(pattern, `$1${escapedContent}$2`);
}

function renderRouteHtml(baseHtml, {canonicalUrl, description, title}) {
    let html = baseHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlAttribute(title)}</title>`);
    html = html.replace(
        /(<link rel="canonical" href=")[^"]*("\/?>)/,
        `$1${escapeHtmlAttribute(canonicalUrl)}$2`
    );
    html = replaceMetaContent(html, 'name', 'description', description);
    html = replaceMetaContent(html, 'property', 'og:title', title);
    html = replaceMetaContent(html, 'property', 'og:description', description);
    html = replaceMetaContent(html, 'property', 'og:url', canonicalUrl);
    html = replaceMetaContent(html, 'name', 'twitter:title', title);
    return replaceMetaContent(html, 'name', 'twitter:description', description);
}

function main() {
    if (!fs.existsSync(indexPath)) {
        throw new Error('未找到 dist/index.html，请先执行 Vite 构建。');
    }

    const baseHtml = fs.readFileSync(indexPath, 'utf8');
    const siteOrigin = new URL(siteConfig.homepageUrl).origin;
    const defaultMetadata = siteConfig.siteMetadata.locales[siteConfig.siteMetadata.defaultLocale];

    for (const [route, pageMetadata] of Object.entries(defaultMetadata.pages)) {
        const canonicalUrl = new URL(`/${route}`, siteOrigin).href;
        const title = `${pageMetadata.title} | ${siteConfig.productName}`;
        const routeHtml = renderRouteHtml(baseHtml, {
            canonicalUrl,
            description: pageMetadata.description,
            title
        });
        fs.writeFileSync(path.join(outputRoot, `${route}.html`), routeHtml, 'utf8');
    }

    console.log(`[generate-route-html] 已为 ${Object.keys(defaultMetadata.pages).length} 个公开路由生成元数据页面。`);
}

main();
