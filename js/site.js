(async function () {
  async function inject(id, url) {
    const host = document.getElementById(id);
    if (!host) return;

    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    // Ikke injiser feil/404-sider
    if (!res.ok) {
      console.error("Partial failed:", url, res.status, res.statusText);
      return;
    }
    // Noen servere kan returnere "Not Found" med 200 OK
    if (/Not Found/i.test(text) && text.length < 5000) {
      console.error("Partial looks like Not Found:", url);
      return;
    }

    host.innerHTML = text;
  }

  await inject("site-header", "/partials/header.html");
  await inject("site-footer", "/partials/footer.html");

  const headerEl = document.querySelector("[data-site-header]");
  const menuBtn = headerEl?.querySelector("[data-menu-btn]");
  const mobilePanel = headerEl?.querySelector("[data-mobile-panel]");

  function setActiveLinks() {
    const path = location.pathname.replace(/\/$/, "");
    document.querySelectorAll(".nav a, .mobile-panel__inner a").forEach(a => {
      const href = (a.getAttribute("href") || "").replace(/\/$/, "");
      const isIndex = path === "" && href.endsWith("/index.html");
      if (href && (href === path || isIndex)) {
        a.classList.add("active");
      }
    });
  }

  function setupScrollState() {
    if (!headerEl) return;
    const apply = () => headerEl.classList.toggle("is-scrolled", window.scrollY > 4);
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  function setupMobileMenu() {
    if (!menuBtn || !mobilePanel) return;
    const close = () => {
      mobilePanel.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    };

    const toggle = () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("no-scroll", isOpen);
    };

    menuBtn.addEventListener("click", toggle);
    mobilePanel.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  }

  setActiveLinks();
  setupScrollState();
  setupMobileMenu();
})();
