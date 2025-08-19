/**
 * Data Loader Module
 * Handles loading and rendering CV data from JSON file
 */

class DataLoader {
    constructor() {
        this.data = null;
        this.currentLang = 'en';
    }

    /**
     * Load CV data from JSON file
     */
    async loadData() {
        try {
            const response = await fetch('data/cv-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error loading CV data:', error);
            // Fallback to default data if JSON fails to load
            this.data = this.getDefaultData();
            return this.data;
        }
    }

    /**
     * Get default fallback data
     */
    getDefaultData() {
        return {
            personalInfo: {
                en: {
                    name: "Your Name",
                    title: "Your Professional Title",
                    email: "your.email@example.com",
                    phone: "+1 234 567 8900",
                    location: "Your City, Country",
                    website: "https://yourwebsite.com",
                    linkedin: "https://linkedin.com/in/yourprofile",
                    github: "https://github.com/yourusername",
                    summary: "Your professional summary goes here. Describe your experience, skills, and career objectives."
                },
                ar: {
                    name: "اسمك",
                    title: "مسماك الوظيفي",
                    email: "your.email@example.com",
                    phone: "+1 234 567 8900",
                    location: "مدينتك، بلدك",
                    website: "https://yourwebsite.com",
                    linkedin: "https://linkedin.com/in/yourprofile",
                    github: "https://github.com/yourusername",
                    summary: "ملخصك المهني يأتي هنا. اوصف خبرتك ومهاراتك وأهدافك المهنية."
                }
            },
            experience: { en: [], ar: [] },
            education: { en: [], ar: [] },
            skills: { en: { technical: [], soft: [] }, ar: { technical: [], soft: [] } },
            projects: { en: [], ar: [] },
            languages: { en: [], ar: [] },
            interests: { en: [], ar: [] },
            settings: {
                profileImage: { enabled: false, url: "" },
                qrCode: { enabled: false, url: "" },
                theme: { default: "light", colors: { primary: "#2563eb" } }
            }
        };
    }

    /**
     * Set current language
     */
    setLanguage(lang) {
        this.currentLang = lang;
    }

    /**
     * Get data for current language
     */
    getCurrentData(section) {
        if (!this.data || !this.data[section]) return null;
        return this.data[section][this.currentLang] || this.data[section]['en'];
    }

    /**
     * Render personal information
     */
    renderPersonalInfo() {
        const personalInfo = this.getCurrentData('personalInfo');
        if (!personalInfo) return;

        // Update profile name and title
        const nameElement = document.getElementById('profile-name');
        const titleElement = document.getElementById('profile-title');
        
        if (nameElement) nameElement.textContent = personalInfo.name;
        if (titleElement) titleElement.textContent = personalInfo.title;

        // Update summary
        const summaryElement = document.getElementById('summary-text');
        if (summaryElement) summaryElement.textContent = personalInfo.summary;

        // Update contact information
        this.renderContactInfo(personalInfo);
    }

