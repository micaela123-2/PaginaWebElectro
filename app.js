/* ==========================================================================
   Ener-Wave - Interactive Application Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Navigation Scroll Effect
    initNavigation();
    
    // Initialize Mobile Hamburger Menu
    initMobileMenu();
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

    if (!statsSection) return;

    const statNumbers = document.querySelectorAll(".stat-number");
    let animated = false;

    const countUp = (element) => {

        const target = parseFloat(element.dataset.target);
        const suffix = element.dataset.suffix || "";
        const isDecimal = element.dataset.decimal === "true";

        // Evita NaN
        if (isNaN(target)) return;

        let current = 0;
        const duration = 2000;
        const fps = 60;
        const totalFrames = duration / (1000 / fps);
        const increment = target / totalFrames;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                element.textContent =
                    (isDecimal
                        ? target.toFixed(1)
                        : Math.round(target).toLocaleString("es-CL"))
                    + suffix;

                clearInterval(timer);

            } else {

                element.textContent =
                    (isDecimal
                        ? current.toFixed(1)
                        : Math.round(current).toLocaleString("es-CL"))
                    + suffix;
            }

        }, 1000 / fps);
    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !animated) {

                statNumbers.forEach(countUp);

                animated = true;
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(statsSection);
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
let port;
let reader;

const data = [];
const labels = [];

const ctx = document.getElementById("voltageChart");

const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Voltaje (V)",
            data: data,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 0,
                max: 5
            }
        }
    }
});

document.getElementById("connectBtn")
.addEventListener("click", connectArduino);
document.getElementById("connectMPUBtn")
.addEventListener("click", connectMPU);

async function connectArduino() {

    try {

        port = await navigator.serial.requestPort();

        await port.open({
            baudRate: 9600
        });

        const decoder = new TextDecoderStream();

        port.readable.pipeTo(decoder.writable);

        reader = decoder.readable.getReader();

        let tiempo = 0;

        while (true) {

            const { value, done } =
                await reader.read();

            if (done) break;

            const lines = value.split("\n");

           lines.forEach(line => {

    const partes = line.trim().split(",");

    if(partes.length === 2){

        const x = parseFloat(partes[0]);
        const y = parseFloat(partes[1]);

        if(!isNaN(x) && !isNaN(y)){

            moverBoya(x, y);

            console.log("X:", x, "Y:", y);
        }
    }

});
        }

    } catch(err) {
        console.error(err);
    }
}
function moverBoya(x, y){

    const boya = document.getElementById("boyaReal");

    if(!boya) return;

    boya.style.transform =
        `translateX(-50%)
         translateY(${-y * 20}px)
         rotate(${x * 10}deg)`;
}
async function connectMPU() {

    try {

        const portMPU = await navigator.serial.requestPort();

        await portMPU.open({
            baudRate: 9600
        });

        const decoder = new TextDecoderStream();

        portMPU.readable.pipeTo(decoder.writable);

        const reader = decoder.readable.getReader();

        while (true) {

            const { value, done } = await reader.read();

            if (done) break;

            const lines = value.split("\n");

            lines.forEach(line => {

                const partes = line.trim().split(",");

                if (partes.length === 2) {

                    const x = parseFloat(partes[0]);
                    const y = parseFloat(partes[1]);

                    if (!isNaN(x) && !isNaN(y)) {

                        moverBoya(x, y);

                    }
                }

            });

        }

    } catch (err) {

        console.error(err);

    }

}
