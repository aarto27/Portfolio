/* ============================
   1. AOS & INITIALIZATION
============================ */
AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: "ease-out-cubic",
});

const greetingElement = document.getElementById("greeting");

if (greetingElement) {
    const hour = new Date().getHours();
    let text = "Hello";

    if (hour < 12) text = "Good Morning";
    else if (hour < 18) text = "Good Afternoon";
    else text = "Good Evening";

    greetingElement.textContent = text;
}

/* ============================
   2. THEME TOGGLE (Default Dark)
============================ */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const icon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);

    if (mode === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

/* ============================
   3. IMAGE MODAL (LIGHTBOX)
============================ */
const modal = document.getElementById("imageModal");
const img = document.getElementById("profileImg");
const modalImg = document.getElementById("fullImage");
const closeModal = document.querySelector(".close-modal");

img.onclick = function () {
    modal.classList.add("active");
    modalImg.src = this.src;
    document.body.style.overflow = "hidden";
};

function hideModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

closeModal.onclick = hideModal;

modal.onclick = function (e) {
    if (e.target === modal) hideModal();
};

/* ============================
   4. CUSTOM CURSOR
============================ */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const { clientX: posX, clientY: posY } = e;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
    );
});

const interactiveElements = document.querySelectorAll(
    "a, button, .card, .project-card, input, textarea"
);

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(255,255,255,0.1)";
        cursorOutline.style.borderColor = "transparent";
    });

    el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--text-muted)";
    });
});

/* ============================
   5. SCROLL PROGRESS BAR
============================ */
window.addEventListener("scroll", () => {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = `${scrolled}%`;
});

/* ============================
   6. TYPEWRITER EFFECT
============================ */
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;

        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".txt-type");
    if (!txtElement) return;

    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");

    new TypeWriter(txtElement, words, wait);
}

/* ============================
   7. CONTACT FORM (EmailJS)
============================ */
(function () {
    emailjs.init("byAzl-nY6W_7_pV_u");
})();

const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("status");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector("button");
        const originalContent = btn.innerHTML;

        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const params = {
            from_name: document.getElementById("name").value,
            email_id: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };

        emailjs
            .send("service_y9dbups", "template_ditjqrq", params)
            .then(() => {
                statusMsg.innerHTML =
                    '<i class="fas fa-check-circle"></i> Message sent successfully!';
                statusMsg.style.color = "#4ade80";

                contactForm.reset();
                setTimeout(() => (statusMsg.textContent = ""), 5000);
            })
            .catch((error) => {
                console.error("Failed:", error);
                statusMsg.innerHTML =
                    '<i class="fas fa-exclamation-triangle"></i> Failed to send.';
                statusMsg.style.color = "#ef4444";
            })
            .finally(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            });
    });
}
