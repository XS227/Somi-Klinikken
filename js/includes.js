async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");

  await Promise.all([...nodes].map(async (el) => {
    const file = el.getAttribute("data-include");

    // Støtter både relative og absolute paths
    const url = new URL(file, document.baseURI);

    try {
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) {
        console.error("Include failed:", url.toString(), res.status);
        el.innerHTML = "";
        return;
      }
      el.innerHTML = await res.text();
    } catch (err) {
      console.error("Include error:", url.toString(), err);
      el.innerHTML = "";
    }
  }));

  document.dispatchEvent(new CustomEvent("partials:loaded"));
}

document.addEventListener("DOMContentLoaded", includePartials);
