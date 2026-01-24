// ============================================
// Modern Solar Energy Website - Main JavaScript
// ============================================

class SolarEnergyWebsite {
    constructor() {
        this.init();
    }

    // Initialize all functionality
    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupModals();
        this.setupFloatingActions();
        this.initCountingAnimation();
        this.setupScrollAnimations();
        this.setupFormValidation();
        this.setupClientsSlider();
        this.setupBackToTop();
        this.setupHeroAnimation();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu-wrapper');
        const nav = document.querySelector('.nav-container');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            nav.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-content')) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                nav.classList.remove('menu-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                nav.classList.remove('menu-open');
            }
        });
    }

    // Dropdown functionality
    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-link');

            toggle?.addEventListener('click', (e) => {
                if (window.innerWidth > 768) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Modal functionality
    setupModals() {
        const modal = document.getElementById('consultationModal');
        const trigger = document.querySelector('.consultation-trigger');
        const closeBtn = document.querySelector('.modal-close');
        const floatContact = document.querySelector('.float-button.contact');

        if (!modal) return;

        // Open modal
        const openModal = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animate in
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        };

        // Close modal
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        };

        // Event listeners
        trigger?.addEventListener('click', openModal);
        floatContact?.addEventListener('click', openModal);
        closeBtn?.addEventListener('click', closeModal);

        // Close when clicking outside modal
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // Floating actions
    setupFloatingActions() {
        const topBtn = document.querySelector('.float-button.top');
        const contactBtn = document.querySelector('.float-button.contact');
        
        // Contact button shows contact info
        contactBtn?.addEventListener('click', () => {
            const contactInfo = document.createElement('div');
            contactInfo.className = 'contact-tooltip';
            contactInfo.innerHTML = `
                <div class="tooltip-content">
                    <p>📞 +2349050307173</p>
                    <p>📧 hello@mosolarenergy.com</p>
                    <p>📍 Abuja, Nigeria</p>
                </div>
            `;
            
            contactInfo.style.position = 'absolute';
            contactInfo.style.bottom = '70px';
            contactInfo.style.right = '0';
            contactInfo.style.background = 'white';
            contactInfo.style.padding = '1rem';
            contactInfo.style.borderRadius = '12px';
            contactInfo.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
            contactInfo.style.zIndex = '1000';
            contactInfo.style.minWidth = '200px';
            
            contactBtn.appendChild(contactInfo);
            
            // Remove tooltip after 5 seconds
            setTimeout(() => {
                if (contactInfo.parentNode) {
                    contactInfo.remove();
                }
            }, 5000);
        });
    }

    // Back to top functionality
    setupBackToTop() {
        const topBtn = document.querySelector('.float-button.top');
        
        if (!topBtn) return;
        
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        });
    }

    // Counting animation for statistics
    initCountingAnimation() {
        const statCards = document.querySelectorAll('.stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const numberElement = card.querySelector('.stat-number');
                    const progressBar = card.querySelector('.progress-bar');
                    
                    if (!numberElement || numberElement.dataset.animated) return;
                    
                    numberElement.dataset.animated = 'true';
                    this.animateCounter(numberElement, progressBar);
                    
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        statCards.forEach(card => observer.observe(card));
    }

    // Animate counter with progress bar
    animateCounter(element, progressBar) {
        const target = parseFloat(element.dataset.target);
        const suffix = element.dataset.suffix || '';
        const startValue = parseFloat(element.textContent.replace(/[^\d.-]/g, '')) || 0;
        const isKValue = element.textContent.includes('k');
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            let currentValue = startValue + (target - startValue) * easeOutQuart;
            
            if (isKValue) {
                element.textContent = (currentValue / 1000).toFixed(1) + suffix;
            } else {
                element.textContent = currentValue.toFixed(1) + suffix;
            }
            
            // Update progress bar
            if (progressBar) {
                progressBar.style.width = `${progress * 100}%`;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Clients slider animation
    setupClientsSlider() {
        const logos = document.querySelector('.client-logos');
        if (!logos) return;

        // Duplicate logos for seamless scrolling
        const logosHTML = logos.innerHTML;
        logos.innerHTML = logosHTML + logosHTML;
    }

    // Scroll animations
    setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.service-card, .solution-card, .project-card, .benefit-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // Form validation
    setupFormValidation() {
        const form = document.querySelector('.modal-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    this.showError(input, 'This field is required');
                } else {
                    this.clearError(input);
                }
            });
            
            // Email validation
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    this.showError(emailInput, 'Please enter a valid email address');
                }
            }
            
            if (isValid) {
                this.submitForm(form);
            }
        });
    }

    // Show error message
    showError(input, message) {
        this.clearError(input);
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ff4757';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(error);
        input.style.borderColor = '#ff4757';
    }

    // Clear error message
    clearError(input) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
        input.style.borderColor = '';
    }

    // Form submission
    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual EmailJS integration)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            this.showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
            
            // Close modal
            const modal = document.getElementById('consultationModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Reset form
            form.reset();
            
            // Reset reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        }, 2000);
    }

    // Show notification
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.zIndex = '3000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease';
        
        if (type === 'success') {
            notification.style.background = '#2ed573';
        } else {
            notification.style.background = '#ff4757';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Hero animation
    setupHeroAnimation() {
        const hero = document.querySelector('.hero');
        
        if (!hero) return;
        
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Initialize on DOM load
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            new SolarEnergyWebsite();
        });
    }
}

