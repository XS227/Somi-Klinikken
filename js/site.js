(async function () {
  // 1) Inject header/footer
  async function loadPartial(targetId, url) {
    const el = document.getElementById(targetId);
    if (!el) return;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error("Partial load failed:", e);
      // Valgfritt: el.innerHTML = "";  // så UI ikke viser “Not Found”
    }
  }

  loadPartial("site-header", "/partials/header.html");
  loadPartial("site-footer", "/partials/footer.html");

  // 2) Aktiv lenke
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav-list a").forEach(a => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "");
    if (href && (href === path || (path === "" && href.endsWith("/index.html")))) {
      a.classList.add("active");
    }
  });

  // 3) Mobilmeny toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".somi-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    // Lukk ved klikk på lenke
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
