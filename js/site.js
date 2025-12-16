(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function wireBookingLinks() {
    const url = window.SOMI_CONFIG?.bookingUrl;
    if (!url) return;

    $$("[data-booking-link]").forEach((a) => {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      if (!a.dataset.analytics) a.dataset.analytics = "booking-cta";
    });
  }

  function setHeaderHeightVar(headerEl) {
    const apply = () => {
      const h = headerEl.offsetHeight || 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    apply();
    window.addEventListener("resize", apply, { passive: true });
  }

  function initHeader() {
    const header = $("[data-site-header]");
    if (!header) return;

    setHeaderHeightVar(header);

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

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

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!isOpen) return;
      const t = e.target;
      if (!panel.contains(t) && !btn.contains(t)) setOpen(false);
    });

    // Close when clicking a link in panel
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setOpen(false);
    });

    btn.addEventListener("click", toggle);

    // If viewport grows to desktop, close menu
    const mq = window.matchMedia("(min-width: 981px)");
    const onMQ = () => mq.matches && setOpen(false);
    mq.addEventListener?.("change", onMQ);
  }

  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  function setActiveNav() {
    const header = $("[data-site-header]");
    if (!header) return;

    const path = (window.location.pathname.replace(/\/+$/, "") || "/index.html");
    const links = $$("nav a[href]", header);

    links.forEach((a) => {
      try {
        const u = new URL(a.getAttribute("href"), window.location.origin);
        const p = (u.pathname.replace(/\/+$/, "") || "/index.html");
        const active =
          p === path || (p === "/index.html" && (path === "/" || path === "/index.html"));
        a.classList.toggle("is-active", active);
      } catch {}
    });
  }

  function initAll() {
    initReveal();
    initHeader();
    wireBookingLinks();
    setActiveNav();
  }

  document.addEventListener("partials:loaded", initAll);

  // Fallback in case partials event is missing
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initAll, 50);
  });
})();

