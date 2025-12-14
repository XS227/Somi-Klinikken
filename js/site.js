(async function () {
  async function inject(id, url) {
    const host = document.getElementById(id);
    if (!host) return;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Kunne ikke hente ${url}: ${res.status} ${res.statusText}`);
      return; // ikke injiser "Not Found" i UI
    }
    host.innerHTML = await res.text();
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

  // Mobilmeny toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".somi-nav");
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
