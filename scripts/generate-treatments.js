const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'treatments.json');
const outDir = path.join(__dirname, '..', 'behandlinger');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function tpl(item, cat){
  const desc = item.short || cat.desc || 'Behandling hos SOMI Klinikken.';
  const title = `${item.name} | ${cat.title} hos SOMI Klinikken`;
  return `<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="stylesheet" href="/css/tokens.css" />
  <link rel="stylesheet" href="/css/base.css" />
  <link rel="stylesheet" href="/css/layout.css" />
  <link rel="stylesheet" href="/css/components.css" />
  <link rel="stylesheet" href="/css/motion.css" />
  <link rel="stylesheet" href="/css/header.css" />
  <link rel="stylesheet" href="/css/footer.css" />
  <link rel="stylesheet" href="/css/treatment.css" />
  <link rel="stylesheet" href="/css/hotfix.css" />
  <script defer src="/js/includes.js"></script>
  <script defer src="/js/site.js"></script>
  <script defer src="/js/treatment-page.js"></script>
</head>
<body>
  <div data-include="/partials/header.html"></div>
  <main class="treatmentPage" data-treatment-page data-treatment-id="${item.id}">
    <div class="container">
      <section class="treatment-hero">
        <p class="kicker">Behandling · ${cat.title}</p>
        <h1 class="treatment-title" data-field="title">${item.name}</h1>
        <p class="treatment-lead" data-field="lead">${desc}</p>
        <div class="treatment-meta">
          <span class="meta-pill">Kategori: <strong data-field="category" style="margin-left:6px;">${cat.title}</strong></span>
          <span class="meta-pill">Varighet: <strong data-field="duration" style="margin-left:6px;">${item.duration || ''}</strong></span>
          <span class="meta-pill">Pris: <strong data-field="price" style="margin-left:6px;">${item.price || ''}</strong></span>
          <span class="meta-pill">Merknader: <span data-field="tags" class="badge-list"></span></span>
        </div>
        <div class="treatment-cta">
          <a class="btn btn--primary" href="#" data-booking-link>BOOK TIME</a>
          <a class="btn" data-back-link href="/behandlinger.html">Tilbake til behandlinger</a>
          <a class="btn" href="/priser.html">Se priser</a>
        </div>
      </section>

      <div class="treatment-grid">
        <section class="section-card">
          <h2>Dette får du</h2>
          <p>Et kort sammendrag av hva behandlingen innebærer og hva du kan forvente.</p>
          <ul data-list="benefits"></ul>
        </section>

        <section class="section-card">
          <h2>Praktisk info</h2>
          <p>Pris og tid kan variere ved kombinasjoner. Kontakt oss om du trenger råd.</p>
          <div class="note-box">
            <div><strong>Pris:</strong> <span data-field="price">${item.price || ''}</span></div>
            <div><strong>Varighet:</strong> <span data-field="duration">${item.duration || ''}</span></div>
            <div><strong>Kategori:</strong> <span data-field="category">${cat.title}</span></div>
          </div>
          <div class="treatment-cta" style="margin-top:10px;">
            <a class="btn btn--primary" href="#" data-booking-link>Bestill time</a>
            <a class="btn" href="/contact.html">Kontakt oss</a>
          </div>
        </section>
      </div>

      <div class="treatment-grid">
        <section class="section-card">
          <h2>Før timen</h2>
          <p>Små forberedelser kan gi et bedre resultat.</p>
          <ul data-list="prep"></ul>
        </section>

        <section class="section-card">
          <h2>Etter timen</h2>
          <p>Følg rådene nedenfor for å sikre god etterbehandling.</p>
          <ul data-list="aftercare"></ul>
        </section>
      </div>

      <div class="section-card">
        <h2>Spørsmål?</h2>
        <p>Du når oss på <a href="mailto:post@somiklinikken.no">post@somiklinikken.no</a> eller <a href="tel:+4792939171">+47 929 39 171</a>. Vi hjelper deg å velge riktig behandling.</p>
        <div class="treatment-cta">
          <a class="btn" href="/contact.html">Kontakt oss</a>
          <a class="btn" href="/behandlinger.html#${cat.id}" data-back-link>Tilbake til ${cat.title}</a>
        </div>
      </div>
    </div>
  </main>
  <div data-include="/partials/footer.html"></div>
</body>
</html>`;
}

let count = 0;
for(const cat of data.categories){
  for(const item of cat.items){
    const html = tpl(item, cat);
    const dest = path.join(outDir, `${item.id}.html`);
    fs.writeFileSync(dest, html, 'utf8');
    count++;
  }
}

console.log(`Generated ${count} treatment pages to ${outDir}`);