// Initialize the website
SolarEnergyWebsite.init();

// Additional utilities
window.addEventListener('load', () => {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu-wrapper.active {
            display: block !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .g-recaptcha {
            margin: 1rem 0;
            display: flex;
            justify-content: center;
        }
        
        @media (max-width: 768px) {
            .g-recaptcha {
                transform: scale(0.85);
                transform-origin: left;
            }
        }
    `;
    document.head.appendChild(style);
});

// EmailJS Integration
(function() {
    // Initialize EmailJS
    emailjs.init("rtxjX2D0E6_QcHS1N");
    
    // Add reCAPTCHA validation
    function validateRecaptcha() {
        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            alert("Please complete the reCAPTCHA before submitting.");
            return false;
        }
        return true;
    }
    
    // Update form submission to use EmailJS
    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('modal-form')) {
            e.preventDefault();
            
            if (!validateRecaptcha()) {
                return;
            }
            
            const formData = {
                query: e.target.querySelector('textarea').value,
                responseMethod: e.target.querySelector('select').value,
                reachTime: e.target.querySelector('input[type="date"]').value,
                reachDate: e.target.querySelectorAll('select')[1].value,
                name: e.target.querySelector('input[type="text"]').value,
                phone: e.target.querySelector('input[type="tel"]').value,
                email: e.target.querySelector('input[type="email"]').value,
                location: e.target.querySelectorAll('input[type="text"]')[1].value,
                source: e.target.querySelectorAll('select')[2].value
            };
            
            emailjs.send("service_twfts9l", "template_umt99gk", formData)
                .then(function(response) {
                    alert("Message sent successfully!");
                    
                    // Close modal
                    const modal = document.getElementById('consultationModal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        e.target.reset();
                    }
                }, function(error) {
                    alert("Failed to send message. Please try again later.");
                    console.error('EmailJS error:', error);
                });
        }
    });
})();




// ============================================
// ABOUT US PAGE FUNCTIONALITY
// ============================================

class AboutUsPage extends SolarEnergyWebsite {
    constructor() {
        super();
        this.setupAboutPageAnimations();
    }

    // Setup animations specific to About page
    setupAboutPageAnimations() {
        this.setupObjectiveCardsAnimation();
        this.setupScrollAnimations();
    }

    // Animate objective cards when they enter viewport
    setupObjectiveCardsAnimation() {
        const cards = document.querySelectorAll('.objective-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // Staggered animation
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Setup scroll animations for story sections
    setupScrollAnimations() {
        const storySections = document.querySelectorAll('.story-content, .why-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        storySections.forEach(section => observer.observe(section));
    }
}

// Initialize About Us page when on about.html
if (window.location.pathname.includes('about.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new AboutUsPage();
        
        // Add active class to current page in navigation
        const currentPageLink = document.querySelector('a[href="about.html"]');
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    });
}

// Add animation styles
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .objective-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .objective-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .story-content,
        .why-content {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .story-content.fade-in,
        .why-content.fade-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .stack-card {
            transition: transform 0.3s ease;
        }
        
        .nav-link.active .nav-highlight {
            width: 100%;
        }
        
        .dropdown-link.active {
            color: var(--primary-accent);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});





// ============================================
// WHY CHOOSE US PAGE FUNCTIONALITY
// ============================================

class WhyChooseUsPage extends SolarEnergyWebsite {
    constructor() {
        super();
        this.setupWhyChooseUsAnimations();
        this.initStatsCounter();
    }

    // Setup animations specific to Why Choose Us page
    setupWhyChooseUsAnimations() {
        this.setupFeatureCardsAnimation();
        this.setupBenefitItemsAnimation();
        this.setupScrollAnimations();
    }

    // Animate feature cards when they enter viewport
    setupFeatureCardsAnimation() {
        const cards = document.querySelectorAll('.why-feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150); // Staggered animation
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Animate benefit items
    setupBenefitItemsAnimation() {
        const items = document.querySelectorAll('.benefit-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-in');
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        items.forEach(item => observer.observe(item));
    }

    // Initialize animated counter for stats
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Animate counter for statistics
    animateStatCounter(element) {
        const target = element.textContent;
        const count = parseInt(target);
        const is24 = target === '24/7';
        
        if (is24) {
            // For 24/7, just show immediately
            element.textContent = target;
            return;
        }
        
        const duration = 2000; // 2 seconds
        const increment = count / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const sections = document.querySelectorAll('.why-intro, .cta-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Initialize Why Choose Us page when on why choose us.html
if (window.location.pathname.includes('why choose us.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new WhyChooseUsPage();
        
        // Add active class to current page in navigation
        const currentPageLink = document.querySelector('a[href*="why choose us.html"]');
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    });
}

// Add animation styles
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .why-feature-card {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .why-feature-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .benefit-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-item.slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .why-intro,
        .cta-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .why-intro.fade-in,
        .cta-content.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-number {
            transition: all 0.3s ease;
        }
        
        .nav-link.active .nav-highlight {
            width: 100%;
        }
        
        .dropdown-link.active {
            color: var(--primary-accent);
            font-weight: 600;
        }
        
        .cta-image img {
            transition: transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});





// ============================================
// MISSION & VISION PAGE FUNCTIONALITY
// ============================================

class MissionVisionPage extends SolarEnergyWebsite {
    constructor() {
        super();
        this.setupMissionPageAnimations();
    }

    // Setup animations specific to Mission & Vision page
    setupMissionPageAnimations() {
        this.setupOverviewCardsAnimation();
        this.setupValuesAnimation();
        this.setupGoalsAnimation();
        this.initImpactStatsCounter();
        this.setupScrollAnimations();
    }

    // Animate overview cards when they enter viewport
    setupOverviewCardsAnimation() {
        const cards = document.querySelectorAll('.overview-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-in');
                    }, index * 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Animate value cards with staggered effect
    setupValuesAnimation() {
        const values = document.querySelectorAll('.value-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('pop-in');
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        values.forEach(value => observer.observe(value));
    }

    // Animate goals list items
    setupGoalsAnimation() {
        const goals = document.querySelectorAll('.goal-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        goals.forEach(goal => observer.observe(goal));
    }

    // Initialize animated counter for impact stats
    initImpactStatsCounter() {
        const statNumbers = document.querySelectorAll('.impact-stat .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateImpactCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Animate counter for impact statistics
    animateImpactCounter(element) {
        const targetText = element.textContent;
        const target = parseInt(targetText.replace('+', ''));
        const hasPlus = targetText.includes('+');
        
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 16);
    }

    // Setup scroll animations for content sections
    setupScrollAnimations() {
        const sections = document.querySelectorAll('.goals-header, .impact-header, .mission-cta .cta-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Initialize Mission & Vision page when on mission.html
if (window.location.pathname.includes('mission.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new MissionVisionPage();
        
        // Add active class to current page in navigation
        const currentPageLink = document.querySelector('a[href*="mission.html"]');
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    });
}

// Add animation styles
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .overview-card {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .overview-card.vision {
            transform: translateX(50px);
        }
        
        .overview-card.slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .value-card {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .value-card.pop-in {
            opacity: 1;
            transform: scale(1);
        }
        
        .goal-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .goal-item.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .goals-header,
        .impact-header,
        .mission-cta .cta-content {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .goals-header.reveal,
        .impact-header.reveal,
        .mission-cta .cta-content.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-number {
            transition: all 0.3s ease;
        }
        
        .nav-link.active .nav-highlight {
            width: 100%;
        }
        
        .dropdown-link.active {
            color: var(--primary-accent);
            font-weight: 600;
        }
        
        .visual-image img {
            transition: transform 0.6s ease;
        }
        
        .visual-container:hover .visual-image img {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});





// ============================================
// SERVICES PAGE FUNCTIONALITY
// ============================================

class ServicesPage extends SolarEnergyWebsite {
    constructor() {
        super();
        this.setupServicesPageAnimations();
    }

    // Setup animations specific to Services page
    setupServicesPageAnimations() {
        this.setupServiceCardsAnimation();
        this.setupProcessStepsAnimation();
        this.setupMiniGridAnimation();
        this.setupAdditionalServicesAnimation();
        this.setupScrollAnimations();
    }

    // Animate service cards when they enter viewport
    setupServiceCardsAnimation() {
        const cards = document.querySelectorAll('.service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('pop-in');
                    }, index * 150); // Staggered animation
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Animate process steps
    setupProcessStepsAnimation() {
        const steps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-up');
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        steps.forEach(step => observer.observe(step));
    }

    // Animate mini-grid section
    setupMiniGridAnimation() {
        const miniGrid = document.querySelector('.mini-grid-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        if (miniGrid) observer.observe(miniGrid);
    }

    // Animate additional services cards
    setupAdditionalServicesAnimation() {
        const cards = document.querySelectorAll('.additional-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-in');
                    }, index * 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Setup scroll animations for headers
    setupScrollAnimations() {
        const headers = document.querySelectorAll('.overview-header, .section-header, .process-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        headers.forEach(header => observer.observe(header));
    }
}

// Initialize Services page when on strategy.html
if (window.location.pathname.includes('strategy.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new ServicesPage();
        
        // Add active class to current page in navigation
        const currentPageLink = document.querySelector('a[href*="strategy.html"]');
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    });
}

// Add animation styles
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .service-card {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.pop-in {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        .process-step {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .process-step.slide-up {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mini-grid-content {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .mini-grid-content.fade-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .additional-card {
            opacity: 0;
            transform: translateX(-100px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .additional-card:nth-child(even) {
            transform: translateX(100px);
        }
        
        .additional-card.slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .overview-header,
        .section-header,
        .process-header {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .overview-header.reveal,
        .section-header.reveal,
        .process-header.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active .nav-highlight {
            width: 100%;
        }
        
        .dropdown-link.active {
            color: var(--primary-accent);
            font-weight: 600;
        }
        
        .visual-image img {
            transition: transform 0.6s ease;
        }
        
        .visual-card:hover .visual-image img {
            transform: scale(1.05);
        }
        
        .service-card:hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});





// ============================================
// CONTACT US PAGE FUNCTIONALITY
// ============================================

class ContactUsPage extends SolarEnergyWebsite {
    constructor() {
        super();
        this.setupContactPageAnimations();
        this.initContactForm();
    }

    // Setup animations specific to Contact page
    setupContactPageAnimations() {
        this.setupContactCardsAnimation();
        this.setupFormAnimation();
        this.setupMapAnimation();
        this.setupScrollAnimations();
    }

    // Animate contact cards when they enter viewport
    setupContactCardsAnimation() {
        const cards = document.querySelectorAll('.contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('pop-in');
                    }, index * 150); // Staggered animation
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // Animate form section
    setupFormAnimation() {
        const formContainer = document.querySelector('.form-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        if (formContainer) observer.observe(formContainer);
    }

    // Animate map section
    setupMapAnimation() {
        const mapContainer = document.querySelector('.map-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        if (mapContainer) observer.observe(mapContainer);
    }

    // Initialize contact form functionality
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Set min date for date field (today)
            const dateField = document.getElementById('date');
            if (dateField) {
                const today = new Date().toISOString().split('T')[0];
                dateField.min = today;
                
                // Set default to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateField.value = tomorrow.toISOString().split('T')[0];
            }
            
            // Phone number formatting
            const phoneField = document.getElementById('phone');
            if (phoneField) {
                phoneField.addEventListener('input', this.formatPhoneNumber.bind(this));
            }
        }
    }

    // Format phone number input
    formatPhoneNumber(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join('-');
        }
        
        event.target.value = value;
    }

    // Handle form submission
    handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = {
            message: form.message.value,
            date: form.date.value,
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            location: form.location.value,
            source: form.source.value
        };
        
        // In production, replace with your EmailJS or backend API
        // For now, simulate API call
        setTimeout(() => {
            // Simulate successful submission
            this.showSuccessMessage(form);
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    // Show success message
    showSuccessMessage(form) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting MO Solar Energy. We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        // Insert before form
        form.parentNode.insertBefore(successDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const headers = document.querySelectorAll('.form-header, .map-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        headers.forEach(header => observer.observe(header));
    }
}

// Initialize Contact Us page when on contact-us.html
if (window.location.pathname.includes('contact-us.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new ContactUsPage();
        
        // Add active class to current page in navigation
        const currentPageLink = document.querySelector('a[href*="contact-us.html"]');
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    });
}

// Add animation styles
window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        .contact-card {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .contact-card.pop-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-container {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .form-container.slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .map-container {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .map-container.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-header,
        .map-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .form-header.reveal,
        .map-header.reveal {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active .nav-highlight {
            width: 100%;
        }
        
        .nav-button.active {
            background: var(--primary-accent);
            color: var(--primary-dark);
        }
        
        .success-message {
            background: rgba(76, 175, 80, 0.1);
            border: 2px solid #4CAF50;
            border-radius: var(--radius-medium);
            padding: 1.5rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            animation: slideDown 0.5s ease;
        }
        
        .success-message svg {
            width: 24px;
            height: 24px;
            fill: #4CAF50;
            flex-shrink: 0;
            margin-top: 0.25rem;
        }
        
        .success-message h4 {
            color: var(--primary-dark);
            margin-bottom: 0.5rem;
        }
        
        .success-message p {
            color: #666;
            line-height: 1.6;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .submit-button:disabled:hover {
            transform: none;
            box-shadow: none;
        }
    `;
    document.head.appendChild(style);
});