
/* =========================================================
   BUDEN SHA S — PORTFOLIO ENGINE
   COMPLETE JAVASCRIPT REPLACEMENT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const skipButton = document.getElementById("skip-loader");

    let loadingValue = 0;
    let loaderInterval;

    function finishLoader() {
        if (!loader || loader.classList.contains("loader-hidden")) return;

        loader.classList.add("loader-hidden");

        if (loaderInterval) {
            clearInterval(loaderInterval);
        }
    }

    if (loader && progress && percentage) {

        loaderInterval = setInterval(() => {

            loadingValue += Math.floor(Math.random() * 5) + 2;

            if (loadingValue >= 100) {
                loadingValue = 100;
                progress.style.width = "100%";
                percentage.textContent = "100%";

                clearInterval(loaderInterval);

                setTimeout(finishLoader, 500);
            } else {
                progress.style.width = loadingValue + "%";
                percentage.textContent = loadingValue + "%";
            }

        }, 70);

    } else {
        finishLoader();
    }

    if (skipButton) {
        skipButton.addEventListener("click", finishLoader);
    }

    // Failsafe: prevent the loader from remaining indefinitely.
    setTimeout(finishLoader, 8000);


    /* =====================================================
       HERO TYPING EFFECT
    ===================================================== */

    const typingElement = document.getElementById("typing-text");

    if (typingElement) {

        const phrases = [
            "DIGITAL EXPERIENCES",
            "AI APPLICATIONS",
            "WEB SOLUTIONS",
            "CREATIVE PROJECTS",
            "TECHNOLOGY"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentPhrase = phrases[phraseIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentPhrase.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex >= currentPhrase.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

                setTimeout(typeEffect, 90);

            } else {

                typingElement.textContent =
                    currentPhrase.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex <= 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeEffect, 500);
                    return;
                }

                setTimeout(typeEffect, 45);
            }
        }

        typeEffect();
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }

    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.getElementById("back-to-top");

    function updateBackToTop() {

        if (backToTop) {
            backToTop.classList.toggle("visible", window.scrollY > 500);
        }

    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       PARTICLE BACKGROUND
    ===================================================== */

    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        if (ctx) {

            let particles = [];
            let width = 0;
            let height = 0;

            const particleCount = window.innerWidth < 600 ? 35 : 70;

            function resizeCanvas() {

                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;

                createParticles();

            }

            function createParticles() {

                particles = [];

                for (let i = 0; i < particleCount; i++) {

                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: Math.random() * 2 + 0.5,
                        speedX: (Math.random() - 0.5) * 0.5,
                        speedY: (Math.random() - 0.5) * 0.5,
                        opacity: Math.random() * 0.5 + 0.1
                    });

                }

            }

            function drawParticles() {

                ctx.clearRect(0, 0, width, height);

                particles.forEach(particle => {

                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x < 0 || particle.x > width) {
                        particle.speedX *= -1;
                    }

                    if (particle.y < 0 || particle.y > height) {
                        particle.speedY *= -1;
                    }

                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle = `rgba(255,65,85,${particle.opacity})`;
                    ctx.fill();

                });

                // Connect nearby particles.
                for (let i = 0; i < particles.length; i++) {

                    for (let j = i + 1; j < particles.length; j++) {

                        const p1 = particles[i];
                        const p2 = particles[j];

                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 110) {

                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);

                            ctx.strokeStyle =
                                `rgba(255,50,70,${0.07 * (1 - distance / 110)})`;

                            ctx.lineWidth = 0.5;
                            ctx.stroke();

                        }

                    }

                }

                requestAnimationFrame(drawParticles);

            }

            resizeCanvas();
            drawParticles();

            window.addEventListener("resize", resizeCanvas);

        }

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    /* =====================================================
   CUSTOM CURSOR — FAST METALLIC POINTER
===================================================== */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

if (
    cursor &&
    cursorDot &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    }, { passive: true });

    document.querySelectorAll("a, button").forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursor.style.filter =
                "drop-shadow(0 0 10px rgba(255,0,0,1)) " +
                "drop-shadow(0 0 22px rgba(255,50,50,.9))";
        });

        element.addEventListener("mouseleave", () => {
            cursor.style.filter =
                "drop-shadow(0 0 5px rgba(255,0,0,.8)) " +
                "drop-shadow(0 0 12px rgba(255,40,40,.45))";
        });

    });

}

    /* =====================================================
       PROJECT CARD INTERACTION
    ===================================================== */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.zIndex = "2";
        });

        card.addEventListener("mouseleave", () => {
            card.style.zIndex = "1";
        });

    });


    /* =====================================================
       FLOATING CARDS
    ===================================================== */

    document.querySelectorAll(".floating-card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.animationPlayState = "paused";
        });

        card.addEventListener("mouseleave", () => {
            card.style.animationPlayState = "running";
        });

    });


    /* =====================================================
       CONTACT FORM — DEMO ONLY
    ===================================================== */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name = document.getElementById("contact-name");

            const visitorName = name ? name.value.trim() : "";

            alert(
                "Thank you" +
                (visitorName ? ", " + visitorName : "") +
                "! Your demo form is working. Actual email delivery has not been configured yet."
            );

            contactForm.reset();

        });

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll("a[href^='#']").forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    console.log(
        "%cBUDEN SHA S | PORTFOLIO",
        "color:#ff303b;font-size:20px;font-weight:bold"
    );

    console.log(
        "%cIntelligence. Creativity. Development.",
        "color:#40c9ff;font-size:14px"
    );

});
