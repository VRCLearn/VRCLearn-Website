import {defineConfig} from 'vite';
import siteConfig from './site.config.json' with {type: 'json'};

const canonicalUrl = new URL(siteConfig.homepageUrl).href;
const socialImageUrl = new URL(siteConfig.siteMetadata.socialImagePath, canonicalUrl).href;
const defaultLocale = siteConfig.siteMetadata.defaultLocale;
const defaultMetadata = siteConfig.siteMetadata.locales[defaultLocale];
const alternateLocales = Object.keys(siteConfig.siteMetadata.locales)
    .filter((locale) => locale !== defaultLocale);

const siteMetadataPlugin = {
    name: 'vrclearn-site-metadata',
    transformIndexHtml(html) {
        const replacements = {
            '{{VRCL_ANALYTICS_ID}}': siteConfig.googleAnalyticsMeasurementId,
            '{{VRCL_SITE_DESCRIPTION}}': defaultMetadata.description,
            '{{VRCL_SITE_NAME}}': siteConfig.productName,
            '{{VRCL_SITE_SOCIAL_DESCRIPTION}}': defaultMetadata.socialDescription,
            '{{VRCL_SITE_TITLE}}': defaultMetadata.title,
            '{{VRCL_SITE_LOCALE}}': defaultLocale.replace('-', '_'),
            '{{VRCL_ALTERNATE_LOCALES}}': alternateLocales
                .map((locale) => `<meta property="og:locale:alternate" content="${locale.replace('-', '_')}"/>`)
                .join('\n    '),
            '{{VRCL_CANONICAL_URL}}': canonicalUrl,
            '{{VRCL_SOCIAL_IMAGE_URL}}': socialImageUrl
        };

        return Object.entries(replacements).reduce(
            (result, [token, value]) => result.replaceAll(token, value),
            html
        );
    }
};

const rewritePwaLoadingPath = (middlewares) => {
    middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname !== '/pwa-loading') {
            next();
            return;
        }

        request.url = `/pwa-loading.html${url.search}`;
        next();
    });
};

export default defineConfig({
    plugins: [
        siteMetadataPlugin,
        {
            name: 'pwa-loading-html-rewrite',
            configureServer(server) {
                rewritePwaLoadingPath(server.middlewares);
            },
            configurePreviewServer(server) {
                rewritePwaLoadingPath(server.middlewares);
            }
        }
    ]
});
