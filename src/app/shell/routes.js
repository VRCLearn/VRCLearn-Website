import {staticPages} from '../pages/index.jsx';
import {getPreferredLang} from '../i18n/language.js';

export function parseRoute(pathname) {
    const routePath = String(pathname || '/');
    const segments = routePath.split('/').filter(Boolean);
    const lang = getPreferredLang();

    if (segments.length === 0) {
        return {lang, type: 'page', page: 'home', replacePath: '/home'};
    }

    if (segments.length === 1 && staticPages[segments[0]]) {
        return {lang, type: 'page', page: segments[0]};
    }

    return {lang, type: 'not-found', path: routePath.startsWith('/') ? routePath : `/${routePath}`};
}

export function buildPath(route) {
    if (route.type === 'page' && staticPages[route.page]) {
        return `/${route.page}`;
    }
    if (route.type === 'not-found') {
        return route.path || '/';
    }
    return '/home';
}
