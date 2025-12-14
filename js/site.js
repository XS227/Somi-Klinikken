function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("is-in");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function initHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
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
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initHeader();
});
