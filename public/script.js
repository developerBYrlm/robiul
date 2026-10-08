document.addEventListener('DOMContentLoaded', () => {

    // ==================== 0. DAY / NIGHT THEME ====================
    const themeToggle = document.getElementById('theme-toggle');
    const themeRoot = document.documentElement;
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light') {
        themeRoot.classList.add('light-theme');
    }

    function updateThemeToggle() {
        const isLightMode = themeRoot.classList.contains('light-theme');
        if (!themeToggle) return;

        themeToggle.innerHTML = isLightMode
            ? '<i class="fas fa-moon"></i><span class="theme-toggle-label">Night</span>'
            : '<i class="fas fa-sun"></i><span class="theme-toggle-label">Day</span>';
        themeToggle.title = isLightMode ? 'Switch to night mode' : 'Switch to day mode';
        themeToggle.setAttribute('aria-label', themeToggle.title);
    }

    updateThemeToggle();
    themeToggle?.addEventListener('click', () => {
        const isLightMode = themeRoot.classList.toggle('light-theme');
        localStorage.setItem('portfolio-theme', isLightMode ? 'light' : 'dark');
        updateThemeToggle();
    });

    // ==================== 1. MOBILE NAVIGATION ====================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-toggle') || document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        highlightActiveLink();
        handleBackToTop();
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    function highlightActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // ==================== 2. SMOOTH SCROLLING ====================
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                if (!targetId) return;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // ==================== 3. TYPING EFFECT ====================
    const typingElement = document.querySelector('.typing-text') || document.querySelector('#typing-text');
    if (typingElement) {
        const words = [
            "Full-Stack Developer",
            "AI Automation Specialist",
            "Agentic AI Enthusiast",
            "Generative AI Builder",
            "End-to-End Solution Builder"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }
            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 1000);
    }

    // ==================== 4. SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible', 'animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    animateElements.forEach(el => scrollObserver.observe(el));

    // ==================== 5. COUNTER ANIMATION ====================
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    if (isNaN(target)) return;
                    const duration = 2000;
                    const fps = 60;
                    const increment = target / (duration / (1000 / fps));
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    updateCounter();
                });
                hasCounted = true;
            }
        });
    }, { threshold: 0.5 });
    if (stats.length > 0) {
        const parent = stats[0].closest('.stats-grid') || stats[0].closest('section');
        if (parent) statsObserver.observe(parent);
    }

    // ==================== 6. BACK TO TOP ====================
    const backToTopBtn = document.querySelector('.back-to-top') || document.querySelector('#back-to-top');
    function handleBackToTop() {
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== 7. CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');
    const WHATSAPP_RECIPIENT = '8801601501432';
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                const formData = Object.fromEntries(new FormData(contactForm));
                const whatsappText = [
                    'New Portfolio Contact',
                    '',
                    `Name: ${formData.name}`,
                    `Email: ${formData.email}`,
                    `WhatsApp: ${formData.phone}`,
                    `Subject: ${formData.subject || 'General Inquiry'}`,
                    '',
                    'Message:',
                    formData.message
                ].join('\n');
                const whatsappUrl = `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(whatsappText)}`;

                // Open immediately from the user's click so popup blockers are less likely to interfere.
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

                const btn = contactForm.querySelector('.submit-btn') || contactForm.querySelector('button[type="submit"]');
                let originalText = '';
                if (btn) {
                    originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    btn.disabled = true;
                }
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    const result = await response.json();
                    if (!response.ok || !result.success) {
                        throw new Error(result.message || 'Unable to send your message.');
                    }

                    contactForm.reset();
                    if (btn) {
                        btn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Opened!';
                        btn.classList.add('success');
                    }
                    let successMsg = document.querySelector('.form-success-message');
                    if (!successMsg) {
                        successMsg = document.createElement('div');
                        successMsg.className = 'form-success-message';
                        successMsg.textContent = '✨ WhatsApp opened with your message ready. Please press Send to deliver it.';
                        contactForm.appendChild(successMsg);
                    }
                    successMsg.style.opacity = '1';
                    successMsg.style.display = 'block';
                    setTimeout(() => {
                        if (btn) {
                            btn.innerHTML = originalText;
                            btn.classList.remove('success');
                            btn.disabled = false;
                        }
                        if (successMsg) {
                            successMsg.style.opacity = '0';
                            setTimeout(() => successMsg.style.display = 'none', 500);
                        }
                    }, 5000);
                } catch (error) {
                    if (btn) {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                    let errorMsg = contactForm.querySelector('.form-error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'form-error-message';
                        contactForm.appendChild(errorMsg);
                    }
                    errorMsg.textContent = `WhatsApp opened, but the message could not be saved locally. ${error.message || 'Please press Send in WhatsApp anyway.'}`;
                    errorMsg.style.display = 'block';
                }
            }
        });
    }

    // ==================== 8. PARTICLE BACKGROUND ====================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
        let animationId;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
            particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
        }
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 120;
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            animationId = requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ==================== 9. DYNAMIC YEAR ====================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==================== 10. PAGE LOAD ANIMATIONS ====================
    setTimeout(() => {
        document.body.classList.add('loaded');
        const heroElements = document.querySelectorAll('.hero-animate');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 200);

    // ==================== 11. TILT EFFECT ON CARDS ====================
    if (window.matchMedia("(hover: hover)").matches) {
        const tiltCards = document.querySelectorAll('.service-card, .skill-card, .explore-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
});
