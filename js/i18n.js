function getLang() {
  const p = new URLSearchParams(location.search);
  return (p.get("lang") || "no").toLowerCase();
}

function setFlagToggle() {
  const lang = getLang();
  const btn = document.querySelector("[data-lang-toggle]");
  const img = btn?.querySelector("img");
  if (!btn || !img) return;

  const next = lang === "no" ? "se" : "no";
  img.src = lang === "no" ? "assets/flags/sami.svg" : "assets/flags/no.svg";
  img.alt = next === "se" ? "Bytt til samisk" : "Bytt til norsk";

  btn.addEventListener("click", () => {
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    location.href = url.toString();
  });
}

document.addEventListener("partials:loaded", setFlagToggle);
