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
        this.setupIntersectionObserver();
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
        
        // Back to top
        topBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                topBtn.style.opacity = '1';
                topBtn.style.pointerEvents = 'auto';
            } else {
                topBtn.style.opacity = '0';
                topBtn.style.pointerEvents = 'none';
            }
        });

        // Initial state
        topBtn.style.opacity = '0';
        topBtn.style.pointerEvents = 'none';
        
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
        
        // Simulate API call
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

    // Intersection observer for animations
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with animation classes
        document.querySelectorAll('.service-card, .solution-card, .stat-card, .project-card').forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    }

    // Hero animation
    setupHeroAnimation() {
        const hero = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');
        
        if (!hero || !heroTitle) return;
        
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });

        // Title letter animation
        const titleText = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        titleText.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.animationDelay = `${i * 0.05}s`;
            heroTitle.appendChild(span);
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
    `;
    document.head.appendChild(style);
});