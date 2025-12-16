/* site.js — SOMI Klinikken
   - Requires: tokens.css/base.css + header/footer css
   - Works best with includes.js that dispatches "partials:loaded"
   - Reads config from window.SOMI_CONFIG (config.js)
*/

(function () {
  "use strict";

  // -------------------------
  // Helpers
  // -------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function isExternalUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      return u.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  // -------------------------
  // Booking links (single source of truth)
  // -------------------------
  function wireBookingLinks() {
    const url = window.SOMI_CONFIG?.bookingUrl;
    if (!url) return;

    $$("[data-booking-link]").forEach((a) => {
      a.setAttribute("href", url);

      // booking is external
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");

      // Optional: for analytics hooks later
      if (!a.dataset.analytics) a.dataset.analytics = "booking-cta";
    });
  }

  // -------------------------
  // Header (sticky + mobile menu)
  // -------------------------
  function initHeader() {
    const header = $("[data-site-header]");
    if (!header) return;

    // Sticky visual state
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    const btn = header.querySelector("[data-menu-btn]");
    const panel = $("[data-mobile-panel]");
    if (!btn || !panel) return;

    let isOpen = false;

    const setOpen = (open) => {
      isOpen = !!open;
      panel.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("no-scroll", isOpen);
    };

    const toggle = () => setOpen(!isOpen);

    // Close on escape
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    // Close on click outside panel (when open)
    const onDocClick = (e) => {
      if (!isOpen) return;

      const target = e.target;
      const clickedInsidePanel = panel.contains(target);
      const clickedBtn = btn.contains(target);

      if (!clickedInsidePanel && !clickedBtn) setOpen(false);
    };

    // Close when clicking a link in panel
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setOpen(false);
    });

    btn.addEventListener("click", toggle);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocClick);

    // If viewport grows to desktop, ensure menu closes
    const mq = window.matchMedia("(min-width: 981px)");
    const onMQ = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener?.("change", onMQ);
  }

  // -------------------------
  // Scroll reveal (subtle)
  // -------------------------
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;

    // If user prefers reduced motion, show immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      },
      { threshold: clamp(0.12, 0.1, 0.2), rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  // -------------------------
  // Active nav link highlighting (optional but helpful)
  // -------------------------
  function setActiveNav() {
    const header = $("[data-site-header]");
    if (!header) return;

    const path = window.location.pathname.replace(/\/+$/, "") || "/index.html";

    const links = $$("nav a[href]", header);
    links.forEach((a) => {
      try {
        const href = new URL(a.getAttribute("href"), window.location.origin);
        const hrefPath = href.pathname.replace(/\/+$/, "") || "/index.html";
        const isActive =
          hrefPath === path ||
          (hrefPath === "/index.html" && (path === "/" || path === "/index.html"));

        a.classList.toggle("is-active", isActive);
      } catch {
        // ignore bad urls
      }
    });
  }

  // -------------------------
  // External links safety (optional hardening)
  // -------------------------
  function hardenExternalLinks() {
    $$("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      if (isExternalUrl(href)) {
        // Do not override if explicitly set
        if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener");
        if (!a.getAttribute("target")) a.setAttribute("target", "_blank");
      }
    });
  }

  // -------------------------
  // Init
  // -------------------------
  function initAll() {
    initReveal();
    initHeader();
    wireBookingLinks();
    setActiveNav();
    hardenExternalLinks();
  }

  // Preferred: run after partials are loaded (header/footer injected)
  document.addEventListener("partials:loaded", initAll);

  // Fallback: if partials event never fires, still init after DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    // Give includes.js a short moment if it doesn't dispatch event
    setTimeout(() => {
      // Only run if header exists or if we haven't run yet
      initAll();
    }, 50);
  });
})();
