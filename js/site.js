(() => {
  const BOOKING_URL = (window.SOMI_CONFIG && window.SOMI_CONFIG.bookingUrl) || "/booking.html";

  function setHeaderHeightVar() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }

  function wireBookingLinks(root = document) {
    root.querySelectorAll("[data-booking-link]").forEach(a => {
      a.setAttribute("href", BOOKING_URL);
      const url = new URL(BOOKING_URL, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      if (isInternal) {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      } else {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
  }

  function normalizePath(pathname) {
    return pathname.replace(/index\.html$/, "").replace(/\/$/, "/");
  }

  function setActiveNav() {
    const links = document.querySelectorAll(".nav a, .mnav");
    if (!links.length) return;
    const current = normalizePath(window.location.pathname || "/");

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      const url = new URL(href, window.location.origin);
      const linkPath = normalizePath(url.pathname);
      const isBehandlinger = linkPath === "/behandlinger.html" && (current === "/behandlinger.html" || current.startsWith("/behandlinger/"));
      const isActive = linkPath === current || isBehandlinger || (linkPath === "/contact.html" && current.endsWith("/contact.html"));
      link.classList.toggle("is-active", isActive);
    });
  }

  function headerOffset() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return 0;
    return Math.round(header.getBoundingClientRect().height + 8);
  }

  function setCurrentYear() {
    const yearEl = document.querySelector("[data-year]");
    if (!yearEl) return;
    yearEl.textContent = String(new Date().getFullYear());
  }

  function initFooterAccordions() {
    document.querySelectorAll(".footer__group").forEach((group, index) => {
      const toggle = group.querySelector(".footer__toggle");
      const links = group.querySelector(".footer__links");
      if (!toggle || !links) return;
      if (!links.id) links.id = `footer-group-${index}`;
      toggle.setAttribute("aria-controls", links.id);

      const open = toggle.getAttribute("aria-expanded") === "true";
      links.hidden = !open;
      links.classList.toggle("is-open", open);

      if (toggle.dataset.bound === "true") return;
      toggle.dataset.bound = "true";

      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        const next = !isOpen;
        toggle.setAttribute("aria-expanded", String(next));
        links.hidden = !next;
        requestAnimationFrame(() => links.classList.toggle("is-open", next));
      });
    });
  }

  function smoothScrollTo(id) {
    const targetId = id.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return false;

    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    return true;
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

    const anchor = e.target.closest("a[href]");
    if (anchor) {
      const url = new URL(anchor.getAttribute("href"), window.location.href);
      if (url.hash === "#kart" && url.pathname === window.location.pathname) {
        e.preventDefault();
        smoothScrollTo("kart");
        history.replaceState(null, "", "#kart");
      }
    }
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
    setActiveNav();
    setCurrentYear();
    initFooterAccordions();
    closeMenu();

    if(window.location.hash === "#kart"){
      setTimeout(() => smoothScrollTo("kart"), 120);
    }
  });

  document.addEventListener("includes:done", () => {
    wireBookingLinks(document);
    setHeaderHeightVar();
    setActiveNav();
    setCurrentYear();
    initFooterAccordions();
  });
})();
