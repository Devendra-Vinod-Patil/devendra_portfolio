const navToggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearNode = document.querySelector('#year');
const animatedLineNode = document.querySelector('#animated-line');

const animatedLines = [
  'AI and Machine Learning Explorer',
  'Prompt Engineer',
  'BI Developer',
  'Building One Model at a Time',
];

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (animatedLineNode) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % animatedLines.length;
    animatedLineNode.textContent = animatedLines[index];
  }, 1800);
}

if (navToggleButton && navLinks) {
  navToggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isExpanded = navLinks.classList.contains('open');
    navToggleButton.setAttribute('aria-expanded', String(isExpanded));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}
