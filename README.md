# 🌟 Bilingual CV/Resume Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-green)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

A **professional, modern, and fully customizable CV/Resume template** with complete **Arabic and English bilingual support**. Built with pure HTML5, CSS3, and JavaScript - no complex frameworks required!

## ✨ Features

### 🌍 **Bilingual Support**
- **Full RTL (Right-to-Left) and LTR (Left-to-Right) support**
- **Seamless language switching** between Arabic and English
- **Proper Arabic font rendering** with Noto Sans Arabic
- **Automatic text direction detection**

### 🎨 **Modern Design**
- **Clean, minimalist, and professional layout**
- **Fully responsive design** (desktop, tablet, mobile)
- **Multiple color themes** (Blue, Green, Purple, Red, Orange, Teal)
- **Dark/Light mode toggle**
- **Smooth animations and transitions**
- **Professional icons** using Font Awesome

### 📄 **Export & Download**
- **High-quality PDF export** using html2pdf.js
- **PNG image export** using html2canvas
- **Print-friendly layout** with optimized print styles
- **Automatic filename generation** with timestamp and language

### ⚙️ **Easy Customization**
- **Single JSON configuration file** - no code editing required
- **Modular section system** - add/remove sections easily
- **Profile image support** with placeholder fallback
- **QR code generation** for online profiles
- **Keyboard shortcuts** for power users

### 🔧 **Technical Features**
- **Pure HTML/CSS/JavaScript** - no build process required
- **Modern ES6+ JavaScript** with modular architecture
- **CSS Custom Properties** for easy theming
- **Accessibility features** with proper ARIA labels
- **SEO optimized** with Open Graph meta tags
- **Cross-browser compatibility**

## 🚀 Quick Start

### 1. Download or Clone
```bash
git clone https://github.com/yourusername/bilingual-cv-template.git
cd bilingual-cv-template
```

### 2. Customize Your Data
Edit the `data/cv-data.json` file with your personal information:

```json
{
  "personalInfo": {
    "en": {
      "name": "Your Name",
      "title": "Your Professional Title",
      "email": "your.email@example.com",
      "phone": "+1 234 567 8900",
      "location": "Your City, Country",
      "website": "https://yourwebsite.com",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "github": "https://github.com/yourusername",
      "summary": "Your professional summary..."
    },
    "ar": {
      "name": "اسمك",
      "title": "مسماك الوظيفي",
      // ... Arabic translations
    }
  }
  // ... other sections
}
```

### 3. Add Your Profile Picture (Optional)
- Place your profile image in `assets/images/`
- Update the `settings.profileImage.url` in `cv-data.json`
- Supported formats: JPG, PNG, WebP

### 4. Open in Browser
Simply open `index.html` in your web browser - no server required!

## 📁 Project Structure

```
bilingual-cv-template/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main styles
│   ├── themes.css          # Color themes and dark mode
│   └── print.css           # Print-specific styles
├── js/
│   ├── main.js             # Application initialization
│   ├── data-loader.js      # Data loading and rendering
│   ├── language-handler.js # Language switching logic
│   ├── theme-handler.js    # Theme management
│   └── export-handler.js   # PDF/PNG export functionality
├── data/
│   └── cv-data.json        # Your CV data (customize this!)
├── assets/
│   ├── images/             # Profile pictures and assets
│   └── fonts/              # Custom fonts (if needed)
├── docs/                   # Documentation files
└── README.md               # This file
```

## 🎯 Customization Guide

### Adding New Sections

1. **Update the JSON data** in `data/cv-data.json`:
```json
{
  "newSection": {
    "en": [
      {
        "title": "Section Item",
        "description": "Item description"
      }
    ],
    "ar": [
      {
        "title": "عنصر القسم",
        "description": "وصف العنصر"
      }
    ]
  }
}
```

2. **Add HTML structure** in `index.html`:
```html
<section class="new-section">
  <h2 class="section-title">
    <i class="fas fa-icon"></i>
    <span data-en="Section Title" data-ar="عنوان القسم">Section Title</span>
  </h2>
  <div class="new-section-list" id="new-section-list">
    <!-- Content will be populated by JavaScript -->
  </div>
</section>
```

