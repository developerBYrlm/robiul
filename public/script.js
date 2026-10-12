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
    const navClose = document.getElementById('nav-close');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        const closeNavMenu = () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        };

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navClose?.addEventListener('click', closeNavMenu);

        links.forEach(link => {
            link.addEventListener('click', () => {
                closeNavMenu();
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

    // ==================== 8. INTERACTIVE CLI TERMINAL ====================
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalChips = document.querySelectorAll('.term-chip');

    if (terminalBody && terminalInput) {
        // These responses intentionally live only in memory. Nothing is saved to a database.
        // Each command has its own cursor, so repeated commands rotate through their own list.
        const terminalResponses = {
            help: [
                'Available commands: whoami, skills, projects, contact, university, clear',
                'Try a profile command: whoami, skills, projects, contact, university',
                'Portfolio CLI ready. Use the quick commands above or type a command below.',
                'Need a tour? Start with whoami, then explore skills and projects.',
                'Command index loaded: profile, stack, work, contact, education, clear.',
                'Tip: click any quick command to run it instantly in the terminal.',
                'You can type commands manually too. Press Enter to execute one.',
                'Available modules: identity, engineering skills, project work, contact, education.',
                'All responses are generated from JavaScript arrays stored in this page session.',
                'Interactive mode online. Pick a command and keep exploring the portfolio.'
            ],
            whoami: [
                'Md. Robiul Islam — Full-Stack Developer & AI Automation Specialist.',
                'Identity: Robiul Islam | Builder of full-stack systems and AI workflows.',
                'Role detected: Full-Stack Engineer with a focus on AI automation.',
                'Hello! I am Md. Robiul Islam, a developer who connects frontend, backend, and data.',
                'Profile loaded: software engineer, systems thinker, and continuous learner.'
            ],
            skills: [
                'Core stack: JavaScript, Python, C++, C, SQL.',
                'Frontend: HTML5, CSS3, responsive UI, React.js, React Native.',
                'Backend: Node.js, Express.js, REST APIs, GraphQL, FastAPI, Flask, Django.',
                'Data & AI: MongoDB, PostgreSQL, MySQL, NumPy, Pandas, scikit-learn, LangChain.',
                'Tooling: Git, GitHub, VS Code, Postman, Docker basics, and Linux.'
            ],
            projects: [
                'Aegis AI — Autonomous Multi-Agent Workflow Orchestrator.',
                'NexusMart — Scalable MERN e-commerce and inventory management system.',
                'OmniVision — Python and scikit-learn data analytics intelligence suite.',
                'DevPulse — High-throughput microservices API gateway with JWT authentication.',
                'Project catalog ready: AI automation, MERN systems, analytics, and API engineering.'
            ],
            contact: [
                'Email: robiulislam31122002@gmail.com',
                'Best way to reach me: send an email or use the contact form below.',
                'Open to opportunities, collaborations, and high-impact engineering projects.',
                'Contact channel online: robiulislam31122002@gmail.com | Dhaka, Bangladesh.',
                'Ready to discuss a product, automation workflow, or full-stack build.'
            ],
            university: [
                'Northern University Bangladesh — Computer Science & Engineering.',
                'Education: Computer Science & Engineering at Northern University Bangladesh.',
                'Academic focus: algorithms, software design, databases, and distributed systems.',
                'University profile loaded: Northern University Bangladesh.',
                'CSE background active — combining strong fundamentals with practical systems work.'
            ]
        };

        // Replace the first draft responses with more natural, AI-style replies.
        // This is still session-only data: no response is written to a database.
        Object.assign(terminalResponses, {
            help: [
                "I can guide you through Robiul's profile. Try whoami, skills, projects, contact, or university.",
                "Command map ready: identity, technical stack, project work, contact details, and education.",
                "Let's explore the portfolio. Start with whoami for context, then use skills or projects.",
                "You can ask this terminal about the developer, his tools, his work, or how to get in touch.",
                "I understand these commands: whoami, skills, projects, contact, university, and clear.",
                "Profile navigation is active. Choose a quick command above or type one manually below.",
                "For a technical overview, run skills. For proof of work, run projects. I'll summarize each area.",
                "Need a human connection? Use contact. Want the academic context? Use university.",
                "This assistant answers from the portfolio data available in the current page session.",
                "How can I help? I can introduce Robiul, explain his stack, highlight projects, or share contact details."
            ],
            whoami: [
                "Profile analysis complete: Md. Robiul Islam is a Full-Stack Developer and AI Automation Specialist.",
                "Robiul builds complete systems, connecting polished interfaces with secure backends and useful data flows.",
                "The profile points to a systems-minded engineer who enjoys turning complex requirements into practical products.",
                "Identity confirmed: a CSE student and developer focused on full-stack engineering, AI workflows, and automation.",
                "Robiul's development style is architecture-first: understand the problem, design the system, then ship the experience.",
                "You are looking at a developer who works across frontend, backend, databases, APIs, and intelligent automation.",
                "Professional focus detected: scalable web applications, autonomous AI workflows, and reliable backend systems.",
                "In simple terms, Robiul likes building the whole solution rather than stopping at a single layer of the stack.",
                "The portfolio describes a continuous learner who combines strong computer-science fundamentals with hands-on projects.",
                "If you need someone who can connect product ideas to working software, Robiul's profile is built around that strength."
            ],
            skills: [
                "Stack analysis complete: JavaScript and Python lead the development workflow, supported by C++, C, and SQL.",
                "For interfaces, the toolkit includes semantic HTML, modern CSS, responsive design, React.js, and React Native.",
                "For backend work, Robiul uses Node.js, Express, REST APIs, GraphQL, FastAPI, Flask, and Django.",
                "The data layer includes MongoDB, PostgreSQL, MySQL, Supabase, Firebase, and practical SQL experience.",
                "AI capability detected: automation, agentic workflows, generative AI APIs, LangChain, and tool calling.",
                "Data work is supported by NumPy, Pandas, scikit-learn, predictive modeling, and analytics pipelines.",
                "The engineering toolkit also includes Git, GitHub, VS Code, Postman, npm, Docker basics, and Linux.",
                "A useful way to summarize the stack: modern UI plus dependable APIs, data storage, automation, and AI.",
                "The strongest pattern is breadth with connection: frontend, backend, databases, and intelligent workflows working together.",
                "Want to see the skills in context? Run projects next and I'll connect the tools to real product ideas."
            ],
            projects: [
                "Project scan complete: Aegis AI is an autonomous multi-agent workflow orchestrator for connected business tasks.",
                "NexusMart demonstrates MERN engineering through e-commerce, inventory management, authentication, and analytics.",
                "OmniVision applies Python, Pandas, NumPy, and scikit-learn to data processing, prediction, and intelligence dashboards.",
                "DevPulse focuses on backend architecture: API gateway design, JWT authentication, Redis sessions, and rate limiting.",
                "Across the projects, the repeated theme is clear: automate useful work while keeping the system structured and reliable.",
                "Aegis AI represents the AI direction; NexusMart represents scalable product engineering; OmniVision represents data intelligence.",
                "The portfolio is not limited to demos. Each project is described around architecture, measurable behavior, and real use cases.",
                "If you are evaluating range, the catalog covers AI automation, MERN applications, machine learning, and microservices.",
                "The project portfolio suggests a builder who cares about both user experience and the systems operating behind it.",
                "Recommendation: start with Aegis AI for the AI vision, then inspect DevPulse for the backend and architecture mindset."
            ],
            contact: [
                "Contact route identified: email robiulislam31122002@gmail.com for a direct conversation.",
                "If you have a project idea, share the problem, the desired outcome, and the current stage. Robiul can take it from there.",
                "Robiul is open to opportunities, collaborations, and high-impact projects where thoughtful engineering matters.",
                "The fastest connection is email. You can also use the contact form below to send a structured inquiry.",
                "For a useful first message, include your name, project context, timeline, and what kind of technical help you need.",
                "Location context: Dhaka, Bangladesh. Availability is oriented toward full-time roles and meaningful engineering work.",
                "Looking for a full-stack build or AI automation workflow? This is a good time to start the conversation.",
                "I found the primary contact channel in the profile: robiulislam31122002@gmail.com.",
                "A concise brief is welcome. Explain what you want to improve, automate, or build, and Robiul can respond with direction.",
                "Connection ready. Move to the Contact section or email directly when you are ready to discuss the next step."
            ],
            university: [
                "Education context loaded: Northern University Bangladesh, Computer Science and Engineering.",
                "The academic foundation includes algorithms, software design, databases, and distributed-systems thinking.",
                "Robiul's university background supports the way he approaches software: reason about the system before writing the feature.",
                "Computer Science and Engineering provides the fundamentals behind his work in web systems, APIs, and automation.",
                "The academic path and the project path reinforce each other: theory informs the architecture, and projects test the ideas.",
                "University profile confirmed: Northern University Bangladesh, with a focus on practical computer-science development.",
                "The CSE background helps connect low-level reasoning, data structures, software patterns, and modern application engineering.",
                "Rather than treating education and projects separately, Robiul uses both to build a stronger engineering perspective.",
                "Academic signal detected: curiosity about how systems work, plus the discipline to turn that understanding into software.",
                "Education summary complete. Northern University Bangladesh is the foundation; full-stack and AI projects are the application."
            ]
        });

        const terminalResponseIndexes = Object.fromEntries(
            Object.keys(terminalResponses).map(command => [command, 0])
        );

        const getNextTerminalResponse = (command) => {
            const responses = terminalResponses[command];
            if (!responses || responses.length === 0) return `Command not found: ${command}`;

            const currentIndex = terminalResponseIndexes[command] || 0;
            const response = responses[currentIndex % responses.length];
            terminalResponseIndexes[command] = currentIndex + 1;
            return response;
        };

        const appendTerminalLine = (command, result) => {
            const line = document.createElement('div');
            line.className = 'term-line';

            const commandEcho = document.createElement('div');
            commandEcho.className = 'term-cmd-echo';
            commandEcho.textContent = `robiul@dev:~$ ${command}`;

            const commandResult = document.createElement('div');
            commandResult.className = 'term-cmd-result';
            commandResult.textContent = result;

            line.append(commandEcho, commandResult);
            terminalBody.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        };

        const clearTerminal = () => {
            terminalBody.replaceChildren();
            terminalInput.focus();
        };

        const executeTerminalCommand = (rawCommand) => {
            const command = rawCommand.trim().toLowerCase();
            if (!command) return;

            terminalInput.value = '';

            if (command === 'clear' || command === 'cls') {
                clearTerminal();
                return;
            }

            appendTerminalLine(command, getNextTerminalResponse(command));
            terminalInput.focus();
        };

        terminalChips.forEach(chip => {
            chip.addEventListener('click', () => {
                executeTerminalCommand(chip.dataset.cmd || chip.textContent);
            });
        });

        terminalInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                executeTerminalCommand(terminalInput.value);
            }
        });
    }

    // ==================== 9. PARTICLE BACKGROUND ====================
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

    // ==================== 10. DYNAMIC YEAR ====================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==================== 11. PAGE LOAD ANIMATIONS ====================
    setTimeout(() => {
        document.body.classList.add('loaded');
        const heroElements = document.querySelectorAll('.hero-animate');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 200);

    // ==================== 12. TILT EFFECT ON CARDS ====================
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
