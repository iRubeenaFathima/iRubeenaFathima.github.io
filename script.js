// --- 1. Theme Toggle & Mobile Menu Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Theme Switcher
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌓';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});

// Mobile Hamburger Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- 2. Typewriter Effect ---
const words = ["Cybersecurity Student", "Developer", "Level 21 Reached"];
const typewriterElement = document.getElementById('typewriter');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; 
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));


// --- 3. Scroll Animations ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


// --- 4. Birthday Surprise Logic (Confetti & Modal) ---
const partyBtn = document.getElementById('party-btn');
const bdayModal = document.getElementById('bday-modal');
const closeModal = document.getElementById('close-modal');

// Vanilla JS Confetti Generator
function throwConfetti() {
    const colors = ['#38bdf8', '#ff5f56', '#ffbd2e', '#27c93f', '#a855f7'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize position, color, and animation duration
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        // Clean up DOM after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

partyBtn.addEventListener('click', () => {
    throwConfetti();
    bdayModal.classList.remove('hidden-modal');
});

closeModal.addEventListener('click', () => {
    bdayModal.classList.add('hidden-modal');
});


// --- 5. Terminal Easter Egg Interaction ---
const terminal = document.getElementById('terminal');
const terminalBody = document.querySelector('.terminal-body');
let terminalClicked = false;

terminal.addEventListener('click', () => {
    if (terminalClicked) return;
    terminalClicked = true;
    terminalBody.innerHTML = ''; 
    
    const messages = [
        "> User: Rubeena Fathima identified.",
        "> Fetching admin privileges...",
        "> Access Granted.",
        "> System Message: Have a great 21st Birthday! 🚀"
    ];
    
    let msgIndex = 0;
    function logMessage() {
        if (msgIndex < messages.length) {
            const p = document.createElement('p');
            p.className = 'sys-msg';
            p.textContent = messages[msgIndex];
            terminalBody.appendChild(p);
            msgIndex++;
            setTimeout(logMessage, 700);
        }
    }
    logMessage();
});
