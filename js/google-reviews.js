(() => {
  const REVIEWS_URL = "/data/google-reviews.json";

  function renderStars(rating) {
    return "★ ".repeat(Math.max(0, Math.min(5, Number(rating) || 5))).trim();
  }

  function formatDate(value) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("no-NO", { year: "numeric", month: "short", day: "numeric" });
  }

  function cardTemplate(review) {
    return `
      <article class="review-card">
        <div class="stars" aria-hidden="true">${renderStars(review.rating)}</div>
        <p>"${review.text}"</p>
        <span class="who">${review.author}${review.date ? ` · ${formatDate(review.date)}` : ""}</span>
      </article>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const targets = Array.from(document.querySelectorAll("[data-google-reviews-grid]"));
    if (!targets.length) return;

    fetch(REVIEWS_URL, { cache: "no-store" })
      .then((r) => r.json())
      .then((reviews) => {
        const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
        targets.forEach((grid) => {
          const limit = Number(grid.getAttribute("data-google-reviews-limit")) || 4;
          grid.innerHTML = sorted.slice(0, limit).map(cardTemplate).join("");
        });
      })
      .catch(() => {
        targets.forEach((grid) => {
          grid.innerHTML = "<p class='muted'>Kunne ikke laste anmeldelser akkurat nå.</p>";
        });
      });
  });
})();
