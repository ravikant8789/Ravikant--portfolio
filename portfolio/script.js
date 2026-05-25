// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect
const text = "IT Student · Cybersecurity · AI · Problem Solver";
let i = 0;
const typingEl = document.getElementById("typing");

function type() {
  if (i < text.length) {
    typingEl.textContent += text.charAt(i);
    i++;
    setTimeout(type, 55);
  }
}
type();

// Nav scroll state
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Cursor glow
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));
document.getElementById("home").classList.add("visible");

// Particle system
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function particleColor() {
  return document.body.classList.contains("light")
    ? "rgba(20, 18, 15, 0.25)"
    : "rgba(201, 169, 98, 0.35)";
}

function lineColor() {
  return document.body.classList.contains("light")
    ? "rgba(20, 18, 15, 0.06)"
    : "rgba(201, 169, 98, 0.08)";
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = particleColor();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = dx * dx + dy * dy;
      if (dist < 9000) {
        ctx.strokeStyle = lineColor();
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function init() {
  resizeCanvas();
  particles = [];
  const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 12000));
  for (let n = 0; n < count; n++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", init);

function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
  label.textContent = isLight ? "Light" : "Dark";
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    document.getElementById("theme-icon").className = "fas fa-sun";
    document.getElementById("theme-label").textContent = "Light";
  }

  const emailLink = document.getElementById("email-link");
  if (!emailLink) return;

  emailLink.addEventListener("click", (e) => {
    // Opening index.html directly (file://) often blocks mailto on Windows
    if (window.location.protocol !== "file:") return;

    e.preventDefault();
    const to = emailLink.dataset.email;
    const subject = "Contact from Portfolio";
    const body = "Hello,\n\nI found your portfolio and would like to connect.";
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmail, "_blank", "noopener,noreferrer");
  });
});
