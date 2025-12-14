(() => {
  const initMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const panel = document.querySelector(".mobile-menu__panel");
    const closeBtn = document.querySelector(".menu-close");

    if (!toggle || !menu || !panel || !closeBtn) {
      return false;
    }

    if (toggle.dataset.menuBound) return true;

    toggle.dataset.menuBound = "true";

    const setExpanded = (isOpen) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Lukk meny" : "Åpne meny");
    };

    const openMenu = () => {
      menu.hidden = false;
      document.body.classList.add("menu-open");
      setExpanded(true);

      // Focus management
      closeBtn.focus({ preventScroll: true });
    };

    const closeMenu = () => {
      menu.hidden = true;
      document.body.classList.remove("menu-open");
      setExpanded(false);

      // Return focus to toggle
      toggle.focus({ preventScroll: true });
    };

    const isOpen = () => !menu.hidden;

    // Toggle click
    toggle.addEventListener("click", () => {
      if (isOpen()) closeMenu();
      else openMenu();
    });

    // Close button
    closeBtn.addEventListener("click", closeMenu);

    // Click outside panel closes
    menu.addEventListener("click", (e) => {
      if (e.target === menu) closeMenu();
    });

    // ESC closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) closeMenu();
    });

    // Close when navigating
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        // allow navigation, but close instantly for SPA-like feel
        closeMenu();
      });
    });

    // Safety: if resized to desktop, ensure closed
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 981px)").matches && isOpen()) {
        closeMenu();
      }
    });

    return true;
  };

  if (initMenu()) return;

  const observer = new MutationObserver(() => {
    if (initMenu()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
