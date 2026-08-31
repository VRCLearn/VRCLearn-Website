import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import siteConfig from '../site.config.json' with {type: 'json'};

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const robotsPath = path.join(projectRoot, 'public', 'robots.txt');
const staticEntries = [
    {pathname: '/', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/home', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/video', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/download', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/about', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/community', sourcePath: 'src/app/pages/static-pages.jsx'},
    {pathname: '/feedback', sourcePath: 'src/app/pages/static-pages.jsx'}
];

function normalizeSiteUrl(rawSiteUrl) {
    const value = String(rawSiteUrl || '').trim();
    if (!value) {
        throw new Error('site.config.json 中的 homepageUrl 不能为空。');
    }

    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('site.config.json 中的 homepageUrl 必须使用 http:// 或 https:// 开头。');
    }

    url.pathname = url.pathname.replace(/\/+$/, '');
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/+$/, '');
}

function escapeXml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function normalizeDate(rawDate) {
    if (!rawDate) {
        return null;
    }
    const date = new Date(rawDate);
    return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

function getSourceLastmod(sourcePath) {
    try {
        const updatedAt = execFileSync('git', ['-C', projectRoot, 'log', '-1', '--format=%cI', '--', sourcePath], {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
        const date = normalizeDate(updatedAt);
        if (date) {
            return date;
        }
    } catch {
    }

    const absolutePath = path.join(projectRoot, sourcePath);
    return fs.existsSync(absolutePath) ? normalizeDate(fs.statSync(absolutePath).mtime) : null;
}

function buildSitemapXml(siteUrl) {
    const urls = staticEntries.map(({pathname, sourcePath}) => {
        const lastmod = getSourceLastmod(sourcePath);
        const lastmodXml = lastmod ? `\n        <lastmod>${escapeXml(lastmod)}</lastmod>` : '';
        return `    <url>\n        <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>${lastmodXml}\n    </url>`;
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
    const siteUrl = normalizeSiteUrl(siteConfig.homepageUrl);

    fs.writeFileSync(sitemapPath, buildSitemapXml(siteUrl), 'utf8');
    fs.writeFileSync(robotsPath, `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
    console.log(`[generate-sitemap] 已生成 ${path.relative(projectRoot, sitemapPath)}。`);
}

main();
