// Firebase via CDN compat (loaded in index.html as regular scripts)
// Analytics is initialized via the compat SDK — no imports needed here

// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme: apply saved preference early (default to system dark)
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) document.documentElement.classList.add('dark');
        }
    } catch (_) {}

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-category');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Contact form handling — EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name    = this.querySelector('input[name="from_name"]').value.trim();
            const email   = this.querySelector('input[name="reply_to"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            console.log('[ContactForm] Submit triggered');
            console.log('[ContactForm] Fields:', { name, email, messageLength: message.length });

            if (!name || !email || !message) {
                console.warn('[ContactForm] Validation failed — missing fields');
                alert('Please fill in all fields.');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            console.log('[EmailJS] Calling sendForm...');

            emailjs.sendForm('service_dz8v4qb', 'template_s49d2gp', this)
                .then((response) => {
                    console.log('[EmailJS] ✅ Email sent successfully!', response.status, response.text);
                    submitBtn.textContent = 'Sent ✓';
                    submitBtn.style.background = 'linear-gradient(45deg, #11998e, #38ef7d)';
                    this.reset();
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                })
                .catch((err) => {
                    console.error('[EmailJS] ❌ Send failed');
                    console.error('[EmailJS] Status:', err.status);
                    console.error('[EmailJS] Response:', err.text);
                    alert('Something went wrong. Please try again or email me directly at avnishy84@gmail.com');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                });
        });
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add scroll-to-top functionality
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

    document.body.appendChild(scrollToTopButton);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll to top button
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        // Close on link click (mobile)
        navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            if (navList.classList.contains('open')) {
                navList.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }));
    }

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            const willBeDark = !root.classList.contains('dark');
            root.classList.toggle('dark');
            try { localStorage.setItem('theme', willBeDark ? 'dark' : 'light'); } catch (_) {}
            themeToggle.textContent = willBeDark ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', willBeDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
        // Set initial icon
        themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
    }
    
    .scroll-to-top:hover {
        transform: scale(1.1) !important;
    }
`;
document.head.appendChild(style);