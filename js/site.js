(() => {
  const BOOKING_URL_DEFAULT = "https://somi.bestille.no/";

  const getBookingUrl = () => {
    try {
      return (window.SOMI_CONFIG && window.SOMI_CONFIG.bookingUrl) || BOOKING_URL_DEFAULT;
    } catch (_) {
      return BOOKING_URL_DEFAULT;
    }
  };

  function setHeaderHeightVar() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }

  function wireBookingLinks(root = document) {
    const bookingUrl = getBookingUrl();
    root.querySelectorAll("[data-booking-link]").forEach(a => {
      a.setAttribute("href", bookingUrl);
      a.setAttribute("rel", "noopener");
      a.setAttribute("target", "_blank");
    });
  }

  function wireMobileMenu() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return false;

    const btn = header.querySelector("[data-menu-toggle]");
    const panel = header.querySelector("[data-mobile-panel]");
    if (!btn || !panel) return false;

    const close = () => {
      btn.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      setHeaderHeightVar();
    };

    const open = () => {
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      setHeaderHeightVar();
    };

    btn.addEventListener("click", () => {
      const isOpen = panel.classList.contains("is-open");
      isOpen ? close() : open();
    });

    // Close on link click
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      close();
    });

    // Close on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) close();
      setHeaderHeightVar();
    });

    // Close on ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // Sticky “scrolled” state
    window.addEventListener("scroll", () => {
      if (window.scrollY > 6) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }, { passive: true });

    // Initial
    close();
    setHeaderHeightVar();
    return true;
  }

  function init() {
    wireBookingLinks(document);
    setHeaderHeightVar();
    wireMobileMenu();
  }

  // Run now + observe injected partials
  document.addEventListener("DOMContentLoaded", init);

  const obs = new MutationObserver(() => {
    // Re-init if header/footer/partials got injected
    init();
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