3. **Add rendering logic** in `js/data-loader.js`:
```javascript
renderNewSection() {
  const newSectionData = this.getCurrentData('newSection');
  if (!newSectionData) return;
  
  const element = document.getElementById('new-section-list');
  if (!element) return;
  
  element.innerHTML = newSectionData.map(item => `
    <div class="new-section-item">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join('');
}
```

### Customizing Colors

Edit CSS custom properties in `css/themes.css`:

```css
[data-color-theme="custom"] {
  --primary-color: #your-color;
  --accent-color: #your-accent-color;
}
```

### Adding New Fonts

1. **Add font imports** to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Update CSS variables** in `css/styles.css`:
```css
:root {
  --font-family-en: 'Your Font', sans-serif;
  --font-family-ar: 'Your Arabic Font', sans-serif;
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Shift + L` | Toggle Language |
| `Ctrl/Cmd + Shift + T` | Toggle Dark/Light Mode |
| `Ctrl/Cmd + P` | Print CV |
| `Ctrl/Cmd + Shift + P` | Export as PDF |
| `Ctrl/Cmd + Shift + I` | Export as PNG |
| `Ctrl/Cmd + /` | Show Keyboard Shortcuts |
| `Escape` | Close Modals |

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Opera | 47+ | ✅ Fully Supported |

## 📱 Mobile Support

The template is fully responsive and works perfectly on:
- 📱 **Mobile phones** (320px and up)
- 📱 **Tablets** (768px and up)
- 💻 **Desktops** (1024px and up)
- 🖥️ **Large screens** (1440px and up)

## 🔧 Advanced Configuration

### Environment Variables
You can customize behavior by setting these in your hosting environment:

```javascript
// In js/main.js
const config = {
  defaultLanguage: 'en', // or 'ar'
  defaultTheme: 'light', // or 'dark'
  defaultColorTheme: 'blue',
  enableAnalytics: false,
  enableQRCode: true
};
```

### Custom Styling
Override default styles by adding your CSS after the main stylesheets:

```html
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/themes.css">
<link rel="stylesheet" href="css/print.css" media="print">
<link rel="stylesheet" href="css/custom.css"> <!-- Your custom styles -->
```

## 🚀 Deployment Options

### GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your CV will be available at `https://yourusername.github.io/bilingual-cv-template`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy with default settings (no build process required)
3. Optional: Set up custom domain

### Vercel
1. Import your GitHub repository to Vercel
2. Deploy as a static site
3. Automatic deployments on every push

### Traditional Web Hosting
Simply upload all files to your web server - no special configuration needed!

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use the [GitHub Issues](https://github.com/yourusername/bilingual-cv-template/issues) page
- Provide detailed description and steps to reproduce
- Include browser version and operating system

### Feature Requests
- Check existing issues first
- Describe the feature and its benefits
- Consider submitting a pull request

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request with detailed description

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/bilingual-cv-template.git
cd bilingual-cv-template

# No build process required - just open index.html in your browser!
# For development, you might want to use a local server:
python -m http.server 8000
# or
npx serve .
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial use** - Use it for your business
- ✅ **Modification** - Customize as needed
- ✅ **Distribution** - Share with others
- ✅ **Private use** - Use for personal projects
- ❗ **Attribution** - Keep the license notice

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for Noto Sans Arabic and Inter fonts
- **html2pdf.js** for PDF export functionality
- **html2canvas** for PNG export functionality
- **QRCode.js** for QR code generation

## 📞 Support

Need help? Here are your options:

- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/bilingual-cv-template/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/bilingual-cv-template/discussions)
- 📧 **Email**: your.email@example.com

## 🔮 Roadmap

### Upcoming Features
- [ ] **Multiple CV layouts** (Academic, Creative, Corporate)
- [ ] **More export formats** (Word, LaTeX)
- [ ] **Online CV builder** interface
- [ ] **Template marketplace** integration
- [ ] **More language support** (French, Spanish, German)
- [ ] **Advanced animations** and micro-interactions
- [ ] **CV analytics** and view tracking
- [ ] **Social media integration**

### Version History
- **v1.0.0** - Initial release with bilingual support
- **v1.1.0** - Added dark mode and color themes
- **v1.2.0** - Enhanced export functionality
- **v1.3.0** - Improved mobile responsiveness

---

## 🌟 Star This Repository

If you find this template useful, please consider giving it a star ⭐ on GitHub. It helps others discover the project and motivates continued development!

---

**Made with ❤️ by [Manus AI](https://github.com/manus-ai)**

*Building the future of professional CV templates, one commit at a time.*

