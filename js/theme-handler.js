/**
 * Theme Handler Module
 * Manages dark/light mode and color themes
 */

class ThemeHandler {
    constructor() {
        this.currentTheme = 'light';
        this.currentColorTheme = 'blue';
        this.themes = {
            light: {
                name: 'Light',
                icon: 'fas fa-sun'
            },
            dark: {
                name: 'Dark',
                icon: 'fas fa-moon'
            }
        };
        
        this.colorThemes = {
            blue: '#2563eb',
            green: '#059669',
            purple: '#7c3aed',
            red: '#dc2626',
            orange: '#ea580c',
            teal: '#0d9488'
        };
        
        this.init();
    }

    /**
     * Initialize theme handler
     */
    init() {
        this.setupThemeToggle();
        this.setupColorThemes();
        this.loadSavedTheme();
        this.detectSystemTheme();
    }

    /**
     * Setup theme toggle button
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    /**
     * Setup color theme buttons
     */
    setupColorThemes() {
        const colorThemeButtons = document.querySelectorAll('.theme-color');
        colorThemeButtons.forEach(button => {
            const theme = button.getAttribute('data-theme');
            if (theme) {
                button.addEventListener('click', () => {
                    this.setColorTheme(theme);
                });
            }
        });
    }

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('cv-theme');
        const savedColorTheme = localStorage.getItem('cv-color-theme');
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            this.setTheme(savedTheme);
        }
        
        if (savedColorTheme && this.colorThemes[savedColorTheme]) {
            this.setColorTheme(savedColorTheme);
        }
    }

    /**
     * Detect system theme preference
     */
    detectSystemTheme() {
        if (!localStorage.getItem('cv-theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('cv-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Set theme (light/dark)
     */
    setTheme(theme) {
        if (!this.themes[theme]) return;
        
        this.currentTheme = theme;
        
        // Update body attribute
        document.body.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('cv-theme', theme);
        
        // Update theme toggle button
        this.updateThemeToggleButton();
        
        // Update meta theme-color
        this.updateMetaThemeColor();
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
        
        // Add transition class for smooth theme switching
        this.addThemeTransition();
    }

    /**
     * Set color theme
     */
    setColorTheme(colorTheme) {
        if (!this.colorThemes[colorTheme]) return;
        
        this.currentColorTheme = colorTheme;
        
        // Update body attribute
        document.body.setAttribute('data-color-theme', colorTheme);
        
        // Save to localStorage
        localStorage.setItem('cv-color-theme', colorTheme);
        
        // Update active color theme button
        this.updateColorThemeButtons();
        
        // Update CSS custom properties
        this.updateColorVariables(colorTheme);
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('colorThemeChanged', {
            detail: { colorTheme: colorTheme }
        }));
    }

    /**
     * Update theme toggle button
     */
    updateThemeToggleButton() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            // Remove existing classes
            icon.className = '';
            // Add new icon class
            icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update title
        const title = this.currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        themeToggle.title = title;
        themeToggle.setAttribute('aria-label', title);
    }

    /**
     * Update color theme buttons
     */
    updateColorThemeButtons() {
        const colorThemeButtons = document.querySelectorAll('.theme-color');
        colorThemeButtons.forEach(button => {
            const theme = button.getAttribute('data-theme');
            if (theme === this.currentColorTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Update CSS color variables
     */
    updateColorVariables(colorTheme) {
        const root = document.documentElement;
        const primaryColor = this.colorThemes[colorTheme];
        
        if (primaryColor) {
            root.style.setProperty('--primary-color', primaryColor);
            
            // Generate accent color (lighter version)
            const accentColor = this.lightenColor(primaryColor, 10);
            root.style.setProperty('--accent-color', accentColor);
        }
    }

    /**
     * Update meta theme-color for mobile browsers
     */
    updateMetaThemeColor() {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const color = this.currentTheme === 'dark' ? '#1e293b' : '#ffffff';
        metaThemeColor.content = color;
    }

    /**
     * Add smooth transition for theme switching
     */
    addThemeTransition() {
        document.body.classList.add('theme-transition');
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    /**
     * Lighten a hex color
     */
    lightenColor(hex, percent) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse RGB values
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate lighter values
        const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
        const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
        const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
        
        // Convert back to hex
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }

    /**
     * Darken a hex color
     */
    darkenColor(hex, percent) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse RGB values
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate darker values
        const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
        const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
        const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
        
        // Convert back to hex
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get current color theme
     */
    getCurrentColorTheme() {
        return this.currentColorTheme;
    }

    /**
     * Check if dark mode is active
     */
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    /**
     * Setup keyboard shortcuts for theme switching
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    /**
     * Apply theme-specific animations
     */
    applyThemeAnimations() {
        const elements = document.querySelectorAll('.cv-wrapper, .profile-image, .section-title');
        
        elements.forEach(element => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    /**
     * Handle high contrast mode
     */
    handleHighContrast() {
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        if (prefersHighContrast) {
            document.body.classList.add('high-contrast');
        }
        
        // Listen for changes
        window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
    }

    /**
     * Export theme settings
     */
    exportThemeSettings() {
        return {
            theme: this.currentTheme,
            colorTheme: this.currentColorTheme,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Import theme settings
     */
    importThemeSettings(settings) {
        if (settings.theme) {
            this.setTheme(settings.theme);
        }
        if (settings.colorTheme) {
            this.setColorTheme(settings.colorTheme);
        }
    }
}

// Export for use in other modules
window.ThemeHandler = ThemeHandler;

