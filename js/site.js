(() => {
  const BOOKING_URL = (window.SOMI_CONFIG && window.SOMI_CONFIG.bookingUrl) || "/booking.html";
  const ACCESS_CODE = "2026";
  const ACCESS_STORAGE_KEY = "somi:temporary-access-ok";

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
    const links = document.querySelectorAll(".nav a, .mnav, .nav-dropdown__toggle");
    if (!links.length) return;
    const current = normalizePath(window.location.pathname || "/");

    const treatmentPaths = ["/behandlinger.html", "/behandlinger/", "/kategorier/"];

    links.forEach(link => {
      if (link.matches(".nav-dropdown__toggle")) {
        const isTreatmentsActive = treatmentPaths.some(path => current === path || current.startsWith(path));
        link.classList.toggle("is-active", isTreatmentsActive);
        return;
      }

      const href = link.getAttribute("href");
      if (!href) return;
      const url = new URL(href, window.location.origin);
      const linkPath = normalizePath(url.pathname);
      const isBehandlinger = linkPath === "/behandlinger.html" && treatmentPaths.some(path => current === path || current.startsWith(path));
      const isCategory = linkPath.startsWith("/kategorier/") && current.startsWith("/kategorier/") && linkPath === current;
      const isTreatmentDetail = linkPath.startsWith("/behandlinger/") && current.startsWith("/behandlinger/") && linkPath === current;
      const isActive = linkPath === current || isBehandlinger || isCategory || isTreatmentDetail || (linkPath === "/contact.html" && current.endsWith("/contact.html"));
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

    const requiredTag = "#somiklinikken";
    const posts = [
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#bryn"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#hudpleie"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#sandnes"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#microblading"] },
      { href: "https://www.instagram.com/reel/DJb67ndsUex/", embed: "https://www.instagram.com/reel/DJb67ndsUex/embed/captioned/", hashtags: ["#somiklinikken", "#laser"] }
    ];

    const hasRequiredTag = (hashtags = []) => hashtags
      .map(tag => (tag || "").trim().toLowerCase())
      .includes(requiredTag);

    const filteredPosts = posts.filter(post => hasRequiredTag(post.hashtags));
    const uniquePosts = filteredPosts.filter((post, index, allPosts) => index === allPosts.findIndex(item => item.href === post.href));

    feed.innerHTML = uniquePosts.map((post, index) => `
      <a class="footer__insta-item" href="${post.href}" target="_blank" rel="noopener" aria-label="Åpne Instagram innlegg ${index + 1}">
        <iframe src="${post.embed}" title="Instagram innlegg fra SOMI Klinikken ${index + 1}" loading="lazy" allowfullscreen></iframe>
      </a>
    `).join("");
  }

  function initScrollFades() {
    const fadeEls = document.querySelectorAll("[data-scroll-fade], .reveal");
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


  function initNavDropdowns() {
    const dropdowns = document.querySelectorAll("[data-nav-dropdown]");
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector("[data-nav-dropdown-toggle]");
      if (!toggle || toggle.dataset.bound === "true") return;
      toggle.dataset.bound = "true";

      toggle.addEventListener("click", () => {
        const next = !dropdown.classList.contains("is-open");
        dropdown.classList.toggle("is-open", next);
        toggle.setAttribute("aria-expanded", String(next));
      });

      dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-nav-dropdown]")) return;
      document.querySelectorAll("[data-nav-dropdown]").forEach(dropdown => {
        dropdown.classList.remove("is-open");
        const toggle = dropdown.querySelector("[data-nav-dropdown-toggle]");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initAccessGate() {
    if (document.body.dataset.accessGateBound === "true") return;
    document.body.dataset.accessGateBound = "true";

    const hasAccess = window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === "true";
    if (hasAccess) return;

    const overlay = document.createElement("div");
    overlay.className = "access-gate";
    overlay.innerHTML = `
      <div class="access-gate__dialog" role="dialog" aria-modal="true" aria-labelledby="access-gate-title">
        <img class="access-gate__logo" src="/assets/img/brand/logo.png" alt="SOMI Klinikken" />
        <h2 class="h3" id="access-gate-title">Midlertidig tilgang</h2>
        <p>Tast inn tilgangskode for å se nettsiden.</p>
        <form class="access-gate__form" novalidate>
          <label class="sr-only" for="access-gate-input">Tilgangskode</label>
          <input id="access-gate-input" class="input" type="password" inputmode="numeric" autocomplete="one-time-code" placeholder="Tilgangskode" required />
          <button class="btn btn--primary" type="submit">Åpne nettsiden</button>
          <p class="access-gate__error" aria-live="polite"></p>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);
    document.documentElement.classList.add("access-locked");

    const form = overlay.querySelector(".access-gate__form");
    const input = overlay.querySelector("#access-gate-input");
    const error = overlay.querySelector(".access-gate__error");

    input.focus();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const attempt = (input.value || "").trim();
      if (attempt === ACCESS_CODE) {
        window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "true");
        document.documentElement.classList.remove("access-locked");
        overlay.remove();
        return;
      }

      error.textContent = "Feil kode. Prøv igjen.";
      input.value = "";
      input.focus();
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
    initNavDropdowns();
    initScrollFades();
    closeMenu();
    initAccessGate();

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
    initNavDropdowns();
    initScrollFades();
    initAccessGate();
  });
})();
