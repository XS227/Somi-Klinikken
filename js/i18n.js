// Simple internationalization placeholder for language toggling.

const translations = {
  no: {
    greeting: 'Velkommen',
  },
  sami: {
    greeting: 'Bures boahtin',
  },
};

function setLanguage(lang) {
  const locale = translations[lang];
  if (!locale) return;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (locale[key]) {
      node.textContent = locale[key];
    }
  });
}

window.siteI18n = { setLanguage };
