(function () {
  "use strict";

  async function fetchText(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Include failed: ${res.status} (${url})`);
    return await res.text();
  }

  async function includePartials() {
    const nodes = Array.from(document.querySelectorAll("[data-include]"));
    if (!nodes.length) {
      document.dispatchEvent(new CustomEvent("partials:loaded"));
      document.dispatchEvent(new Event("includes:done"));
      return;
    }

    await Promise.all(
      nodes.map(async (el) => {
        const file = el.getAttribute("data-include");
        if (!file) return;

        const url = new URL(file, document.baseURI).toString();

        try {
          el.innerHTML = await fetchText(url);
        } catch (err) {
          console.error(err);
          el.innerHTML = "";
          el.setAttribute("data-include-error", "true");
          el.setAttribute("data-include-url", url);
        }
      })
    );

    document.dispatchEvent(new CustomEvent("partials:loaded"));
    document.dispatchEvent(new Event("includes:done"));
  }

  document.addEventListener("DOMContentLoaded", includePartials);
})();
