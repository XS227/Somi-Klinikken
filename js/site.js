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
  document.querySelectorAll(".nav a, .mobile-panel__inner a").forEach((a) => {
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
  const panel = document.querySelector("[data-mobile-panel]");
  if (btn && panel) {
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }
}

// Kjør etter at header/footer er injisert
document.addEventListener("partials:loaded", () => {
  initReveal();
  initHeader();
  setActiveLinks();
});
