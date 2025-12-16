/* includes.js — HTML partial loader
   - Loads elements with [data-include="path/to/file.html"]
   - Supports <base href="..."> automatically via document.baseURI
   - Dispatches: document event "partials:loaded" when done
*/

(function () {
  "use strict";

  async function fetchText(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Include failed: ${res.status} ${res.statusText} (${url})`);
    }
    return await res.text();
  }

  async function includePartials() {
    const nodes = Array.from(document.querySelectorAll("[data-include]"));
    if (!nodes.length) {
      document.dispatchEvent(new CustomEvent("partials:loaded"));
      return;
    }

    await Promise.all(
      nodes.map(async (el) => {
        const file = el.getAttribute("data-include");
        if (!file) return;

        // Resolve relative/absolute paths safely (works with <base href>)
        const url = new URL(file, document.baseURI).toString();

        try {
          const html = await fetchText(url);
          el.innerHTML = html;
        } catch (err) {
          console.error(err);

          // Fail gracefully: leave empty but visible in DevTools
          el.innerHTML = "";
          el.setAttribute("data-include-error", "true");
          el.setAttribute("data-include-url", url);
        }
      })
    );

    document.dispatchEvent(new CustomEvent("partials:loaded"));
  }

  document.addEventListener("DOMContentLoaded", includePartials);
})();
