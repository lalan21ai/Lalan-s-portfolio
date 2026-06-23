document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll background toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 2. TYPEWRITER EFFECT
    // ==========================================================================
    const words = [
        "AI Agents & Chatbots", 
        "Machine Learning Models", 
        "Full-Stack Web Apps", 
        "NLP Algorithms"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 70;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 3. SCROLL REVEAL & NAVIGATION LINKS HIGHLIGHT
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Section Navigation Indicator
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 4. NEURAL NETWORK CANVAS BACKGROUND EFFECT
    // ==========================================================================
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Adjust canvas dimension
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Capture mouse position
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle constructor
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                // Speeds (slow and smooth)
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = (Math.random() - 0.5) * 0.35;
                // Alternate warm tones (gold, copper)
                this.color = Math.random() > 0.5 ? 'rgba(243, 156, 18, 0.45)' : 'rgba(230, 126, 34, 0.45)';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Hover interaction
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        // Slowly draw towards mouse
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx * force * 0.02;
                        this.y -= dy * force * 0.02;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Draw connections
        function drawConnections() {
            let maxDistance = 110;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        // Alpha based on distance
                        let alpha = (1 - (distance / maxDistance)) * 0.15;
                        ctx.strokeStyle = `rgba(243, 156, 18, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            requestAnimationFrame(animate);
        }

        animate();
    }

    // ==========================================================================
    // 5. INTERACTIVE RELATION HIGHLIGHT (SKILLS <-> PROJECTS)
    // ==========================================================================
    const skillTags = document.querySelectorAll('.skill-tag');
    const projectCards = document.querySelectorAll('.project-card');

    skillTags.forEach(tag => {
        const relatedId = tag.getAttribute('data-related');
        if (!relatedId) return;

        tag.addEventListener('mouseenter', () => {
            const card = document.getElementById(relatedId);
            if (card) {
                card.classList.add('highlight-link');
            }
            tag.classList.add('highlight-link');
        });

        tag.addEventListener('mouseleave', () => {
            const card = document.getElementById(relatedId);
            if (card) {
                card.classList.remove('highlight-link');
            }
            tag.classList.remove('highlight-link');
        });
    });

    projectCards.forEach(card => {
        const cardId = card.getAttribute('id');
        if (!cardId) return;

        card.addEventListener('mouseenter', () => {
            document.querySelectorAll(`.skill-tag[data-related="${cardId}"]`).forEach(tag => {
                tag.classList.add('highlight-link');
            });
        });

        card.addEventListener('mouseleave', () => {
            document.querySelectorAll(`.skill-tag[data-related="${cardId}"]`).forEach(tag => {
                tag.classList.remove('highlight-link');
            });
        });
    });

    // ==========================================================================
    // 6. CONTACT FORM ACTION (Mail Client Integration)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = "";
            formStatus.className = "form-status";
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // UI Feedback during submission
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Drafting Email... <i class="fa-solid fa-circle-notch fa-spin"></i>';
            
            // Open mail draft via mailto link
            const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
            const body = encodeURIComponent(`Hello Lalan,\n\nYou received a message from your portfolio website.\n\nSender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:lalanofficial.cw@gmail.com?subject=${subject}&body=${body}`;
            
            // Simulate brief delay for feedback, then open mailto
            setTimeout(() => {
                window.location.href = mailtoUrl;
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                // Set success message
                formStatus.textContent = "Opening your email client to send message! Thank you.";
                formStatus.classList.add('success');
                
                // Clear fields
                contactForm.reset();
                
                // Fade out message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.textContent = "";
                        formStatus.style.opacity = '1';
                        formStatus.classList.remove('success');
                    }, 500);
                }, 5000);
            }, 1000);
        });
    }

    // ==========================================================================
    // 7. INTERACTIVE MOUSE EFFECTS (Spotlight & 3D Tilt)
    // ==========================================================================
    
    // Global mouse coordinate tracking for CSS Spotlight
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 3D Card Tilt Hover Effect
    const tiltCards = document.querySelectorAll('.project-card, .stat-card, .skills-category, .info-item, .timeline-content, .cert-image-wrapper, .visual-image-wrapper');
    
    tiltCards.forEach(card => {
        card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max 7 degrees tilt
            const rotateX = ((centerY - y) / centerY) * 7;
            const rotateY = ((x - centerX) / centerX) * 7;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, border-color 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
});
