/* ==========================================================================
   Ener-Wave - Interactive Application Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navigation Scroll Effect
    initNavigation();
    
    // Initialize Mobile Hamburger Menu
    initMobileMenu();
    
    // Initialize Auth Flip Card and LocalStorage Sim
    initAuthPortal();
    
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
   Client Portal - Auth Flip & Simulated Dashboard
   ========================================================================== */
function initAuthPortal() {
    const authWrapper = document.getElementById("auth-wrapper");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");
    
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    
    const loginAlert = document.getElementById("login-alert");
    const registerAlert = document.getElementById("register-alert");
    
    const frontCard = document.querySelector(".auth-card-front");
    const backCard = document.querySelector(".auth-card-back");
    const dashboardPanel = document.getElementById("user-dashboard");
    
    // Flip to register
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        authWrapper.classList.add("flipped");
        clearAlerts();
    });
    
    // Flip to login
    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        authWrapper.classList.remove("flipped");
        clearAlerts();
    });
    
    function clearAlerts() {
        loginAlert.style.display = "none";
        registerAlert.style.display = "none";
    }
    
    // Mock user storage
    if (!localStorage.getItem("enerwave_users")) {
        const defaultUsers = [
            { email: "demo@enerwave.com", password: "password123", name: "Innovación y Desarrollo" }
        ];
        localStorage.setItem("enerwave_users", JSON.stringify(defaultUsers));
    }
    
    // Registration logic
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirmPass = document.getElementById("reg-confirm-password").value;
        
        if (!name || !email || !password) {
            showFormAlert(registerAlert, "Por favor complete todos los campos.", "error");
            return;
        }
        
        if (password !== confirmPass) {
            showFormAlert(registerAlert, "Las contraseñas no coinciden.", "error");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem("enerwave_users") || "[]");
        
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            showFormAlert(registerAlert, "Este correo electrónico ya está registrado.", "error");
            return;
        }
        
        // Add new user
        users.push({ name, email, password });
        localStorage.setItem("enerwave_users", JSON.stringify(users));
        
        showFormAlert(registerAlert, "¡Registro completado! Redirigiendo al inicio de sesión...", "success");
        registerForm.reset();
        
        setTimeout(() => {
            authWrapper.classList.remove("flipped");
            document.getElementById("login-email").value = email;
            document.getElementById("login-password").focus();
            clearAlerts();
        }, 2000);
    });
    
    // Login logic
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        
        if (!email || !password) {
            showFormAlert(loginAlert, "Por favor introduzca correo y contraseña.", "error");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem("enerwave_users") || "[]");
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (user) {
            showFormAlert(loginAlert, "¡Sesión iniciada con éxito! Cargando Portal...", "success");
            
            setTimeout(() => {
                // Hide flip card, show gorgeous simulator dashboard
                frontCard.style.display = "none";
                backCard.style.display = "none";
                authWrapper.style.display = "none";
                
                // Show dashboard
                document.getElementById("dashboard-user-name").textContent = user.name;
                dashboardPanel.classList.add("active");
                
                // Generate dynamic dashboard metrics
                generateLiveDashboardData();
            }, 1200);
        } else {
            showFormAlert(loginAlert, "Credenciales incorrectas. Pruebe demo@enerwave.com / password123", "error");
        }
    });
    
    // Logout logic
    document.getElementById("dashboard-logout").addEventListener("click", () => {
        dashboardPanel.classList.remove("active");
        
        setTimeout(() => {
            frontCard.style.display = "flex";
            backCard.style.display = "flex";
            authWrapper.style.display = "block";
            loginForm.reset();
            clearAlerts();
        }, 400);
    });
}

function showFormAlert(element, message, type) {
    element.textContent = message;
    element.className = `form-alert alert-${type}`;
    element.style.display = "flex";
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
