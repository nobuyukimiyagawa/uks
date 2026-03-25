/* ============================================
   and uks beauty salon - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initScrollFadeIn();
  initSmoothScroll();
});

/* --- Mobile Hamburger Menu --- */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const body = document.body;

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('hamburger--active');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function openMenu() {
    hamburger.classList.add('hamburger--active');
    mobileNav.classList.add('mobile-nav--open');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('hamburger--active');
    mobileNav.classList.remove('mobile-nav--open');
    body.style.overflow = '';
  }
}

/* --- Scroll Fade-In with IntersectionObserver --- */
function initScrollFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (!fadeElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      }
    );

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }
}

/* --- Smooth Scrolling for anchor links --- */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
