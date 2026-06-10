/* ==========================================================================
   Ener-Wave - Interactive Application Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navigation Scroll Effect
    initNavigation();
    
    // Initialize Mobile Hamburger Menu
    initMobileMenu();
    
    // Initialize Stats Counter Animation
    initStatsCounter();
    
    // Initialize Contact Form
    initContactForm();
});

/* ==========================================================================
   Navigation Scroll & Active Links (ScrollSpy)
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    // Header class on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // ScrollSpy logic
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
}

/* ==========================================================================
   Mobile Menu Hamburguesa
   ========================================================================== */
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}


/* ==========================================================================
   Simulador de Métricas en Tiempo Real en el Dashboard
   ========================================================================== */
function generateLiveDashboardData() {
    const powerOutput = document.getElementById("dash-power");
    const activeBuoys = document.getElementById("dash-buoys");
    const energyToday = document.getElementById("dash-energy");
    
    let basePower = 342.6;
    let baseEnergy = 4212.8;
    
    // Animate and fluctuate value simulating real turbines connected to the sea!
    const interval = setInterval(() => {
        if (!document.getElementById("user-dashboard").classList.contains("active")) {
            clearInterval(interval);
            return;
        }
        // Small fluctuation simulating ocean wave cycles
        const fluctuation = (Math.random() - 0.5) * 8.5;
        basePower = Math.max(120, basePower + fluctuation);
        baseEnergy += (basePower / 3600); // add generated power to energy
        
        powerOutput.textContent = basePower.toFixed(2) + " MW";
        energyToday.textContent = baseEnergy.toFixed(1) + " MWh";
    }, 1500);
}

/* ==========================================================================
   Estadísticas y Números Incrementales (Intersection Observer)
   ========================================================================== */
function initStatsCounter() {
    const statsSection = document.getElementById("impacto");
    const statNumbers = document.querySelectorAll(".stat-number");
    
    let animated = false;
    
    const countUp = (element) => {
        const target = parseFloat(element.getAttribute("data-target"));
        const suffix = element.getAttribute("data-suffix") || "";
        const isDecimal = element.getAttribute("data-decimal") === "true";
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 16; // approx 60fps
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('es-ES')) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('es-ES')) + suffix;
            }
        }, stepTime);
    };
    
    const observerOptions = {
        root: null,
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(num => countUp(num));
                animated = true;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ==========================================================================
   Formulario de Contacto Premium
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const contactAlert = document.getElementById("contact-alert");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("con-name").value.trim();
        const email = document.getElementById("con-email").value.trim();
        const message = document.getElementById("con-message").value.trim();
        
        if (!name || !email || !message) {
            showFormAlert(contactAlert, "Por favor, completa todos los campos del formulario.", "error");
            return;
        }
        
        showFormAlert(contactAlert, "¡Mensaje enviado con éxito! Nuestro equipo técnico se pondrá en contacto pronto.", "success");
        contactForm.reset();
        
        setTimeout(() => {
            contactAlert.style.display = "none";
        }, 5000);
    });
}
