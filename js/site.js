(async function () {
  // 1) Inject header/footer
  const headerHost = document.querySelector("#site-header");
  if (headerHost) {
    const headerHtml = await fetch("/header.html").then(r => r.text());
    headerHost.innerHTML = headerHtml;
  }

  const footerHost = document.querySelector("#site-footer");
  if (footerHost) {
    const footerHtml = await fetch("/footer.html").then(r => r.text());
    footerHost.innerHTML = footerHtml;
  }

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
