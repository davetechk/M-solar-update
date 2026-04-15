// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('[data-nav-links]');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu when clicking a link (mobile)
  links.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

// Improved Accordion with smooth animation
const acc = document.querySelector('[data-accordion]');
if (acc) {
  const items = Array.from(acc.querySelectorAll('.acc__item'));
  
  items.forEach(btn => {
    const panel = btn.nextElementSibling;
    
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('is-open');
      
      // Close all other panels
      items.forEach(otherBtn => {
        if (otherBtn !== btn && otherBtn.classList.contains('is-open')) {
          otherBtn.classList.remove('is-open');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.classList.remove('is-open');
        }
      });
      
      // Toggle current
      if (!isOpen) {
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      } else {
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      }
    });
  });
}

// Stat counting animation
function animateStatCounter(statElement) {
  const value = parseFloat(statElement.dataset.value);
  const suffix = statElement.dataset.suffix || '';
  const duration = 1500; // 1.5 seconds
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = startValue + (value - startValue) * easeOutQuart;
    
    // Format the number
    let displayValue;
    if (value % 1 !== 0) {
      // Decimal number
      displayValue = currentValue.toFixed(1);
    } else {
      // Whole number
      displayValue = Math.floor(currentValue).toLocaleString();
    }
    
    statElement.querySelector('.stat__value').textContent = displayValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Staggered reveal for card grids
function initStaggeredReveal(gridElement, delay = 150) {
  const items = Array.from(gridElement.querySelectorAll('[data-stagger-item]'));
  
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * delay}ms`;
  });
  
  // Observe the grid container
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach(item => {
          item.classList.add('is-in');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(gridElement);
}

// Main reveal animations with IntersectionObserver
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // Section reveal
  const sectionReveals = document.querySelectorAll('.reveal');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        sectionObserver.unobserve(entry.target);
        
        // If this is the stats section, animate stats
        if (entry.target.closest('#stats')) {
          setTimeout(() => {
            const stats = document.querySelectorAll('[data-stat]');
            stats.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.add('is-in');
                animateStatCounter(stat);
              }, index * 200);
            });
          }, 300);
        }
      }
    });
  }, { 
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  sectionReveals.forEach(el => sectionObserver.observe(el));
  
  // Staggered grid reveals
  const staggeredGrids = document.querySelectorAll('[data-stagger]');
  staggeredGrids.forEach(grid => {
    initStaggeredReveal(grid, 100);
  });
  
  // Stat reveal observer (separate for finer control)
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('[data-stat]');
        stats.forEach((stat, index) => {
          setTimeout(() => {
            stat.classList.add('is-in');
            animateStatCounter(stat);
          }, index * 200);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const statsSection = document.querySelector('#stats .stats__grid');
  if (statsSection) {
    statObserver.observe(statsSection);
  }
  
  // Hover animations
  const hoverCards = document.querySelectorAll('.feature-card, .service-card, .quote-card, .purpose-card');
  hoverCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!prefersReduced) {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 14px 34px rgba(14,27,42,.14)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (!prefersReduced) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 24px rgba(14,27,42,.08)';
      }
    });
  });
} else {
  // Reduced motion fallback
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  document.querySelectorAll('[data-stagger-item]').forEach(el => el.classList.add('is-in'));
  document.querySelectorAll('[data-stat]').forEach(el => {
    el.classList.add('is-in');
    const value = el.dataset.value;
    const suffix = el.dataset.suffix || '';
    const displayValue = value % 1 !== 0 ? parseFloat(value).toFixed(1) : parseInt(value).toLocaleString();
    el.querySelector('.stat__value').textContent = displayValue + suffix;
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    }
  });
});





// =========== ABOUT US JS ==========

// ============================
// ABOUT PAGE: reveal + countup
// ============================

(function initAboutPage() {
  const aboutRoot = document.querySelector('.about-page');
  if (!aboutRoot) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  const revealEls = aboutRoot.querySelectorAll('.about-reveal');
  if (!prefersReduced && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  // Count-up (Our Impact)
  const impactSection = document.querySelector('#aboutImpact');
  if (!impactSection) return;

  const counters = impactSection.querySelectorAll('[data-countup]');
  if (!counters.length) return;

  const parseTarget = (el) => {
    const raw = String(el.getAttribute('data-countup') || '0').trim();
    const suffix = String(el.getAttribute('data-suffix') || '');
    const target = Number(raw.replace(/,/g, ''));
    const hasDecimal = raw.includes('.');
    return { target, suffix, hasDecimal };
  };

  const formatValue = (value, hasDecimal, suffix) => {
    // keep 1 decimal if target had decimals, else integer
    const out = hasDecimal ? value.toFixed(1) : Math.round(value).toString();
    return `${out}${suffix}`;
  };

  const animateCounter = (el, durationMs = 1500) => {
    const { target, suffix, hasDecimal } = parseTarget(el);
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const current = start + (target - start) * eased;

      el.textContent = formatValue(current, hasDecimal, suffix);

      if (t < 1) requestAnimationFrame(step);
      else el.textContent = formatValue(target, hasDecimal, suffix);
    };

    requestAnimationFrame(step);
  };

  if (prefersReduced) {
    // no animation, just set final values
    counters.forEach((el) => {
      const { target, suffix, hasDecimal } = parseTarget(el);
      el.textContent = formatValue(target, hasDecimal, suffix);
    });
    return;
  }

  let started = false;
  const ioCount = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !started) {
        started = true;
        counters.forEach((el, idx) => {
          // slight stagger
          setTimeout(() => animateCounter(el, 1400), idx * 90);
        });
        ioCount.disconnect();
      }
    });
  }, { threshold: 0.25 });

  ioCount.observe(impactSection);
})(); 





// ServicesX carousel: auto-play + clickable cards + drag + wheel support
(function initServicesXCarousel() {
  const track = document.getElementById('services-track');
  if (!track) return;

  const cards = track.querySelectorAll('.servicesX__card');
  let autoScrollInterval;
  const scrollSpeed = 3000; // Change slide every 3 seconds
  let isDragging = false;
  let userInteracted = false;

  // ===== AUTO-PLAY FUNCTIONALITY =====
  function startAutoScroll() {
    if (userInteracted) return; // Don't auto-scroll if user interacted
    
    stopAutoScroll(); // Clear existing interval
    
    autoScrollInterval = setInterval(() => {
      if (isDragging || userInteracted) return;
      
      const maxScroll = track.scrollWidth - track.clientWidth;
      const currentScroll = track.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth + 20 || 300; // Card width + gap
      
      // If at the end, scroll back to start
      if (currentScroll >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll to next card
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, scrollSpeed);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // ===== CLICKABLE CARDS =====
  cards.forEach(card => {
    // Get the link from data attribute or arrow href
    const arrowLink = card.querySelector('.servicesX__go');
    const cardLink = card.dataset.cardLink || arrowLink?.getAttribute('href') || '#';
    
    // Make entire card clickable
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking the arrow itself (arrow has its own handler)
      if (e.target.closest('.servicesX__go')) return;
      
      // Don't trigger while dragging
      if (isDragging) return;
      
      // Navigate to the link
      window.location.href = cardLink;
    });
    
    // Add keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (e.target.closest('.servicesX__go')) return;
        window.location.href = cardLink;
      }
    });
    
    // Make card focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  });

  // ===== DRAG TO SCROLL =====
  let startX, startLeft, pointerId;

  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    userInteracted = true; // Stop auto-scroll on user interaction
    stopAutoScroll();
    
    track.setPointerCapture(e.pointerId);
    pointerId = e.pointerId;
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;
    e.preventDefault(); // Prevent selection while dragging
    
    const dx = e.clientX - startX;
    track.scrollLeft = startLeft - dx;
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    track.style.cursor = 'grab';
    
    // Restart auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, 5000);
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // ===== WHEEL TO HORIZONTAL SCROLL =====
  track.addEventListener('wheel', (e) => {
    // If user is trying to scroll vertically, convert to horizontal
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
      
      // User interacted, pause auto-scroll temporarily
      userInteracted = true;
      stopAutoScroll();
      
      // Restart after 5 seconds
      setTimeout(() => {
        userInteracted = false;
        startAutoScroll();
      }, 5000);
    }
  }, { passive: false });

  // ===== PAUSE ON HOVER =====
  track.addEventListener('mouseenter', () => {
    stopAutoScroll();
  });

  track.addEventListener('mouseleave', () => {
    if (!userInteracted) {
      startAutoScroll();
    }
  });

  // ===== RESET ON WINDOW RESIZE =====
  let resizeTimeout;
  window.addEventListener('resize', () => {
    stopAutoScroll();
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!userInteracted) {
        startAutoScroll();
      }
    }, 200);
  });

  // ===== INITIAL START =====
  // Start auto-scroll after a short delay
  setTimeout(() => {
    track.style.cursor = 'grab';
    startAutoScroll();
  }, 1000);

  // ===== TOUCH DEVICE SUPPORT =====
  track.addEventListener('touchstart', () => {
    userInteracted = true;
    stopAutoScroll();
  }, { passive: true });

  track.addEventListener('touchend', () => {
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, 5000);
  });
})();




// =========================================
// ProjectsX carousel: autoplay (2.5s) + drag + wheel -> horizontal
// =========================================
(function initProjectsXCarousel(){
  const track = document.querySelector('[data-projectsx-track]');
  if (!track) return;

  // ---- wheel -> horizontal
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // ---- drag to scroll
  let isDown = false;
  let startX = 0;
  let startLeft = 0;
  let userInteracting = false;
  let interactTimeout = null;

  const markInteracting = () => {
    userInteracting = true;
    clearTimeout(interactTimeout);
    interactTimeout = setTimeout(() => userInteracting = false, 1400);
  };

  track.addEventListener('pointerdown', (e) => {
    isDown = true;
    markInteracting();
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    markInteracting();
    const dx = e.clientX - startX;
    track.scrollLeft = startLeft - dx;
  });

  const endDrag = () => {
    isDown = false;
    track.classList.remove('is-dragging');
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Pause when hovering
  track.addEventListener('mouseenter', markInteracting);

  // ---- autoplay every 2.5s
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const getCardWidth = () => {
    const card = track.querySelector('.projectsX__card');
    if (!card) return 360;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '18') || 18;
    return card.getBoundingClientRect().width + gap;
  };

  const scrollNext = () => {
    if (userInteracting) return;

    const step = getCardWidth();
    const maxScroll = track.scrollWidth - track.clientWidth;

    // If near the end, go back to start smoothly
    if (track.scrollLeft + step >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: step, behavior: 'smooth' });
  };

  setInterval(scrollNext, 2500);
})();





/**
 * MO Solar Energy - Main JavaScript
 * Handles all animations: scroll reveals, stagger effects, and carousels
 */

(function() {
  'use strict';

  // ==================== ANIMATION CONFIGURATION ====================
  const animationConfig = {
    threshold: 0.2,           // Element becomes visible when 20% in view
    rootMargin: '0px 0px -50px 0px',  // Slight offset for better UX
    staggerDelay: 0.1,         // 100ms between staggered items
    defaultDuration: 0.6,       // 600ms animation
    mobileThreshold: 768        // Mobile breakpoint
  };

  // ==================== INITIALIZATION ====================
  function initAnimations() {
    // Set initial states for animated elements
    prepareAnimatedElements();
    
    // Create intersection observer for scroll animations
    const observer = createScrollObserver();
    
    // Observe all sections and animated elements
    observeElements(observer);
    
    // Handle any elements that should animate on page load
    handleInitialAnimations();
  }

  // ==================== PREPARE ELEMENTS ====================
  function prepareAnimatedElements() {
    // Elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      // Don't override if already prepared
      if (!el.classList.contains('anim-ready')) {
        el.classList.add('anim-ready');
        el.style.opacity = '0';
        el.style.transition = `opacity ${animationConfig.defaultDuration}s ease, transform ${animationConfig.defaultDuration}s ease`;
        
        // Set initial transform based on animation type
        const animType = el.dataset.animate;
        setInitialTransform(el, animType);
      }
    });

    // Elements with data-stagger (parent containers)
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const items = container.querySelectorAll('[data-stagger-item]');
      items.forEach((item, index) => {
        if (!item.classList.contains('anim-ready')) {
          item.classList.add('anim-ready');
          item.style.opacity = '0';
          item.style.transition = `opacity ${animationConfig.defaultDuration}s ease, transform ${animationConfig.defaultDuration}s ease`;
          item.style.transform = 'translateY(30px)';
          
          // Store original delay if specified, otherwise use staggered default
          const baseDelay = parseFloat(item.dataset.delay) || 0;
          const staggerIndex = index * animationConfig.staggerDelay;
          item.dataset.totalDelay = (baseDelay + staggerIndex).toFixed(1);
        }
      });
    });

    // Sections with data-section
    document.querySelectorAll('[data-section]').forEach(section => {
      if (!section.classList.contains('anim-ready')) {
        section.classList.add('anim-ready');
        section.style.opacity = '0';
        section.style.transition = `opacity ${animationConfig.defaultDuration}s ease`;
      }
    });
  }

  // Set initial transform based on animation type
  function setInitialTransform(el, animType) {
    switch(animType) {
      case 'fade-up':
      case 'fade-up-stagger':
        el.style.transform = 'translateY(40px)';
        break;
      case 'fade-down':
        el.style.transform = 'translateY(-40px)';
        break;
      case 'fade-left':
        el.style.transform = 'translateX(40px)';
        break;
      case 'fade-right':
        el.style.transform = 'translateX(-40px)';
        break;
      case 'zoom-in':
        el.style.transform = 'scale(0.95)';
        break;
      case 'zoom-out':
        el.style.transform = 'scale(1.05)';
        break;
      default:
        el.style.transform = 'translateY(30px)';
    }
  }

  // ==================== CREATE OBSERVER ====================
  function createScrollObserver() {
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Handle section animations
          if (el.hasAttribute('data-section')) {
            animateSection(el);
          }
          
          // Handle individual animated elements
          if (el.hasAttribute('data-animate')) {
            animateElement(el);
          }
          
          // Handle stagger containers
          if (el.hasAttribute('data-stagger')) {
            animateStaggerContainer(el);
          }
          
          // Stop observing after animation (optional)
          // observer.unobserve(el); // Uncomment if you want one-time animation
        }
      });
    }, {
      threshold: animationConfig.threshold,
      rootMargin: animationConfig.rootMargin
    });
  }

  // ==================== OBSERVE ELEMENTS ====================
  function observeElements(observer) {
    // Observe sections
    document.querySelectorAll('[data-section]').forEach(section => {
      observer.observe(section);
    });

    // Observe individual animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    // Observe stagger containers
    document.querySelectorAll('[data-stagger]').forEach(container => {
      observer.observe(container);
    });
  }

  // ==================== ANIMATION FUNCTIONS ====================
  function animateSection(section) {
    section.style.opacity = '1';
    section.classList.add('is-visible');
    
    // Animate children in order
    const children = section.querySelectorAll('[data-animate]');
    children.forEach((child, index) => {
      const delay = parseFloat(child.dataset.delay) || index * 0.1;
      setTimeout(() => {
        animateElement(child, true);
      }, delay * 1000);
    });
  }

  function animateElement(el, skipDelay = false) {
    if (el.classList.contains('is-visible')) return;
    
    const delay = skipDelay ? 0 : (parseFloat(el.dataset.delay) || 0);
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translate(0) scale(1)';
      el.classList.add('is-visible');
    }, delay * 1000);
  }

  function animateStaggerContainer(container) {
    if (container.classList.contains('is-visible')) return;
    
    container.classList.add('is-visible');
    
    const items = container.querySelectorAll('[data-stagger-item]');
    items.forEach(item => {
      const totalDelay = parseFloat(item.dataset.totalDelay) || 0;
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translate(0) scale(1)';
        item.classList.add('is-in');
      }, totalDelay * 1000);
    });
  }

  // ==================== INITIAL PAGE LOAD ANIMATIONS ====================
  function handleInitialAnimations() {
    // Animate elements visible on page load
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero [data-animate]');
      heroElements.forEach((el, index) => {
        const delay = parseFloat(el.dataset.delay) || index * 0.1;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate(0) scale(1)';
          el.classList.add('is-visible');
        }, delay * 1000);
      });
    }, 100);
  }

  // ==================== SERVICES CAROUSEL (from your previous code) ====================
  function initServicesCarousel() {
    const track = document.getElementById('services-track');
    if (!track) return;

    const cards = track.querySelectorAll('.servicesX__card');
    let autoScrollInterval;
    const scrollSpeed = 3000;
    let isDragging = false;
    let userInteracted = false;

    function startAutoScroll() {
      if (userInteracted) return;
      stopAutoScroll();
      
      autoScrollInterval = setInterval(() => {
        if (isDragging || userInteracted) return;
        
        const maxScroll = track.scrollWidth - track.clientWidth;
        const currentScroll = track.scrollLeft;
        const cardWidth = cards[0]?.offsetWidth + 18 || 300;
        
        if (currentScroll >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, scrollSpeed);
    }

    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }

    // Clickable cards
    cards.forEach(card => {
      const arrowLink = card.querySelector('.servicesX__go');
      const cardLink = card.dataset.cardLink || arrowLink?.getAttribute('href') || '#';
      
      card.addEventListener('click', (e) => {
        if (e.target.closest('.servicesX__go')) return;
        if (isDragging) return;
        window.location.href = cardLink;
      });
      
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
    });

    // Drag functionality
    let startX, startLeft, pointerId;

    track.addEventListener('pointerdown', (e) => {
      isDragging = true;
      userInteracted = true;
      stopAutoScroll();
      
      track.setPointerCapture(e.pointerId);
      pointerId = e.pointerId;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
      track.style.cursor = 'grabbing';
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      e.preventDefault();
      
      const dx = e.clientX - startX;
      track.scrollLeft = startLeft - dx;
    });

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      track.style.cursor = 'grab';
      
      setTimeout(() => {
        userInteracted = false;
        startAutoScroll();
      }, 5000);
    };

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // Wheel support
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
        
        userInteracted = true;
        stopAutoScroll();
        
        setTimeout(() => {
          userInteracted = false;
          startAutoScroll();
        }, 5000);
      }
    }, { passive: false });

    // Hover pause
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', () => {
      if (!userInteracted) startAutoScroll();
    });

    // Initialize
    setTimeout(() => {
      track.style.cursor = 'grab';
      startAutoScroll();
    }, 1000);
  }

  // ==================== PROJECTS CAROUSEL ====================
  function initProjectsCarousel() {
    const track = document.querySelector('[data-projectsx-track]');
    if (!track) return;

    let isDown = false;
    let startX, startLeft;

    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      track.scrollLeft = startLeft - dx;
    });

    const endDrag = () => {
      isDown = false;
      track.style.cursor = 'grab';
    };

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    track.style.cursor = 'grab';
  }

  // ==================== PARTNERS MARQUEE ====================
  function initPartnersMarquee() {
    const track = document.querySelector('.partnersX__track');
    if (!track) return;

    let animationFrame;
    let scrollPosition = 0;
    let isPaused = false;

    function marqueeScroll() {
      if (isPaused) {
        animationFrame = requestAnimationFrame(marqueeScroll);
        return;
      }

      scrollPosition += 0.5;
      track.style.transform = `translateX(-${scrollPosition}px)`;

      const firstRow = track.querySelector('.partnersX__row');
      if (firstRow && scrollPosition >= firstRow.offsetWidth) {
        scrollPosition = 0;
        track.appendChild(firstRow.cloneNode(true));
        track.removeChild(firstRow);
      }

      animationFrame = requestAnimationFrame(marqueeScroll);
    }

    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => { isPaused = false; });

    animationFrame = requestAnimationFrame(marqueeScroll);
  }

  // ==================== STATS COUNTER ====================
  function initStatsCounter() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const statElements = statsSection.querySelectorAll('[data-stat]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statElements.forEach(statEl => {
            const value = parseFloat(statEl.dataset.value);
            const suffix = statEl.dataset.suffix || '';
            const valueEl = statEl.querySelector('.stat__value');
            
            if (valueEl && !statEl.classList.contains('counted')) {
              statEl.classList.add('counted');
              animateValue(valueEl, 0, value, 2000, suffix);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  function animateValue(element, start, end, duration, suffix) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      
      if (Number.isInteger(end)) {
        element.textContent = Math.round(current) + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }
    }, 16);
  }

  // ==================== INITIALIZE ALL ====================
  function init() {
    initAnimations();
    initServicesCarousel();
    initProjectsCarousel();
    initPartnersMarquee();
    initStatsCounter();
    
    console.log('MO Solar Energy animations initialized');
  }

  // Start everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();




(function () {
  const section = document.querySelector('.ps-core-services');
  if (!section) return;

  const revealItems = section.querySelectorAll('.ps-core-services__reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
})();




(function () {
  const section = document.querySelector('.ps-hardware-loop');
  if (!section) return;

  const track = section.querySelector('[data-track]');
  const prevBtn = section.querySelector('.ps-hardware-loop__arrow--prev');
  const nextBtn = section.querySelector('.ps-hardware-loop__arrow--next');
  const tabs = Array.from(section.querySelectorAll('.ps-hardware-loop__tab'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const originalCards = Array.from(track.querySelectorAll('.ps-hardware-loop__card')).map((card) =>
    card.cloneNode(true)
  );

  let currentFilter = 'solar';
  let animationId = null;
  let offset = 0;
  let speed = 0.75; // continuous speed
  let paused = false;

  function getGap() {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.gap || styles.columnGap || 18);
  }

  function buildTrack(filter) {
    track.innerHTML = '';

    const filtered = originalCards.filter((card) => card.dataset.category === filter);

    if (!filtered.length) return;

    // duplicate enough for seamless continuous loop
    const firstSet = filtered.map((card) => card.cloneNode(true));
    const secondSet = filtered.map((card) => card.cloneNode(true));
    const thirdSet = filtered.map((card) => card.cloneNode(true));

    [...firstSet, ...secondSet, ...thirdSet].forEach((card) => track.appendChild(card));

    offset = 0;
    track.style.transform = 'translate3d(0,0,0)';
  }

  function getSetWidth() {
    const cards = Array.from(track.querySelectorAll('.ps-hardware-loop__card'));
    if (!cards.length) return 0;

    const visiblePerSet = cards.length / 3;
    const gap = getGap();

    let width = 0;
    for (let i = 0; i < visiblePerSet; i++) {
      width += cards[i].getBoundingClientRect().width;
      if (i < visiblePerSet - 1) width += gap;
    }
    return width;
  }

  function loop() {
    if (!paused && !reduceMotion) {
      offset += speed;
      const setWidth = getSetWidth();

      if (setWidth > 0 && offset >= setWidth) {
        offset = 0;
      }

      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }

    animationId = requestAnimationFrame(loop);
  }

  function startLoop() {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    cancelAnimationFrame(animationId);
  }

  function setActiveTab(filter) {
    tabs.forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.filter === filter);
    });
  }

  function applyFilter(filter) {
    currentFilter = filter;
    setActiveTab(filter);
    buildTrack(filter);

    if (!reduceMotion) {
      startLoop();
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      applyFilter(tab.dataset.filter);
    });
  });

  section.addEventListener('mouseenter', () => {
    paused = true;
  });

  section.addEventListener('mouseleave', () => {
    paused = false;
  });

  section.addEventListener('focusin', () => {
    paused = true;
  });

  section.addEventListener('focusout', () => {
    paused = false;
  });

  prevBtn?.addEventListener('click', () => {
    offset = Math.max(0, offset - 180);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  });

  nextBtn?.addEventListener('click', () => {
    offset += 180;
    const setWidth = getSetWidth();
    if (setWidth > 0 && offset >= setWidth) offset = 0;
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  });

  window.addEventListener('resize', () => {
    buildTrack(currentFilter);
  });

  applyFilter(currentFilter);
})();




/* optional future JS */

document.querySelectorAll('.ms-blog-card').forEach(card=>{
card.addEventListener('mouseenter',()=>{
card.style.boxShadow='0 20px 40px rgba(0,0,0,.08)';
});
card.addEventListener('mouseleave',()=>{
card.style.boxShadow='';
});
});