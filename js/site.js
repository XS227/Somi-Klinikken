async function loadPartial(selector, url) {
  const target = document.querySelector(selector);
  if (!target) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Kunne ikke laste ${url}`);
    const html = await response.text();
    target.innerHTML = html;
    return target;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function highlightActiveNav(header) {
  const links = header.querySelectorAll('.nav-list a');
  const currentPath = window.location.pathname.replace(/\/*index\.html$/, '/').replace(/\/$/, '/').toLowerCase();

  links.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/*index\.html$/, '/').replace(/\/$/, '/').toLowerCase();
    if (currentPath === linkPath || (currentPath.startsWith('/behandling') && linkPath === '/behandling.html')) {
      link.classList.add('active');
    }
  });
}

function setupMobileNav(header) {
  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.somi-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setCurrentYear(footer) {
  const yearTarget = footer?.querySelector('[data-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

async function initSiteChrome() {
  const [header, footer] = await Promise.all([
    loadPartial('#site-header', '/partials/header.html'),
    loadPartial('#site-footer', '/partials/footer.html'),
  ]);

  if (header) {
    highlightActiveNav(header);
    setupMobileNav(header);
  }

  if (footer) {
    setCurrentYear(footer);
  }
}

document.addEventListener('DOMContentLoaded', initSiteChrome);
