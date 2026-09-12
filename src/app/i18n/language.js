import siteConfig from '../../../site.config.json';

const canonicalLocales = Object.keys(siteConfig.siteMetadata.locales);
const localeByNormalizedValue = new Map(
    canonicalLocales.map((locale) => [locale.toLowerCase(), locale])
);
const detectionConfig = siteConfig.siteMetadata.localeDetection;
const browserLanguageLocales = new Map(
    Object.entries(detectionConfig.browserLanguageLocales)
        .map(([language, locale]) => [language.toLowerCase(), locale.toLowerCase()])
);

export const FALLBACK_LANG = detectionConfig.fallbackLocale.toLowerCase();
export const LANG_STORAGE_KEY = 'vrclearn.lang';
let sessionPreferredLang = null;

function findSupportedLang(rawLang) {
    const value = String(rawLang || '').trim().toLowerCase();
    return localeByNormalizedValue.has(value) ? value : null;
}

function getStoredPreferredLang() {
    try {
        return findSupportedLang(window.localStorage.getItem(LANG_STORAGE_KEY));
    } catch {
        return null;
    }
}

function getBrowserLanguageCandidates(rawLang) {
    try {
        const locale = new Intl.Locale(rawLang);
        return [
            locale.toString(),
            locale.region ? `${locale.language}-${locale.region}` : null,
            locale.script ? `${locale.language}-${locale.script}` : null,
            locale.language
        ].filter(Boolean);
    } catch {
        return [];
    }
}

function getBrowserPreferredLang() {
    const browserLanguages = Array.from(new Set([
        ...(window.navigator.languages || []),
        window.navigator.language
    ].filter(Boolean)));

    for (const browserLanguage of browserLanguages) {
        for (const candidate of getBrowserLanguageCandidates(browserLanguage)) {
            const supportedLang = findSupportedLang(candidate);
            if (supportedLang) {
                return supportedLang;
            }
            const mappedLang = browserLanguageLocales.get(candidate.toLowerCase());
            if (mappedLang) {
                return mappedLang;
            }
        }
    }
    return null;
}

export function normalizeLang(rawLang) {
    return findSupportedLang(rawLang) || FALLBACK_LANG;
}

export function isLangSegment(value) {
    const normalizedValue = String(value || '').trim().toLowerCase();
    return localeByNormalizedValue.has(normalizedValue);
}

export function getCanonicalLang(lang) {
    return localeByNormalizedValue.get(normalizeLang(lang));
}

export function getPreferredLang() {
    return getStoredPreferredLang()
        || sessionPreferredLang
        || getBrowserPreferredLang()
        || FALLBACK_LANG;
}

export function resolvePreferredLang() {
    const storedLang = getStoredPreferredLang();
    if (storedLang) {
        sessionPreferredLang = storedLang;
        return storedLang;
    }

    return setPreferredLang(getBrowserPreferredLang() || FALLBACK_LANG);
}

export function setPreferredLang(lang) {
    const normalizedLang = normalizeLang(lang);
    sessionPreferredLang = normalizedLang;
    try {
        window.localStorage.setItem(LANG_STORAGE_KEY, normalizedLang);
    } catch {
    }
    return normalizedLang;
}

export function applyDocumentLang(lang) {
    document.documentElement.lang = getCanonicalLang(lang);
}