    /**
     * Render contact information
     */
    renderContactInfo(personalInfo) {
        const contactList = document.getElementById('contact-list');
        if (!contactList) return;

        const contactItems = [
            { icon: 'fas fa-envelope', value: personalInfo.email, link: `mailto:${personalInfo.email}` },
            { icon: 'fas fa-phone', value: personalInfo.phone, link: `tel:${personalInfo.phone}` },
            { icon: 'fas fa-map-marker-alt', value: personalInfo.location },
            { icon: 'fas fa-globe', value: personalInfo.website, link: personalInfo.website },
            { icon: 'fab fa-linkedin', value: 'LinkedIn', link: personalInfo.linkedin },
            { icon: 'fab fa-github', value: 'GitHub', link: personalInfo.github }
        ];

        contactList.innerHTML = contactItems.map(item => {
            if (!item.value) return '';
            
            const content = item.link 
                ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.value}</a>`
                : item.value;
                
            return `
                <div class="contact-item">
                    <i class="${item.icon}"></i>
                    ${content}
                </div>
            `;
        }).join('');
    }

    /**
     * Render skills section
     */
    renderSkills() {
        const skills = this.getCurrentData('skills');
        if (!skills) return;

        // Render technical skills
        const technicalSkillsElement = document.getElementById('technical-skills');
        if (technicalSkillsElement && skills.technical) {
            technicalSkillsElement.innerHTML = skills.technical.map(skill => 
                `<div class="skill-item">${skill}</div>`
            ).join('');
        }

        // Render soft skills
        const softSkillsElement = document.getElementById('soft-skills');
        if (softSkillsElement && skills.soft) {
            softSkillsElement.innerHTML = skills.soft.map(skill => 
                `<div class="skill-item">${skill}</div>`
            ).join('');
        }
    }

    /**
     * Render languages section
     */
    renderLanguages() {
        const languages = this.getCurrentData('languages');
        if (!languages) return;

        const languagesElement = document.getElementById('languages-list');
        if (!languagesElement) return;

        languagesElement.innerHTML = languages.map(lang => `
            <div class="language-item">
                <span class="language-name">${lang.language}</span>
                <span class="language-level">${lang.level}</span>
            </div>
        `).join('');
    }

    /**
     * Render experience section
     */
    renderExperience() {
        const experience = this.getCurrentData('experience');
        if (!experience) return;

        const experienceElement = document.getElementById('experience-list');
        if (!experienceElement) return;

        experienceElement.innerHTML = experience.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="experience-title">${exp.title}</h3>
                    <div class="experience-company">${exp.company}</div>
                    <div class="experience-meta">
                        <span><i class="fas fa-calendar"></i> ${exp.duration}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                    </div>
                </div>
                <ul class="experience-description">
                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Render education section
     */
    renderEducation() {
        const education = this.getCurrentData('education');
        if (!education) return;

        const educationElement = document.getElementById('education-list');
        if (!educationElement) return;

        educationElement.innerHTML = education.map(edu => `
            <div class="education-item">
                <h3 class="education-degree">${edu.degree}</h3>
                <div class="education-institution">${edu.institution}</div>
                <div class="education-meta">
                    <span><i class="fas fa-calendar"></i> ${edu.duration}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${edu.location}</span>
                    ${edu.gpa ? `<span><i class="fas fa-star"></i> GPA: ${edu.gpa}</span>` : ''}
                </div>
                ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
            </div>
        `).join('');
    }

    /**
     * Render projects section
     */
    renderProjects() {
        const projects = this.getCurrentData('projects');
        if (!projects) return;

        const projectsElement = document.getElementById('projects-list');
        if (!projectsElement) return;

        projectsElement.innerHTML = projects.map(project => `
            <div class="project-item">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.link ? `
                    <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        <span data-en="View Project" data-ar="عرض المشروع">View Project</span>
                    </a>
                ` : ''}
            </div>
        `).join('');
    }

    /**
     * Render interests section
     */
    renderInterests() {
        const interests = this.getCurrentData('interests');
        if (!interests) return;

        const interestsElement = document.getElementById('interests-list');
        if (!interestsElement) return;

        interestsElement.innerHTML = interests.map(interest => 
            `<span class="interest-item">${interest}</span>`
        ).join('');
    }

    /**
     * Render profile image
     */
    renderProfileImage() {
        const settings = this.data?.settings;
        if (!settings?.profileImage?.enabled) return;

        const profileImageElement = document.getElementById('profile-image');
        if (profileImageElement && settings.profileImage.url) {
            profileImageElement.src = settings.profileImage.url;
            profileImageElement.onerror = () => {
                profileImageElement.src = 'assets/images/profile-placeholder.jpg';
            };
        }
    }

    /**
     * Render all sections
     */
    renderAll() {
        this.renderPersonalInfo();
        this.renderSkills();
        this.renderLanguages();
        this.renderExperience();
        this.renderEducation();
        this.renderProjects();
        this.renderInterests();
        this.renderProfileImage();
    }
}

// Export for use in other modules
window.DataLoader = DataLoader;

