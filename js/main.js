/* ============================================
   UKS, Inc. Corporate Website - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initFadeInObserver();
  initSmoothScroll();
});

/* --- Hamburger Menu Toggle --- */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll-based Fade-in Animations --- */
function initFadeInObserver() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    fadeElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

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
      threshold: 0.1,
    }
  );

  fadeElements.forEach(el => observer.observe(el));
}

/* --- Smooth Scrolling for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Skip if it's just "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}
