// Handles loading of shared partials such as header and footer.

document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');

  await Promise.all(Array.from(includes).map(async (element) => {
    const file = element.getAttribute('data-include');
    if (!file) return;

    const response = await fetch(file);
    if (!response.ok) return;

    element.innerHTML = await response.text();
  }));
});
