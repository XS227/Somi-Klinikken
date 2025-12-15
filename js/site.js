(() => {
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  const headerEl = document.querySelector("[data-site-header]");
  const menuBtn = headerEl?.querySelector("[data-menu-btn]");
  const mobilePanel = headerEl?.querySelector("[data-mobile-panel]");

  function setActiveLinks() {
    const path = location.pathname.replace(/\/$/, "");
    document.querySelectorAll(".nav a, .mobile-panel__inner a").forEach(a => {
      const href = (a.getAttribute("href") || "").replace(/\/$/, "");
      const isIndex = path === "" && href.endsWith("/index.html");
      if (href && (href === path || isIndex)) {
        a.classList.add("active");
      }
    });
  }

  function setupScrollState() {
    if (!headerEl) return;
    const apply = () => headerEl.classList.toggle("is-scrolled", window.scrollY > 4);
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  function setupMobileMenu() {
    if (!menuBtn || !mobilePanel) return;
    const close = () => {
      mobilePanel.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    };

    const toggle = () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("no-scroll", isOpen);
    };

    menuBtn.addEventListener("click", toggle);
    mobilePanel.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  }

  document.addEventListener("DOMContentLoaded", initReveal);

  setActiveLinks();
  setupScrollState();
  setupMobileMenu();
})();
