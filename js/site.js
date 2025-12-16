function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-in");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function setActiveLinks() {
  const currentPath = new URL(location.href).pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav a, .nav-mobile a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const targetPath = new URL(href, document.baseURI).pathname.replace(/\/$/, "");
    const basePath = new URL("./", document.baseURI).pathname.replace(/\/$/, "");
    const isIndex = targetPath === `${basePath}index.html` && currentPath === basePath;
    if (targetPath === currentPath || isIndex) {
      a.classList.add("active");
    }
  });
}

function initHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const btn = header.querySelector("[data-menu-btn]");
  const closeBtn = header.querySelector("[data-close-menu]");
  const panel = document.querySelector("[data-mobile-panel]");

  const toggleMenu = (forceOpen) => {
    if (!panel || !btn) return;
    const nextOpen = typeof forceOpen === "boolean" ? forceOpen : panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !nextOpen);
    panel.classList.toggle("is-open", nextOpen);
    btn.setAttribute("aria-expanded", String(nextOpen));
    document.body.classList.toggle("no-scroll", nextOpen);
  };

  if (btn && panel) {
    btn.addEventListener("click", () => toggleMenu());
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleMenu(false));
  }
  panel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// Kjør etter at header/footer er injisert
document.addEventListener("partials:loaded", () => {
  initReveal();
  initHeader();
  setActiveLinks();
});
