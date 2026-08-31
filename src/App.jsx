import {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import ThemePanel from './app/components/ThemePanel.jsx';
import {staticPages} from './app/pages/index.jsx';
import {buildLeavingPath} from './app/pages/leaving.js';
import {applyDocumentLang, setPreferredLang} from './app/i18n/language.js';
import {buildPath, parseRoute} from './app/shell/routes.js';
import {useUserTheme} from './app/theme/use-user-theme.js';
import siteConfig from '../site.config.json';

const WEBSITE_REPOSITORY_URL = `https://github.com/${siteConfig.websiteRepository}`;
const DOCS_URL = siteConfig.documentationUrl;
const CONTENT_LINK_SELECTORS = [
    'a[href]',
    'md-filled-button',
    'md-filled-tonal-button',
    'md-outlined-button',
    'md-text-button',
    'md-elevated-button'
].join(', ');

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handleChange = (event) => setMatches(event.matches);
        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}

function isModifiedClick(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function findClosestElement(target, selector) {
    return target instanceof Element ? target.closest(selector) : null;
}

function findEventTarget(event, selector) {
    const directTarget = findClosestElement(event.target, selector);
    if (directTarget) {
        return directTarget;
    }

    for (const node of event.composedPath?.() || []) {
        if (node instanceof Element && node.matches(selector)) {
            return node;
        }
    }

    return null;
}

function getActiveNavPage(route) {
    return route.type === 'page' ? route.page : null;
}

function scrollAppMainToHash(appMain, hash) {
    const targetId = decodeURIComponent(hash.slice(1));
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target || !appMain) {
        return false;
    }

    const mainRect = appMain.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    appMain.scrollTo({
        top: appMain.scrollTop + targetRect.top - mainRect.top,
        behavior: 'smooth'
    });
    return true;
}

function getExternalLinkLabel(target, url) {
    const ariaLabel = target.getAttribute('aria-label');
    const textLabel = target.textContent?.replace(/\s+/g, ' ').trim();
    return ariaLabel || textLabel || url.hostname || '外部页面';
}

