/* ============================================
   ビルヂング角 (Building Kado) - Main JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* --- Mobile Hamburger Menu --- */
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.querySelector(".nav-mobile");

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-active");
      navMobile.classList.toggle("is-open");
      document.body.style.overflow = navMobile.classList.contains("is-open") ? "hidden" : "";
    });

    // Close menu when clicking a link
    navMobile.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-active");
        navMobile.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* --- Header scroll shadow --- */
  const header = document.querySelector(".header");

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Scroll Fade-In (IntersectionObserver) --- */
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0 && "IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    // Fallback: show all elements if IntersectionObserver not supported
    fadeElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* --- Active nav link highlight --- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

});
