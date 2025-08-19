/**
 * Language Handler Module
 * Manages language switching and RTL/LTR support
 */

class LanguageHandler {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
        this.currentLang = 'en';
        this.translations = {
            en: {
                'عربي': 'عربي',
                'English': 'English'
            },
            ar: {
                'عربي': 'عربي',
                'English': 'English'
            }
        };
        
        this.init();
    }

    /**
     * Initialize language handler
     */
    init() {
        this.setupLanguageToggle();
        this.loadSavedLanguage();
    }

    /**
     * Setup language toggle button
     */
    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    /**
     * Load saved language from localStorage
     */
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('cv-language');
        if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
            this.setLanguage(savedLang);
        } else {
            // Detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const detectedLang = browserLang.startsWith('ar') ? 'ar' : 'en';
            this.setLanguage(detectedLang);
        }
    }

    /**
     * Toggle between languages
     */
    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.setLanguage(newLang);
    }

    /**
     * Set language and update UI
     */
    setLanguage(lang) {
        if (lang !== 'en' && lang !== 'ar') return;
        
        this.currentLang = lang;
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.setAttribute('data-lang', lang);
        
        // Save to localStorage
        localStorage.setItem('cv-language', lang);
        
        // Update data loader language
        if (this.dataLoader) {
            this.dataLoader.setLanguage(lang);
            this.dataLoader.renderAll();
        }
        
        // Update UI text
        this.updateUIText();
        
        // Update language toggle button
        this.updateLanguageToggle();
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    /**
     * Update all translatable text in the UI
     */
    updateUIText() {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    /**
     * Update language toggle button text
     */
    updateLanguageToggle() {
        const langText = document.querySelector('.lang-text');
        if (langText) {
            // Show the opposite language name
            const oppositeText = this.currentLang === 'en' ? 'عربي' : 'English';
            langText.textContent = oppositeText;
        }
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Check if current language is RTL
     */
    isRTL() {
        return this.currentLang === 'ar';
    }

    /**
     * Get text direction
     */
    getDirection() {
        return this.isRTL() ? 'rtl' : 'ltr';
    }

    /**
     * Format text based on current language
     */
    formatText(enText, arText) {
        return this.currentLang === 'ar' ? arText : enText;
    }

    /**
     * Get localized date format
     */
    formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const locale = this.currentLang === 'ar' ? 'ar-EG' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    /**
     * Get localized number format
     */
    formatNumber(number) {
        const locale = this.currentLang === 'ar' ? 'ar-EG' : 'en-US';
        return new Intl.NumberFormat(locale).format(number);
    }

    /**
     * Apply RTL/LTR specific styles
     */
    applyDirectionalStyles() {
        const body = document.body;
        
        if (this.isRTL()) {
            body.classList.add('rtl');
            body.classList.remove('ltr');
        } else {
            body.classList.add('ltr');
            body.classList.remove('rtl');
        }
    }

    /**
     * Handle font loading for Arabic
     */
    loadFonts() {
        if (this.currentLang === 'ar') {
            // Ensure Arabic fonts are loaded
            if ('fonts' in document) {
                document.fonts.load('400 16px "Noto Sans Arabic"').then(() => {
                    console.log('Arabic font loaded');
                }).catch(err => {
                    console.warn('Arabic font loading failed:', err);
                });
            }
        }
    }

    /**
     * Update meta tags for SEO
     */
    updateMetaTags() {
        // Update language meta tag
        let langMeta = document.querySelector('meta[name="language"]');
        if (!langMeta) {
            langMeta = document.createElement('meta');
            langMeta.name = 'language';
            document.head.appendChild(langMeta);
        }
        langMeta.content = this.currentLang;

        // Update direction meta tag
        let dirMeta = document.querySelector('meta[name="direction"]');
        if (!dirMeta) {
            dirMeta = document.createElement('meta');
            dirMeta.name = 'direction';
            document.head.appendChild(dirMeta);
        }
        dirMeta.content = this.getDirection();
    }

    /**
     * Handle keyboard shortcuts for language switching
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + L to toggle language
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.toggleLanguage();
            }
        });
    }

    /**
     * Get language-specific CSS class
     */
    getLanguageClass() {
        return `lang-${this.currentLang}`;
    }

    /**
     * Update document title based on language
     */
    updateDocumentTitle() {
        const titles = {
            en: 'Professional CV Template',
            ar: 'قالب السيرة الذاتية المهنية'
        };
        
        document.title = titles[this.currentLang] || titles.en;
    }

    /**
     * Handle text alignment for mixed content
     */
    handleTextAlignment() {
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        
        textElements.forEach(element => {
            // Skip elements that already have explicit alignment
            if (element.style.textAlign) return;
            
            // Apply default alignment based on language
            if (this.isRTL()) {
                element.style.textAlign = 'right';
            } else {
                element.style.textAlign = 'left';
            }
        });
    }
}

// Export for use in other modules
window.LanguageHandler = LanguageHandler;

