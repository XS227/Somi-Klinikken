(() => {
  const BOOKING_URL = "https://somi.bestille.no/";

  function setHeaderHeightVar() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }

  function wireBookingLinks(root = document) {
    root.querySelectorAll("[data-booking-link]").forEach(a => {
      a.setAttribute("href", BOOKING_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  function closeMenu() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const btn = header.querySelector("[data-menu-toggle]");
    const panel = header.querySelector("[data-mobile-panel]");
    if (!btn || !panel) return;

    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setHeaderHeightVar();
  }

  function toggleMenu() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const btn = header.querySelector("[data-menu-toggle]");
    const panel = header.querySelector("[data-mobile-panel]");
    if (!btn || !panel) return;

    const isOpen = panel.classList.contains("is-open");
    if (isOpen) closeMenu();
    else {
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      setHeaderHeightVar();
    }
  }

  // Event delegation: works even if header is injected later
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-menu-toggle]");
    if (toggle) {
      e.preventDefault();
      toggleMenu();
      return;
    }

    const inPanelLink = e.target.closest("[data-mobile-panel] a");
    if (inPanelLink) closeMenu();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
    setHeaderHeightVar();
  });

  window.addEventListener("scroll", () => {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    if (window.scrollY > 6) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }, { passive: true });

  document.addEventListener("DOMContentLoaded", () => {
    wireBookingLinks(document);
    setHeaderHeightVar();
    closeMenu();
  });

  // If includes injects later, just re-apply booking links + header height
  const obs = new MutationObserver(() => {
    wireBookingLinks(document);
    setHeaderHeightVar();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
