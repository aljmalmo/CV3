/**
 * Export Handler Module
 * Manages PDF/PNG export and printing functionality
 */

class ExportHandler {
    constructor(languageHandler) {
        this.languageHandler = languageHandler;
        this.isExporting = false;
        this.exportOptions = {
            pdf: {
                margin: 0.5,
                filename: 'cv.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            },
            png: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            }
        };
        
        this.init();
    }

    /**
     * Initialize export handler
     */
    init() {
        this.setupExportButtons();
        this.setupPrintButton();
    }

    /**
     * Setup export buttons
     */
    setupExportButtons() {
        const pdfButton = document.getElementById('export-pdf');
        const pngButton = document.getElementById('export-png');
        
        if (pdfButton) {
            pdfButton.addEventListener('click', () => {
                this.exportAsPDF();
            });
        }
        
        if (pngButton) {
            pngButton.addEventListener('click', () => {
                this.exportAsPNG();
            });
        }
    }

    /**
     * Setup print button
     */
    setupPrintButton() {
        const printButton = document.getElementById('print-cv');
        if (printButton) {
            printButton.addEventListener('click', () => {
                this.printCV();
            });
        }
    }

    /**
     * Export CV as PDF
     */
    async exportAsPDF() {
        if (this.isExporting) return;
        
        try {
            this.isExporting = true;
            this.showExportProgress('PDF');
            
            // Prepare for export
            await this.prepareForExport();
            
            const element = document.getElementById('cv-content');
            if (!element) {
                throw new Error('CV content element not found');
            }
            
            // Generate filename
            const filename = this.generateFilename('pdf');
            
            // Configure options
            const options = {
                ...this.exportOptions.pdf,
                filename: filename
            };
            
            // Generate PDF
            await html2pdf().set(options).from(element).save();
            
            this.showExportSuccess('PDF');
            
        } catch (error) {
            console.error('PDF export failed:', error);
            this.showExportError('PDF', error.message);
        } finally {
            this.isExporting = false;
            this.restoreAfterExport();
        }
    }

    /**
     * Export CV as PNG
     */
    async exportAsPNG() {
        if (this.isExporting) return;
        
        try {
            this.isExporting = true;
            this.showExportProgress('PNG');
            
            // Prepare for export
            await this.prepareForExport();
            
            const element = document.getElementById('cv-content');
            if (!element) {
                throw new Error('CV content element not found');
            }
            
            // Generate canvas
            const canvas = await html2canvas(element, this.exportOptions.png);
            
            // Generate filename
            const filename = this.generateFilename('png');
            
            // Download image
            this.downloadCanvas(canvas, filename);
            
            this.showExportSuccess('PNG');
            
        } catch (error) {
            console.error('PNG export failed:', error);
            this.showExportError('PNG', error.message);
        } finally {
            this.isExporting = false;
            this.restoreAfterExport();
        }
    }

    /**
     * Print CV
     */
    printCV() {
        try {
            // Prepare for print
            this.prepareForPrint();
            
            // Trigger print
            window.print();
            
        } catch (error) {
            console.error('Print failed:', error);
            this.showExportError('Print', error.message);
        }
    }

    /**
     * Prepare document for export
     */
    async prepareForExport() {
        // Hide non-printable elements
        const nonPrintElements = document.querySelectorAll('.no-print');
        nonPrintElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Ensure all images are loaded
        await this.waitForImages();
        
        // Force light theme for better print quality
        const originalTheme = document.body.getAttribute('data-theme');
        document.body.setAttribute('data-theme', 'light');
        this.originalTheme = originalTheme;
        
        // Wait for theme transition
        await this.sleep(300);
    }

    /**
     * Restore document after export
     */
    restoreAfterExport() {
        // Restore non-printable elements
        const nonPrintElements = document.querySelectorAll('.no-print');
        nonPrintElements.forEach(el => {
            el.style.display = '';
        });
        
        // Restore original theme
        if (this.originalTheme) {
            document.body.setAttribute('data-theme', this.originalTheme);
        }
    }

