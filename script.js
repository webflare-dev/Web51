// ===== HYDRA X - Simple Working Script =====

// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('HYDRA X Loaded');
    
    // Initialize everything
    initNavigation();
    initParticles();
    initBubbles();
    initScrollEffects();
    initCounters();
});

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    if (toggle) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(particle);
    }
}

// ===== BUBBLES =====
function initBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 12 + 4;
        const left = Math.random() * 60 + 20;
        const duration = Math.random() * 4 + 3;
        
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.bottom = '10%';
        bubble.style.animationDuration = duration + 's';
        
        container.appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(function() {
            bubble.remove();
        }, duration * 1000);
    }
    
    // Create initial bubbles
    for (let i = 0; i < 10; i++) {
        setTimeout(createBubble, i * 400);
    }
    
    // Keep creating bubbles
    setInterval(createBubble, 600);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const sections = document.querySelectorAll('.feature-card, .tech-spec, .spec-card, .about-stats');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = function() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});// ============================================
// HYDRA X - Premium Water Bottle Website
// Fixed Version - Guaranteed to Load
// ============================================

(function() {
    'use strict';

    // ============================================
    // PRELOADER - Fixed with Timeout Fallback
    // ============================================
    const Preloader = {
        init() {
            const preloader = document.getElementById('preloader');
            
            const hidePreloader = () => {
                if (preloader && !preloader.classList.contains('hidden')) {
                    preloader.classList.add('hidden');
                    document.body.classList.add('loaded');
                    this.startAnimations();
                }
            };

            // Hide on window load
            if (document.readyState === 'complete') {
                setTimeout(hidePreloader, 1500);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(hidePreloader, 1500);
                });
            }

            // Fallback: Force hide after 3 seconds
            setTimeout(hidePreloader, 3000);
        },

        startAnimations() {
            HeroAnimations.start();
            setTimeout(() => {
                ParticleSystem.init();
                WaterBubbles.init();
            }, 300);
        }
    };

    // ============================================
    // HERO ANIMATIONS
    // ============================================
    const HeroAnimations = {
        start() {
            const elements = [
                { selector: '.hero-subtitle', delay: 100 },
                { selector: '.title-line:nth-child(1)', delay: 250 },
                { selector: '.title-line:nth-child(2)', delay: 400 },
                { selector: '.title-line:nth-child(3)', delay: 550 },
                { selector: '.hero-description', delay: 700 },
                { selector: '.hero-badges', delay: 850 }
            ];

            elements.forEach(({ selector, delay }) => {
                setTimeout(() => {
                    const el = document.querySelector(selector);
                    if (el) el.classList.add('animate');
                }, delay);
            });
        }
    };

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const CustomCursor = {
        cursor: null,
        dot: null,
        ring: null,
        mouseX: 0,
        mouseY: 0,
        dotX: 0,
        dotY: 0,
        ringX: 0,
        ringY: 0,
        rafId: null,

        init() {
            // Only init on non-touch devices
            if ('ontouchstart' in window) return;

            this.cursor = document.getElementById('cursor');
            if (!this.cursor) return;

            this.dot = this.cursor.querySelector('.cursor-dot');
            this.ring = this.cursor.querySelector('.cursor-ring');

            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            this.addHoverListeners();
            this.animate();
        },

        animate() {
            this.dotX += (this.mouseX - this.dotX) * 0.2;
            this.dotY += (this.mouseY - this.dotY) * 0.2;
            this.ringX += (this.mouseX - this.ringX) * 0.1;
            this.ringY += (this.mouseY - this.ringY) * 0.1;

            if (this.dot) {
                this.dot.style.left = `${this.dotX}px`;
                this.dot.style.top = `${this.dotY}px`;
            }
            if (this.ring) {
                this.ring.style.left = `${this.ringX}px`;
                this.ring.style.top = `${this.ringY}px`;
            }

            this.rafId = requestAnimationFrame(() => this.animate());
        },

        addHoverListeners() {
            const hoverElements = document.querySelectorAll('a, button, .nav-cta, .feature-card, .badge, .social-link, .spec-card');
            
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (this.cursor) this.cursor.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    if (this.cursor) this.cursor.classList.remove('hover');
                });
            });
        }
    };

    // ============================================
    // NAVIGATION
    // ============================================
    const Navigation = {
        init() {
            const nav = document.getElementById('nav');
            const toggle = document.getElementById('navToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');
            const navLinks = document.querySelectorAll('.nav-link');

            // Scroll effect
            window.addEventListener('scroll', () => {
                if (nav) {
                    nav.classList.toggle('scrolled', window.pageYOffset > 50);
                }

                // Hide scroll indicator
                const scrollIndicator = document.getElementById('scrollIndicator');
                if (scrollIndicator) {
                    scrollIndicator.classList.toggle('hidden', window.pageYOffset > 100);
                }
            });

            // Mobile toggle
            if (toggle && mobileMenu) {
                toggle.addEventListener('click', () => {
                    toggle.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
                });
            }

            // Mobile links close menu
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (toggle) toggle.classList.remove('active');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Smooth scroll for nav links
            [...navLinks, ...mobileLinks].forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        const offset = target.offsetTop - 80;
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    }

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    document.querySelector(`.nav-link[href="${targetId}"]`)?.classList.add('active');
                });
            });
        }
    };

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    const ParticleSystem = {
        init() {
            const container = document.getElementById('particles');
            if (!container) return;

            const count = window.innerWidth < 768 ? 20 : 40;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 2 + 1;
                particle.style.cssText = `
                    left: ${Math.random() * 100}%;
                    width: ${size}px;
                    height: ${size}px;
                    animation-delay: ${Math.random() * 12}s;
                    animation-duration: ${Math.random() * 8 + 8}s;
                `;

                container.appendChild(particle);
            }
        }
    };

    // ============================================
    // WATER BUBBLES
    // ============================================
    const WaterBubbles = {
        container: null,
        maxBubbles: 15,

        init() {
            this.container = document.getElementById('bubbles');
            if (!this.container) return;

            // Create initial bubbles
            for (let i = 0; i < this.maxBubbles; i++) {
                setTimeout(() => this.createBubble(), i * 300);
            }
        },

        createBubble() {
            if (!this.container) return;

            const bubble = document.createElement('div');
            bubble.className = 'bubble';

            const size = Math.random() * 12 + 4;
            const left = Math.random() * 70 + 15;
            const duration = Math.random() * 5 + 4;

            bubble.style.cssText = `
                left: ${left}%;
                bottom: 10%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
            `;

            this.container.appendChild(bubble);

            // Remove and recreate
            setTimeout(() => {
                bubble.remove();
                this.createBubble();
            }, duration * 1000);
        }
    };

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const ScrollAnimations = {
        init() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            // Elements to observe
            const selectors = [
                '.section-tag',
                '.section-title',
                '.feature-card',
                '.spec-item',
                '.spec-card',
                '.about-desc',
                '.about-stats',
                '.tech-desc'
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    observer.observe(el);
                });
            });
        }
    };

    // ============================================
    // BOTTLE EFFECTS
    // ============================================
    const BottleEffects = {
        wrapper: null,
        shine: null,

        init() {
            this.wrapper = document.getElementById('bottleWrapper');
            this.shine = document.getElementById('bottleShine');

            if (!this.wrapper) return;

            // Parallax on scroll
            window.addEventListener('scroll', () => {
                const heroBottle = document.getElementById('heroBottle');
                if (heroBottle) {
                    const rate = window.pageYOffset * 0.2;
                    heroBottle.style.transform = `translateY(${rate}px)`;
                }
            });

            // 3D tilt on mouse move (desktop only)
            if (!('ontouchstart' in window)) {
                document.addEventListener('mousemove', (e) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;

                    const xPos = (clientX / innerWidth - 0.5) * 15;
                    const yPos = (clientY / innerHeight - 0.5) * 15;

                    this.wrapper.style.transform = `
                        perspective(1000px)
                        rotateY(${xPos}deg)
                        rotateX(${-yPos}deg)
                    `;
                });
            }

            // Shine effect on hover
            this.wrapper.addEventListener('mouseenter', () => {
                if (this.shine) this.shine.style.left = '140%';
            });

            this.wrapper.addEventListener('mouseleave', () => {
                if (this.shine) {
                    setTimeout(() => {
                        this.shine.style.transition = 'none';
                        this.shine.style.left = '-100%';
                        setTimeout(() => {
                            this.shine.style.transition = 'left 0.7s ease';
                        }, 50);
                    }, 700);
                }
            });
        }
    };

    // ============================================
    // TILT EFFECT FOR CARDS
    // ============================================
    const TiltEffect = {
        init() {
            if ('ontouchstart' in window) return;

            const cards = document.querySelectorAll('[data-tilt]');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;

                    card.style.transform = `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                    `;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }
    };

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const CounterAnimation = {
        init() {
            const counters = document.querySelectorAll('[data-count]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        animate(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target;
                }
            };

            update();
        }
    };

    // ============================================
    // INITIALIZE ALL
    // ============================================
    function init() {
        Preloader.init();
        Navigation.init();
        CustomCursor.init();
        ScrollAnimations.init();
        BottleEffects.init();
        TiltEffect.init();
        CounterAnimation.init();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();