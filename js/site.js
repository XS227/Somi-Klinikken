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

  // Aktiv lenke
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav-list a").forEach(a => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "");
    if (href && (href === path || (path === "" && href.endsWith("/index.html")))) {
      a.classList.add("active");
    }
  });

  // Mobilmeny
  const toggle = document.querySelector(".nav-toggle, .menu-toggle, #navToggle");
  const nav = document.querySelector(".somi-nav, .mobile-nav, #mobileNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
