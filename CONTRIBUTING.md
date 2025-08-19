# 🤝 Contributing to Bilingual CV Template

Thank you for your interest in contributing to the Bilingual CV Template! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

### 1. Report Bugs
- Use the [GitHub Issues](https://github.com/yourusername/bilingual-cv-template/issues) page
- Search existing issues before creating a new one
- Provide detailed information about the bug
- Include steps to reproduce the issue
- Mention your browser version and operating system

### 2. Suggest Features
- Check existing issues and discussions first
- Describe the feature and its benefits clearly
- Explain how it fits with the project's goals
- Consider submitting a pull request if you can implement it

### 3. Improve Documentation
- Fix typos and grammatical errors
- Add missing information
- Improve clarity and readability
- Translate documentation to other languages

### 4. Submit Code Changes
- Fix bugs
- Implement new features
- Improve performance
- Enhance accessibility
- Add new themes or layouts

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- A modern web browser for testing
- Git for version control
- A text editor or IDE

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/bilingual-cv-template.git
   cd bilingual-cv-template
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and test thoroughly
5. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** on GitHub

## 📝 Code Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)
- Add comments for complex sections
- Ensure valid HTML markup

### CSS
- Follow BEM naming convention where applicable
- Use CSS custom properties for theming
- Maintain consistent indentation (2 spaces)
- Group related properties together
- Add comments for complex styles
- Ensure cross-browser compatibility

### JavaScript
- Use modern ES6+ syntax
- Follow consistent naming conventions (camelCase)
- Add JSDoc comments for functions
- Handle errors gracefully
- Maintain modular architecture
- Avoid global variables when possible

### File Organization
```
bilingual-cv-template/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main styles
│   ├── themes.css          # Color themes
│   └── print.css           # Print styles
├── js/
│   ├── main.js             # App initialization
│   ├── data-loader.js      # Data handling
│   ├── language-handler.js # Language logic
│   ├── theme-handler.js    # Theme management
│   └── export-handler.js   # Export functionality
├── data/
│   └── cv-data.json        # Sample CV data
└── assets/
    ├── images/             # Images and icons
    └── fonts/              # Custom fonts
```

## 🎨 Design Guidelines

### Visual Design
- Maintain clean, professional appearance
- Ensure good contrast ratios (WCAG AA compliance)
- Use consistent spacing and typography
- Support both light and dark themes
- Ensure responsive design works on all devices

### User Experience
- Keep interactions intuitive and accessible
- Provide clear feedback for user actions
- Maintain fast loading times
- Ensure keyboard navigation works
- Test with screen readers when possible

### Internationalization
- Support RTL (Right-to-Left) languages properly
- Use appropriate fonts for different languages
- Consider cultural differences in design
- Test with actual native speakers when possible

## 🧪 Testing Guidelines

### Browser Testing
Test your changes in:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Device Testing
- Desktop (1920x1080 and 1366x768)
- Tablet (768x1024 and 1024x768)
- Mobile (375x667 and 414x896)

### Feature Testing
- Language switching (English ↔ Arabic)
- Theme switching (Light ↔ Dark)
- Color theme changes
- PDF export functionality
- PNG export functionality
- Print layout
- Keyboard shortcuts
- Responsive behavior

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus indicators
- ARIA labels and roles

## 📋 Pull Request Process

### Before Submitting
1. **Test thoroughly** on multiple browsers and devices
2. **Update documentation** if needed
3. **Add or update comments** in your code
4. **Ensure no console errors** or warnings
5. **Check that all features work** as expected

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari/Edge
- [ ] Tested on mobile devices
- [ ] Tested language switching
- [ ] Tested theme switching
- [ ] Tested export functionality

## Screenshots
Add screenshots if applicable.

## Additional Notes
Any additional information or context.
```

### Review Process
1. **Automated checks** will run on your PR
2. **Maintainers will review** your code
3. **Feedback will be provided** if changes are needed
4. **Approval and merge** once everything looks good

## 🌍 Translation Guidelines

### Adding New Languages
1. **Update `cv-data.json`** with new language keys
2. **Add language support** in `language-handler.js`
3. **Update HTML** with new `data-*` attributes
4. **Test thoroughly** with native speakers
5. **Update documentation** to mention new language support

### Translation Quality
- Use professional, formal language
- Maintain consistency in terminology
- Consider cultural context
- Get review from native speakers
- Test RTL languages properly

## 🐛 Bug Report Template

When reporting bugs, please include:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
Add screenshots if applicable.

**Environment**
- Browser: [e.g. Chrome 91]
- OS: [e.g. Windows 10]
- Device: [e.g. Desktop, iPhone 12]
- Language: [e.g. English, Arabic]
- Theme: [e.g. Light, Dark]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

## 📞 Questions?

- 💬 **GitHub Discussions**: For general questions and ideas
- 📧 **Email**: contact@manus.ai for private inquiries
- 🐛 **Issues**: For bug reports and feature requests

## 📄 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members

---

**Thank you for contributing to making this project better! 🙏**

