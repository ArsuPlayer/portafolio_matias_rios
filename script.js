document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa Móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Cambio de Tema Claro / Oscuro
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // 3. Efecto Typewriter (Escribir/Borrar Texto)
    const words = ["Front-End Jr.", "HTML & CSS", "JavaScript", "Entusiasta Web"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    function typeEffect() {
        if (!typewriterEl) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // 4. Filtros de Proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Scroll Reveal (Aparición al hacer scroll)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecutar al cargar

    // 6. Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--primary)';
            formStatus.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto.";
            contactForm.reset();
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 4000);
        });
    }
});