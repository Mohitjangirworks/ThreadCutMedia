 // Header scroll effect (runs independently)
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
        });

        // All other scripts run after the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function () {

            // --- Mobile Navigation Toggle ---
            const primaryNav = document.querySelector('#primary-navigation');
            const navToggle = document.querySelector('.mobile-nav-toggle');

            navToggle.addEventListener('click', () => {
                const isVisible = primaryNav.getAttribute('data-visible') === 'true';

                if (isVisible) {
                    primaryNav.setAttribute('data-visible', 'false');
                    navToggle.setAttribute('aria-expanded', 'false');
                } else {
                    primaryNav.setAttribute('data-visible', 'true');
                    navToggle.setAttribute('aria-expanded', 'true');
                }
            });

            // --- Smooth scrolling for anchor links ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    // Close mobile menu on link click
                    if (primaryNav.getAttribute('data-visible') === 'true') {
                        primaryNav.setAttribute('data-visible', 'false');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }

                    const targetId = this.getAttribute('href');
                    if (targetId.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(targetId);

                        if (target) {
                            const headerOffset = 80;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // --- Unified Scroll Animation ---
            const animatedElements = document.querySelectorAll('[data-animate]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            animatedElements.forEach(element => {
                observer.observe(element);
            });

        });