function AppHeader({
    headerRef,
    isNavOpen,
    onToggleMenu,
    onToggleThemePanel,
    themePanelToggleRef,
    isThemePanelOpen
}) {
    return (
        <header className="app-header" ref={headerRef}>
            <md-icon-button
                id="menu-btn"
                aria-label={isNavOpen ? '关闭导航菜单' : '打开导航菜单'}
                aria-expanded={isNavOpen}
                aria-controls="app-nav"
                onClick={onToggleMenu}
            >
                <md-icon aria-hidden="true">menu</md-icon>
            </md-icon-button>
            <span className="app-header__title" id="app-header-title">{siteConfig.productName}</span>
            <md-icon-button
                id="github-btn"
                aria-label="访问 GitHub"
                href={WEBSITE_REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="app-header__brand-icon" viewBox="0 0 19 19" aria-hidden="true">
                    <use href="/icons.svg#github-icon"></use>
                </svg>
            </md-icon-button>
            <md-icon-button
                id="theme-panel-toggle-btn"
                aria-label="打开主题控制面板"
                aria-controls="theme-controls-panel"
                aria-expanded={isThemePanelOpen}
                onClick={onToggleThemePanel}
                ref={themePanelToggleRef}
            >
                <md-icon aria-hidden="true">palette</md-icon>
            </md-icon-button>
        </header>
    );
}

function PrimaryNavigation({activePage}) {
    const navItems = [
        ['home', 'home', '首页', '/home'],
        ['video', 'smart_display', '教程视频', '/video'],
        ['download', 'download', '资源下载', '/download'],
        ['docs', 'description', '教程文档', DOCS_URL],
        ['about', 'info', '关于项目', '/about'],
        ['community', 'forum', '加入社区', '/community'],
        ['feedback', 'feedback', '提交反馈', '/feedback']
    ];

    return (
        <md-list aria-label="教程目录" id="nav-list">
            {navItems.map(([page, icon, label, href], index) => (
                <Fragment key={page}>
                    {index === 4 ? <md-divider /> : null}
                    <md-list-item
                        type="link"
                        href={href}
                        data-page={page}
                        aria-current={activePage === page ? 'page' : undefined}
                        data-aria-current={activePage === page ? 'page' : undefined}
                    >
                        <md-icon slot="start" aria-hidden="true">{icon}</md-icon>
                        <span slot="headline">{label}</span>
                    </md-list-item>
                </Fragment>
            ))}
        </md-list>
    );
}

function RouteContent({route}) {
    if (route.type === 'not-found') {
        return (
            <>
                <h1 className="page-title">页面未找到</h1>
                <p className="page-body">此路径不存在，请从主站导航重新选择。</p>
                <div className="card__actions">
                    <md-filled-tonal-button type="link" href="/home">返回首页</md-filled-tonal-button>
                </div>
            </>
        );
    }

    const pageConfig = staticPages[route.page];
    const PageComponent = pageConfig.component;
    return (
        <>
            <h1 className="page-title">{pageConfig.title}</h1>
            <PageComponent route={route} />
        </>
    );
}

export default function App() {
    const isMobile = useMediaQuery('(max-width: 1500px)');
    const [route, setRoute] = useState(() => parseRoute(window.location.pathname));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopNavClosed, setDesktopNavClosed] = useState(false);
    const [themePanelOpen, setThemePanelOpen] = useState(false);
    const appMainRef = useRef(null);
    const appHeaderRef = useRef(null);
    const appNavRef = useRef(null);
    const menuButtonRef = useRef(null);
    const themePanelToggleRef = useRef(null);
    const theme = useUserTheme();
    const activeNavPage = getActiveNavPage(route);
    const navOpen = isMobile ? mobileMenuOpen : !desktopNavClosed;

    const applyRouteLanguage = useCallback((nextRoute) => {
        const lang = setPreferredLang(nextRoute.lang);
        applyDocumentLang(lang);
        return {...nextRoute, lang};
    }, []);

    const navigateTo = useCallback(async (targetRoute, {replace = false, search = window.location.search} = {}) => {
        const normalizedRoute = applyRouteLanguage(parseRoute(buildPath(targetRoute)));
        const nextPath = normalizedRoute.replacePath || buildPath(normalizedRoute);
        const nextSearch = normalizedRoute.type === 'page' && normalizedRoute.page === 'leaving' ? search : '';
        const nextUrl = `${nextPath}${nextSearch}`;

        if (replace) {
            window.history.replaceState(normalizedRoute, '', nextUrl);
        } else {
            window.history.pushState(normalizedRoute, '', nextUrl);
        }
        setRoute(normalizedRoute);
    }, [applyRouteLanguage]);

    const closeMobileMenu = useCallback((restoreFocus = true) => {
        if (!isMobile) {
            return;
        }
        setMobileMenuOpen(false);
        if (restoreFocus) {
            requestAnimationFrame(() => menuButtonRef.current?.focus());
        }
    }, [isMobile]);

    useEffect(() => {
        const initialRoute = parseRoute(window.location.pathname);
        void navigateTo(initialRoute, {replace: true, search: window.location.search});
    }, [navigateTo]);

    useEffect(() => {
        const handlePopState = () => {
            const nextRoute = applyRouteLanguage(parseRoute(window.location.pathname));
            if (nextRoute.replacePath) {
                void navigateTo(nextRoute, {replace: true, search: window.location.search});
                return;
            }
            setRoute(nextRoute);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [applyRouteLanguage, navigateTo]);

    useEffect(() => {
        if (!isMobile) {
            setMobileMenuOpen(false);
        }
    }, [isMobile]);

    useEffect(() => {
        const setInert = (element, shouldBeInert) => {
            if (!element) {
                return;
            }
            if (shouldBeInert) {
                element.setAttribute('inert', '');
            } else {
                element.removeAttribute('inert');
            }
        };

        setInert(appHeaderRef.current, isMobile && mobileMenuOpen);
        setInert(appMainRef.current, isMobile && mobileMenuOpen);
        setInert(appNavRef.current, !navOpen);
    }, [isMobile, mobileMenuOpen, navOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isMobile && mobileMenuOpen) {
                closeMobileMenu(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeMobileMenu, isMobile, mobileMenuOpen]);

    useEffect(() => {
        if (!isMobile || !mobileMenuOpen) {
            return undefined;
        }
        const animationFrameId = requestAnimationFrame(() => {
            const firstNavButton = appNavRef.current?.querySelector('#nav-list md-list-item');
            firstNavButton?.focus();
        });
        return () => cancelAnimationFrame(animationFrameId);
    }, [isMobile, mobileMenuOpen]);

    const handleToggleMenu = () => {
        if (isMobile) {
            setMobileMenuOpen((open) => !open);
            return;
        }
        setDesktopNavClosed((closed) => !closed);
    };

    const handleNavClick = async (event) => {
        const navItem = findEventTarget(event, 'md-list-item[data-page]');
        if (!navItem || isModifiedClick(event)) {
            return;
        }

        const rawHref = navItem.getAttribute('href') || navItem.href || '/home';
        const linkUrl = new URL(rawHref, window.location.origin);
        if (linkUrl.origin !== window.location.origin) {
            return;
        }

        event.preventDefault();
        await navigateTo(parseRoute(linkUrl.pathname));
        if (isMobile) {
            closeMobileMenu(false);
        }
    };

    const handleContentClick = async (event) => {
        if (event.defaultPrevented || isModifiedClick(event)) {
            return;
        }

        const target = findEventTarget(event, CONTENT_LINK_SELECTORS);
        if (!target || target.hasAttribute('download')) {
            return;
        }

        const rawHref = target.getAttribute('href') || target.href;
        if (!rawHref) {
            return;
        }

        let linkUrl;
        try {
            linkUrl = new URL(rawHref, window.location.href);
        } catch {
            return;
        }

        const isExternalHttpUrl = linkUrl.origin !== window.location.origin
            && (linkUrl.protocol === 'http:' || linkUrl.protocol === 'https:');
        if (isExternalHttpUrl) {
            if (target.hasAttribute('data-direct-link')) {
                return;
            }
            event.preventDefault();
            const label = getExternalLinkLabel(target, linkUrl);
            const leavingUrl = new URL(buildLeavingPath(linkUrl.href, label), window.location.origin);
            await navigateTo(parseRoute(leavingUrl.pathname), {search: leavingUrl.search});
            if (isMobile) {
                closeMobileMenu(false);
            }
            return;
        }

        if (target.getAttribute('target') === '_blank') {
            return;
        }

        if (linkUrl.hash && linkUrl.pathname === window.location.pathname && scrollAppMainToHash(appMainRef.current, linkUrl.hash)) {
            event.preventDefault();
            window.history.pushState(route, '', `${linkUrl.pathname}${linkUrl.search}${linkUrl.hash}`);
            return;
        }

        event.preventDefault();
        await navigateTo(parseRoute(linkUrl.pathname), {search: linkUrl.search});
        if (isMobile) {
            closeMobileMenu(false);
        }
    };

    useEffect(() => {
        const nav = appNavRef.current;
        const main = appMainRef.current;
        nav?.addEventListener('click', handleNavClick, true);
        main?.addEventListener('click', handleContentClick, true);

        return () => {
            nav?.removeEventListener('click', handleNavClick, true);
            main?.removeEventListener('click', handleContentClick, true);
        };
    }, [handleContentClick, handleNavClick]);

    return (
        <>
            <AppHeader
                headerRef={appHeaderRef}
                isNavOpen={navOpen}
                isThemePanelOpen={themePanelOpen}
                onToggleMenu={handleToggleMenu}
                onToggleThemePanel={() => setThemePanelOpen((open) => !open)}
                themePanelToggleRef={themePanelToggleRef}
            />
            <div className="app-layout">
                <div
                    className={`nav-backdrop${isMobile && mobileMenuOpen ? ' mobile-open' : ''}`}
                    id="nav-backdrop"
                    aria-hidden={isMobile && mobileMenuOpen ? 'false' : 'true'}
                    onClick={() => {
                        if (isMobile) {
                            closeMobileMenu(false);
                        }
                    }}
                ></div>
                <aside
                    className={`app-nav${desktopNavClosed ? ' desktop-closed' : ''}${isMobile && mobileMenuOpen ? ' mobile-open' : ''}`}
                    id="app-nav"
                    aria-label="教程导航"
                    ref={appNavRef}
                >
                    <PrimaryNavigation activePage={activeNavPage} />
                </aside>
                <main
                    className="app-main"
                    ref={appMainRef}
                >
                    <div className="app-content" id="page-content">
                        <RouteContent route={route} />
                    </div>
                </main>
            </div>
            <ThemePanel
                displaySourceHex={theme.displaySourceHex}
                hctValues={theme.hctValues}
                onReset={theme.resetUserTheme}
                onSetHctValue={theme.setHctValue}
                onSetSourceHex={theme.setThemeSourceHex}
                onSetThemeMode={theme.setThemeMode}
                onSetThemeScheme={theme.setThemeScheme}
                open={themePanelOpen}
                themeMode={theme.themeMode}
                themeScheme={theme.themeScheme}
                toggleButtonRef={themePanelToggleRef}
            />
        </>
    );
}
