import {useEffect, useRef, useState} from 'react';
import siteConfig from '../../../site.config.json';

const LANGUAGE_OPTIONS = siteConfig.siteMetadata.localeOrder.map((locale) => {
    const metadata = siteConfig.siteMetadata.locales[locale];
    return {
        label: metadata.languageName,
        locale,
        selectorLabel: metadata.languageSelectorLabel,
        value: locale.toLowerCase()
    };
});
const DEFAULT_LANGUAGE_OPTION = LANGUAGE_OPTIONS.find(
    (option) => option.locale === siteConfig.siteMetadata.defaultLocale
);

function LanguageMenu({activeLang, onChange}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const activeOption = LANGUAGE_OPTIONS.find((option) => option.value === activeLang);

    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) {
            return undefined;
        }

        const handleClosed = () => setOpen(false);
        menu.addEventListener('closed', handleClosed);
        return () => menu.removeEventListener('closed', handleClosed);
    }, []);

    const handleChange = (lang) => {
        setOpen(false);
        onChange(lang);
    };

    return (
        <span className="language-menu">
            <md-icon-button
                id="language-menu-toggle-btn"
                aria-controls="language-menu"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-label={`${activeOption?.selectorLabel || DEFAULT_LANGUAGE_OPTION.selectorLabel}: ${activeOption?.label || DEFAULT_LANGUAGE_OPTION.label}`}
                onClick={() => setOpen((currentOpen) => !currentOpen)}
            >
                <md-icon aria-hidden="true">translate</md-icon>
            </md-icon-button>
            <md-menu
                id="language-menu"
                anchor="language-menu-toggle-btn"
                anchor-corner="end-end"
                menu-corner="start-end"
                positioning="popover"
                role="listbox"
                aria-label={activeOption?.selectorLabel || DEFAULT_LANGUAGE_OPTION.selectorLabel}
                open={open}
                ref={menuRef}
            >
                {LANGUAGE_OPTIONS.map((option) => {
                    const selected = option.value === activeLang;
                    return (
                        <md-menu-item
                            type="option"
                            selected={selected}
                            aria-selected={selected}
                            key={option.locale}
                            onClick={() => handleChange(option.value)}
                        >
                            <span lang={option.locale} slot="headline">{option.label}</span>
                        </md-menu-item>
                    );
                })}
            </md-menu>
        </span>
    );
}

export default LanguageMenu;
