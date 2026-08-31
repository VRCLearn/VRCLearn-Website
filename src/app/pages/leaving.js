function getCurrentReturnPath() {
    if (typeof window === 'undefined') {
        return '';
    }

    const returnPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return window.location.pathname === '/leaving' ? '/home' : returnPath;
}

export function buildLeavingPath(url, label, returnPath = getCurrentReturnPath()) {
    const params = new URLSearchParams({
        url,
        label
    });

    if (returnPath) {
        params.set('from', returnPath);
    }

    return `/leaving?${params.toString()}`;
}
