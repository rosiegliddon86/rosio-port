/* =============================================================
   ROSIE GLIDDON THERAPY — main.js
   ============================================================= */

'use strict';

document.documentElement.classList.add('js');

/* --- Colour accent cycling --- */
const CYCLE = ['blue', 'accent', 'yellow'];

document.querySelectorAll('.credential-card').forEach((card, i) => {
  card.classList.add(`credential-card--${CYCLE[i % 3]}`);
});

document.querySelectorAll('.offer-item').forEach((item, i) => {
  item.classList.add(`offer-item--${CYCLE[i % 3]}`);
});

document.querySelectorAll('.about-item').forEach((item, i) => {
  item.classList.add(`about-item--${CYCLE[i % 3]}`);
});


/* --- Footer year --- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* --- Mobile navigation toggle --- */
const navToggle  = document.querySelector('.nav-toggle');
const navMenu    = document.querySelector('.nav-menu');
const navLinks   = document.querySelectorAll('.nav-link');
const backdrop   = document.getElementById('nav-backdrop');

function closeNav() {
  navMenu.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navMenu && backdrop) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    backdrop.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeNav);

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });
}


/* --- Scroll reveal --- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    '.credential-card, .offer-item, .about-item, .contact-item, .section-header'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    const list = el.closest('.credential-list, .offer-list, .about-list');
    if (list) {
      const siblings = list.querySelectorAll('.credential-card, .offer-item, .about-item');
      const listIndex = Array.from(siblings).indexOf(el);
      el.dataset.revealDelay = listIndex * 80;
    }
    revealObserver.observe(el);
  });
}


/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll('section[id]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, {
    rootMargin: `-${Math.floor(window.innerHeight * 0.4)}px 0px -${Math.floor(window.innerHeight * 0.4)}px 0px`,
    threshold: 0,
  });

  sections.forEach(s => sectionObserver.observe(s));
}


/* --- Smooth header shadow on scroll --- */
const header = document.querySelector('.site-header');

if (header) {
  const scrollObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  // Observe a sentinel element just below the top
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:1px;height:1px;width:1px;pointer-events:none;';
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.setAttribute('role', 'presentation');
  document.body.prepend(sentinel);
  scrollObserver.observe(sentinel);
}
