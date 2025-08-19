/**
 * Main Application Module
 * Initializes and coordinates all CV template functionality
 */

class CVApp {
    constructor() {
        this.dataLoader = null;
        this.languageHandler = null;
        this.themeHandler = null;
        this.exportHandler = null;
        this.qrCodeHandler = null;
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize modules
            await this.initializeModules();
            
            // Load and render data
            await this.loadData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Generate QR code if enabled
            this.generateQRCode();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Add fade-in animation
            this.addFadeInAnimation();
            
            console.log('CV Template initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize CV Template:', error);
            this.showError('Failed to load CV template. Please refresh the page.');
        }
    }

    /**
     * Initialize all modules
     */
    async initializeModules() {
        // Initialize data loader
        this.dataLoader = new DataLoader();
        
        // Initialize language handler
        this.languageHandler = new LanguageHandler(this.dataLoader);
        
        // Initialize theme handler
        this.themeHandler = new ThemeHandler();
        
        // Initialize export handler
        this.exportHandler = new ExportHandler(this.languageHandler);
        
        // Initialize QR code handler
        this.qrCodeHandler = new QRCodeHandler();
    }

    /**
     * Load CV data
     */
    async loadData() {
        await this.dataLoader.loadData();
        this.dataLoader.renderAll();
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Language change events
        document.addEventListener('languageChanged', (e) => {
            this.onLanguageChanged(e.detail.language);
        });
        
        // Theme change events
        document.addEventListener('themeChanged', (e) => {
            this.onThemeChanged(e.detail.theme);
        });
        
        // Color theme change events
        document.addEventListener('colorThemeChanged', (e) => {
            this.onColorThemeChanged(e.detail.colorTheme);
        });
        
        // Window resize events
        window.addEventListener('resize', this.debounce(() => {
            this.onWindowResize();
        }, 250));
        
        // Before print events
        window.addEventListener('beforeprint', () => {
            this.onBeforePrint();
        });
        
        // After print events
        window.addEventListener('afterprint', () => {
            this.onAfterPrint();
        });
        
        // Visibility change events
        document.addEventListener('visibilitychange', () => {
            this.onVisibilityChange();
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + / to show help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
            
            // Escape to close any open modals
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    /**
     * Generate QR code
     */
    generateQRCode() {
        if (this.qrCodeHandler && this.dataLoader?.data?.settings?.qrCode?.enabled) {
            const qrUrl = this.dataLoader.data.settings.qrCode.url;
            if (qrUrl) {
                this.qrCodeHandler.generateQRCode(qrUrl);
            }
        }
    }

    /**
     * Handle language change
     */
    onLanguageChanged(language) {
        console.log('Language changed to:', language);
        
        // Update document direction and language
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        
        // Re-render data with new language
        if (this.dataLoader) {
            this.dataLoader.renderAll();
        }
        
        // Update QR code if needed
        this.generateQRCode();
        
        // Trigger analytics event
        this.trackEvent('language_changed', { language });
    }

    /**
     * Handle theme change
     */
    onThemeChanged(theme) {
        console.log('Theme changed to:', theme);
        
        // Update QR code colors if needed
        if (this.qrCodeHandler) {
            this.qrCodeHandler.updateColors(theme);
        }
        
        // Trigger analytics event
        this.trackEvent('theme_changed', { theme });
    }

    /**
     * Handle color theme change
     */
    onColorThemeChanged(colorTheme) {
        console.log('Color theme changed to:', colorTheme);
        
        // Update QR code colors if needed
        if (this.qrCodeHandler) {
            this.qrCodeHandler.updateColors();
        }
        
        // Trigger analytics event
        this.trackEvent('color_theme_changed', { colorTheme });
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        // Update layout if needed
        this.updateLayout();
    }

    /**
     * Handle before print
     */
    onBeforePrint() {
        console.log('Preparing for print...');
        
        // Ensure all content is visible
        this.expandAllSections();
        
        // Trigger analytics event
        this.trackEvent('print_initiated');
    }

    /**
     * Handle after print
     */
    onAfterPrint() {
        console.log('Print completed');
        
        // Restore normal layout
        this.restoreLayout();
    }

    /**
     * Handle visibility change
     */
    onVisibilityChange() {
        if (document.hidden) {
            // Page is hidden
            this.onPageHidden();
        } else {
            // Page is visible
            this.onPageVisible();
        }
    }

    /**
     * Handle page hidden
     */
    onPageHidden() {
        // Pause any animations or timers
        this.pauseAnimations();
    }

    /**
     * Handle page visible
     */
    onPageVisible() {
        // Resume animations or timers
        this.resumeAnimations();
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    /**
     * Add fade-in animation to main content
     */
    addFadeInAnimation() {
        const cvContainer = document.querySelector('.cv-container');
        if (cvContainer) {
            cvContainer.classList.add('fade-in');
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-control btn-primary">
                    <i class="fas fa-refresh"></i>
                    Reload Page
                </button>
            </div>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            text-align: center;
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Show keyboard shortcuts help
     */
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'Ctrl/Cmd + Shift + L', action: 'Toggle Language' },
            { key: 'Ctrl/Cmd + Shift + T', action: 'Toggle Theme' },
            { key: 'Ctrl/Cmd + P', action: 'Print CV' },
            { key: 'Ctrl/Cmd + Shift + P', action: 'Export as PDF' },
            { key: 'Ctrl/Cmd + Shift + I', action: 'Export as PNG' },
            { key: 'Ctrl/Cmd + /', action: 'Show this help' },
            { key: 'Escape', action: 'Close modals' }
        ];
        
        const helpContent = shortcuts.map(shortcut => 
            `<div class="shortcut-item">
                <kbd>${shortcut.key}</kbd>
                <span>${shortcut.action}</span>
            </div>`
        ).join('');
        
        this.showModal('Keyboard Shortcuts', helpContent);
    }

    /**
     * Show modal dialog
     */
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    /**
     * Close all modals
     */
    closeModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.remove());
    }

    /**
     * Update layout
     */
    updateLayout() {
        // Responsive layout adjustments
        const cvWrapper = document.querySelector('.cv-wrapper');
        if (cvWrapper && window.innerWidth <= 768) {
            cvWrapper.classList.add('mobile-layout');
        } else if (cvWrapper) {
            cvWrapper.classList.remove('mobile-layout');
        }
    }

    /**
     * Expand all sections for printing
     */
    expandAllSections() {
        const collapsibleSections = document.querySelectorAll('.collapsible');
        collapsibleSections.forEach(section => {
            section.classList.add('expanded');
        });
    }

    /**
     * Restore normal layout after printing
     */
    restoreLayout() {
        const collapsibleSections = document.querySelectorAll('.collapsible');
        collapsibleSections.forEach(section => {
            section.classList.remove('expanded');
        });
    }

    /**
     * Pause animations
     */
    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    /**
     * Resume animations
     */
    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    /**
     * Track analytics events
     */
    trackEvent(eventName, properties = {}) {
        // Basic analytics tracking
        console.log('Event:', eventName, properties);
        
        // You can integrate with Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    /**
     * Debounce utility function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Get application state
     */
    getState() {
        return {
            isInitialized: this.isInitialized,
            currentLanguage: this.languageHandler?.getCurrentLanguage(),
            currentTheme: this.themeHandler?.getCurrentTheme(),
            currentColorTheme: this.themeHandler?.getCurrentColorTheme()
        };
    }

    /**
     * Reload application
     */
    reload() {
        location.reload();
    }
}

/**
 * QR Code Handler Class
 */
class QRCodeHandler {
    constructor() {
        this.qrCode = null;
    }

    /**
     * Generate QR code
     */
    generateQRCode(url) {
        const qrContainer = document.getElementById('qr-code');
        if (!qrContainer || !window.QRCode) return;

        // Clear existing QR code
        qrContainer.innerHTML = '';

        try {
            this.qrCode = new QRCode(qrContainer, {
                text: url,
                width: 120,
                height: 120,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            qrContainer.innerHTML = '<p>QR Code unavailable</p>';
        }
    }

    /**
     * Update QR code colors based on theme
     */
    updateColors(theme) {
        if (!this.qrCode) return;

        const isDark = theme === 'dark';
        const colorDark = isDark ? '#ffffff' : '#000000';
        const colorLight = isDark ? '#000000' : '#ffffff';

        // Regenerate QR code with new colors
        const qrContainer = document.getElementById('qr-code');
        if (qrContainer && qrContainer.querySelector('canvas')) {
            const url = this.qrCode._oDrawing._elCanvas.getAttribute('data-url');
            if (url) {
                qrContainer.innerHTML = '';
                this.qrCode = new QRCode(qrContainer, {
                    text: url,
                    width: 120,
                    height: 120,
                    colorDark: colorDark,
                    colorLight: colorLight,
                    correctLevel: QRCode.CorrectLevel.M
                });
            }
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cvApp = new CVApp();
});

// Handle page load event
window.addEventListener('load', () => {
    // Additional initialization after all resources are loaded
    console.log('All resources loaded');
});

// Handle before unload event
window.addEventListener('beforeunload', (e) => {
    // Save any unsaved changes or state
    console.log('Page is about to unload');
});

// Export for global access
window.CVApp = CVApp;
window.QRCodeHandler = QRCodeHandler;

