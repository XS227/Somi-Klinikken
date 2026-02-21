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



  function initInstagramFeed() {
    const feed = document.querySelector("[data-instagram-feed]");
    if (!feed) return;

    const posts = [
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#bryn"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#hudpleie"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#sandnes"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#microblading"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#laser"] }
    ];

    const filteredPosts = posts.filter(post => post.hashtags.includes("#somiklinikken"));

    feed.innerHTML = filteredPosts.map((post, index) => `
      <a class="footer__insta-item" href="${post.href}" target="_blank" rel="noopener" aria-label="Åpne Instagram innlegg ${index + 1}">
        <iframe src="${post.embed}" title="Instagram innlegg fra SOMI Klinikken ${index + 1}" loading="lazy" allowfullscreen></iframe>
      </a>
    `).join("");
  }

  function initScrollFades() {
    const fadeEls = document.querySelectorAll("[data-scroll-fade]");
    if (!fadeEls.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      fadeEls.forEach(el => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => observer.observe(el));
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
    const overlay = header.querySelector("[data-mobile-overlay]");
    if (!btn || !panel) return;

    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("no-scroll");
    setHeaderHeightVar();
  }

  function toggleMenu() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const btn = header.querySelector("[data-menu-toggle]");
    const panel = header.querySelector("[data-mobile-panel]");
    const overlay = header.querySelector("[data-mobile-overlay]");
    if (!btn || !panel) return;

    const isOpen = panel.classList.contains("is-open");
    if (isOpen) closeMenu();
    else {
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      if (overlay) {
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
      }
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

    const inOverlay = e.target.closest("[data-mobile-overlay]");
    if (inOverlay) closeMenu();

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
    if (e.key !== "Escape") return;
    closeMenu();
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
    initInstagramFeed();
    initScrollFades();
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
    initInstagramFeed();
    initScrollFades();
  });
})();
