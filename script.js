const navToggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearNode = document.querySelector("#year");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggleButton && navLinks) {
  navToggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isExpanded = navLinks.classList.contains("open");
    navToggleButton.setAttribute("aria-expanded", String(isExpanded));
    document.body.classList.toggle("menu-open", isExpanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggleButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");

if (revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
  let ringX = 0;
  let ringY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    window.requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button, .project-card, .skill-group, .cert-card, .hero-card, .contact-card").forEach((item) => {
    item.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"));
    item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
  });
}
