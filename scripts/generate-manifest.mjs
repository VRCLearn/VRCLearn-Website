import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import siteConfig from '../site.config.json' with {type: 'json'};

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(projectRoot, 'public', 'manifest.json');
const defaultLocale = siteConfig.siteMetadata.defaultLocale;
const defaultMetadata = siteConfig.siteMetadata.locales[defaultLocale];
const manifest = {
    name: defaultMetadata.title,
    short_name: siteConfig.productName,
    description: defaultMetadata.description,
    lang: defaultLocale,
    dir: 'ltr',
    id: '/pwa-loading?source=pwa',
    start_url: '/pwa-loading?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    categories: [
        'education',
        'productivity'
    ],
    icons: [
        {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: '/pwa-icon-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
        },
        {
            src: '/pwa-icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
        }
    ]
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`[generate-manifest] 已生成 ${path.relative(projectRoot, manifestPath)}。`);
