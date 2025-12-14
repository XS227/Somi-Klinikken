async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all([...nodes].map(async (el) => {
    const url = el.getAttribute("data-include");
    const res = await fetch(url, { cache: "no-store" });
    el.innerHTML = await res.text();
  }));
}
document.addEventListener("DOMContentLoaded", includePartials);