    /**
     * Prepare document for print
     */
    prepareForPrint() {
        // Add print class to body
        document.body.classList.add('printing');
        
        // Listen for after print event
        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        }, { once: true });
    }

    /**
     * Wait for all images to load
     */
    waitForImages() {
        return new Promise((resolve) => {
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            const totalImages = images.length;
            
            if (totalImages === 0) {
                resolve();
                return;
            }
            
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        resolve();
                    }
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    /**
     * Generate filename based on current data
     */
    generateFilename(extension) {
        const nameElement = document.getElementById('profile-name');
        const name = nameElement ? nameElement.textContent.trim() : 'CV';
        const sanitizedName = name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
        const timestamp = new Date().toISOString().split('T')[0];
        const lang = this.languageHandler ? this.languageHandler.getCurrentLanguage() : 'en';
        
        return `${sanitizedName}_CV_${lang}_${timestamp}.${extension}`;
    }

    /**
     * Download canvas as image
     */
    downloadCanvas(canvas, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Show export progress
     */
    showExportProgress(type) {
        const button = this.getExportButton(type);
        if (button) {
            button.disabled = true;
            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Exporting...</span>
            `;
        }
    }

    /**
     * Show export success
     */
    showExportSuccess(type) {
        const button = this.getExportButton(type);
        if (button) {
            button.innerHTML = `
                <i class="fas fa-check"></i>
                <span>Success!</span>
            `;
            
            // Reset button after delay
            setTimeout(() => {
                this.resetExportButton(type);
            }, 2000);
        }
        
        // Show success notification
        this.showNotification(`${type} exported successfully!`, 'success');
    }

    /**
     * Show export error
     */
    showExportError(type, message) {
        const button = this.getExportButton(type);
        if (button) {
            button.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Error</span>
            `;
            
            // Reset button after delay
            setTimeout(() => {
                this.resetExportButton(type);
            }, 3000);
        }
        
        // Show error notification
        this.showNotification(`${type} export failed: ${message}`, 'error');
    }

    /**
     * Get export button by type
     */
    getExportButton(type) {
        const buttonIds = {
            'PDF': 'export-pdf',
            'PNG': 'export-png',
            'Print': 'print-cv'
        };
        
        return document.getElementById(buttonIds[type]);
    }

    /**
     * Reset export button to original state
     */
    resetExportButton(type) {
        const button = this.getExportButton(type);
        if (!button) return;
        
        button.disabled = false;
        
        const buttonContent = {
            'PDF': '<i class="fas fa-file-pdf"></i><span data-en="PDF" data-ar="PDF">PDF</span>',
            'PNG': '<i class="fas fa-image"></i><span data-en="PNG" data-ar="PNG">PNG</span>',
            'Print': '<i class="fas fa-print"></i><span data-en="Print" data-ar="طباعة">Print</span>'
        };
        
        button.innerHTML = buttonContent[type] || '';
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Sleep utility function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Setup keyboard shortcuts for export
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printCV();
            }
            
            // Ctrl/Cmd + Shift + P for PDF export
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.exportAsPDF();
            }
            
            // Ctrl/Cmd + Shift + I for PNG export
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.exportAsPNG();
            }
        });
    }

    /**
     * Get export statistics
     */
    getExportStats() {
        return {
            totalExports: parseInt(localStorage.getItem('cv-export-count') || '0'),
            lastExport: localStorage.getItem('cv-last-export'),
            preferredFormat: localStorage.getItem('cv-preferred-format') || 'PDF'
        };
    }

    /**
     * Update export statistics
     */
    updateExportStats(format) {
        const currentCount = parseInt(localStorage.getItem('cv-export-count') || '0');
        localStorage.setItem('cv-export-count', (currentCount + 1).toString());
        localStorage.setItem('cv-last-export', new Date().toISOString());
        localStorage.setItem('cv-preferred-format', format);
    }
}

// Export for use in other modules
window.ExportHandler = ExportHandler;

