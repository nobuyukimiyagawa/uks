/* ============================================
   Higden nail & eye — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollFadeIn();
  initGalleryTabs();
  initHeaderScroll();
});

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  const navLinks = navMobile.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll-based Fade-in (IntersectionObserver) --- */
function initScrollFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (!fadeElements.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    fadeElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeElements.forEach(el => observer.observe(el));
}

/* --- Gallery Tab Switching --- */
function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const categories = document.querySelectorAll('.gallery-category');

  if (!tabs.length || !categories.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-category');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show target category, hide others
      categories.forEach(cat => {
        if (cat.getAttribute('data-category') === target) {
          cat.classList.add('active');
        } else {
          cat.classList.remove('active');
        }
      });
    });
  });
}

/* --- Header Scroll Effect --- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}
