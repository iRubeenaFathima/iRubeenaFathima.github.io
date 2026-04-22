// --- 1. Theme Toggle & Mobile Menu Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

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

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- 2. Typewriter Effect ---
const words = ["Cybersecurity Student", "Developer"];
const typewriterElement = document.getElementById('typewriter');
let wordIndex = 0; let charIndex = 0; let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; 
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// --- 3. Scroll Animations ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); observer.unobserve(entry.target); 
        }
    });
}, observerOptions);
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// --- 4. Birthday Surprise Logic ---
const partyBtn = document.getElementById('party-btn');
const bdayModal = document.getElementById('bday-modal');
const closeModal = document.getElementById('close-modal');

function throwConfetti() {
    const colors = ['#38bdf8', '#ff5f56', '#ffbd2e', '#27c93f', '#a855f7'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

partyBtn.addEventListener('click', () => { throwConfetti(); bdayModal.classList.remove('hidden-modal'); });
closeModal.addEventListener('click', () => { bdayModal.classList.add('hidden-modal'); });

// --- 5. Interactive Terminal Logic ---
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

// Keep focus on input when clicking inside the terminal box
terminalBody.addEventListener('click', () => terminalInput.focus());

const commands = {
    help: `Available commands:
  - about      : Display profile information
  - projects   : List active deployments
  - contact    : View social links
  - clear      : Clear terminal output
  - sudo       : ???`,
    about: "Rubeena Fathima.\nCybersecurity student bridging offensive tactics with robust engineering.",
    projects: "1. Custom College Chatbot\n2. Phishing Simulation Platform",
    contact: "GitHub: github.com/username\nLinkedIn: linkedin.com/in/username",
    sudo: "nice try. this incident will be reported."
};

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value.trim().toLowerCase();
        
        // Echo the command
        const echoLine = document.createElement('p');
        echoLine.innerHTML = `<span style="color:#38bdf8">visitor@rf:~$</span> ${this.value}`;
        terminalOutput.appendChild(echoLine);
        
        // Process command
        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (cmd !== '') {
            const responseText = commands[cmd] || `bash: ${cmd}: command not found. Type 'help' for available commands.`;
            const responseLine = document.createElement('p');
            
            // Format color based on command success/failure
            if (commands[cmd]) {
                responseLine.className = cmd === 'sudo' ? 'err-msg' : 'info-msg';
            } else {
                responseLine.className = 'err-msg';
            }
            
            responseLine.textContent = responseText;
            terminalOutput.appendChild(responseLine);
        }
        
        // Clear input and scroll to bottom
        this.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});
