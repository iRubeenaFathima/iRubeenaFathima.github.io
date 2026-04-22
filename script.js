// --- 1. Typewriter Effect ---
const words = ["Cybersecurity Enthusiast", "Developer", "Level 21 Unlocked"];
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

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000); // Initial delay
});


// --- 2. Scroll Animations (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- 3. Terminal Easter Egg Interaction ---
const terminal = document.getElementById('terminal');
const terminalBody = document.querySelector('.terminal-body');
let terminalClicked = false;

terminal.addEventListener('click', () => {
    if (terminalClicked) return;
    terminalClicked = true;
    
    terminalBody.innerHTML = ''; // Clear initial message
    
    const messages = [
        "> Initiating secure protocol...",
        "> Bypassing mainframe...",
        "> Access Granted.",
        "> HAPPY 21ST BIRTHDAY! 🎂"
    ];
    
    let msgIndex = 0;
    
    function logMessage() {
        if (msgIndex < messages.length) {
            const p = document.createElement('p');
            p.className = 'sys-msg';
            p.textContent = messages[msgIndex];
            terminalBody.appendChild(p);
            msgIndex++;
            setTimeout(logMessage, 800);
        }
    }
    
    logMessage();
});
