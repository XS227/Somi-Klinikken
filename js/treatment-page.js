(() => {
  const DATA_URL = "/data/treatments.json";
  const BOOKING_URL = (window.SOMI_CONFIG && window.SOMI_CONFIG.bookingUrl) || "/booking.html";

  const defaults = {
    microblading: {
      benefits: [
        "Personlig tilpasning av form og farge for naturlig resultat.",
        "Grundig konsultasjon med mulighet for spørsmål før start.",
        "Trygge verktøy og sterile engangsutstyr for å ivareta hygiene."
      ],
      prep: [
        "Unngå blodfortynnende og alkohol siste 24 timer.",
        "Møt uten sminke på brynene for best mulig kartlegging.",
        "Gi beskjed dersom du har nylige hudbehandlinger eller medisiner."
      ],
      after: [
        "Hold området rent og unngå svette, solarium og badstu de første dagene.",
        "Ikke plukk i eventuelle skorper – la huden gro i eget tempo.",
        "Bruk anbefalt salve og SPF for å bevare farge og form."
      ],
      reviews: [
        "Katarina tok seg god tid til oppmåling, og brynene ble akkurat så naturlige som jeg ønsket. – Google-kunde",
        "Veldig trygg prosess fra konsultasjon til etterkontroll. Resultatet holder seg kjempefint. – Google-kunde"
      ]
    },
    "bryn-vipper": {
      benefits: [
        "Ryddige bryn og vipper som fremhever øynene dine.",
        "Skånsomme produkter tilpasset hår og hudtype.",
        "Rask behandling med umiddelbar effekt."],
      prep: [
        "Møt uten øyesminke om mulig.",
        "Unngå selvbruning rundt øyne/bryn samme dag.",
        "Gi beskjed om allergier eller om du tidligere har reagert på farge."],
      after: [
        "Unngå vann, damp og oljebaserte produkter de første 24 timene.",
        "Børst bryn/vipper forsiktig for å bevare løft og retning.",
        "Bestill vedlikehold når effekten begynner å avta."],
      reviews: [
        "Brynstylingen ga ansiktet et løft med en gang. Nøyaktig, rolig og veldig profesjonelt. – Google-kunde",
        "Vippeløftet holdt lenge, og jeg fikk tydelige råd om etterpleie. – Google-kunde"],
    },
    dermalogica: {
      benefits: [
        "Tilpasset hudtype og mål, med profesjonelle Dermalogica-produkter.",
        "Veiledning fra hudterapeut med personlig produktanbefaling.",
        "Rolig behandling som kombinerer rens, peeling og målrettet pleie."],
      prep: [
        "Unngå sterke hjemmebehandlinger (retinol/AHA/BHA) 48 timer før.",
        "Kom uten tung sminke slik at analysen blir presis.",
        "Informer om medisiner, graviditet/amming og hudreaksjoner."],
      after: [
        "Bruk solfaktor daglig de første dagene etter behandling.",
        "Vent med hjemmepeel og retinol i minst 48 timer.",
        "Følg hudterapeutens anbefalinger for hjemmepleie."],
      reviews: [
        "Hudanalysen var grundig, og behandlingen ble tydelig tilpasset huden min. – Google-kunde",
        "Merket mindre rødhet og jevnere hudtone allerede etter første time. – Google-kunde"],
    },
    hudpleie: {
      benefits: [
        "Hudfornyelse med aktive ingredienser og behagelige protokoller.",
        "Kombinasjon av rens, peel og pleie gir rask glød.",
        "Tydelige råd om hvordan du holder resultatet ved like."],
      prep: [
        "Unngå soling og selvbruning rett før behandlingen.",
        "Pause retinol/eksfolierende produkter 2 døgn i forkant.",
        "Informer om medisiner, hudsykdommer og tidligere reaksjoner."],
      after: [
        "Bruk solfaktor og unngå direkte sol de første dagene.",
        "Hold huden godt fuktet og vent med sterke produkter i 2–3 døgn.",
        "Ta kontakt dersom du opplever uventede reaksjoner."],
      reviews: [
        "Dyprensen hos SOMI gjorde huden klarere uten å irritere. – Google-kunde",
        "Laserbehandlingen ble forklart steg for steg, og jeg følte meg veldig trygg. – Google-kunde"],
    }
  };

  const practitioners = {
    microblading: {
      name: "Katarina",
      role: "Eier og daglig leder",
      image: "/assets/img/team/katarina.svg",
      alt: "Katarina fra SOMI Klinikken",
      bio: "Katarina spesialiserer seg på naturlig microblading med presis oppmåling og personlig tilpasning.",
      cta: "Bestill time hos Katarina"
    },
    "bryn-vipper": {
      name: "Emma",
      role: "Hudterapeut",
      image: "/assets/img/team/emma.svg",
      alt: "Emma fra SOMI Klinikken",
      bio: "Emma jobber med bryn og vipper for å skape et mykt, symmetrisk og holdbart resultat.",
      cta: "Bestill time hos Emma"
    },
    dermalogica: {
      name: "Emma",
      role: "Hudterapeut",
      image: "/assets/img/team/emma.svg",
      alt: "Emma fra SOMI Klinikken",
      bio: "Emma tilpasser Dermalogica-behandlinger etter hudtilstand, mål og sesong for trygg hudforbedring.",
      cta: "Bestill Dermalogica hos Emma"
    },
    hudpleie: {
      name: "Arianna",
      role: "Laserspesialist",
      image: "/assets/img/team/arianna.svg",
      alt: "Arianna fra SOMI Klinikken",
      bio: "Arianna tilbyr hud- og laserbehandlinger med fokus på sikkerhet, komfort og synlige resultater.",
      cta: "Bestill hudbehandling hos Arianna"
    }
  };

  function findTreatment(id, data){
    for(const cat of data.categories || []){
      const item = (cat.items || []).find(it => it.id === id);
      if(item) return { item, category: cat };
    }
    return null;
  }

  function setText(selector, text){
    const el = document.querySelector(selector);
    if(el) el.textContent = text;
  }

  function fillList(el, items){
    if(!el) return;
    el.innerHTML = (items || []).map(t => `<li>${t}</li>`).join("");
  }

  function render(treatment){
    const { item, category } = treatment;
    setText("[data-field='title']", item.name);
    setText("[data-field='lead']", item.short || "");

    setText("[data-field='price']", item.price || "");
    setText("[data-field='duration']", item.duration || "");
    setText("[data-field='category']", category.title || "");

    const tagsWrap = document.querySelector("[data-field='tags']");
    if(tagsWrap){
      const badges = [];
      if(item.popular) badges.push('<span class="pill">Populær</span>');
      (item.tags || []).forEach(tag => badges.push(`<span class="pill">${tag}</span>`));
      tagsWrap.innerHTML = badges.join("");
    }

    const def = defaults[category.id] || { benefits: [], prep: [], after: [], reviews: [] };
    fillList(document.querySelector("[data-list='benefits']"), def.benefits);
    fillList(document.querySelector("[data-list='prep']"), def.prep);
    fillList(document.querySelector("[data-list='aftercare']"), def.after);
    fillList(document.querySelector("[data-list='reviews']"), def.reviews);

    document.querySelectorAll("[data-booking-link]").forEach(a => {
      a.setAttribute("href", BOOKING_URL);
      const url = new URL(BOOKING_URL, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      if (isInternal) {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      } else {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });

    const backLink = document.querySelector("[data-back-link]");
    if(backLink) backLink.setAttribute("href", `/behandlinger.html#${category.id}`);

    const practitioner = practitioners[category.id];
    if (practitioner) {
      const container = document.querySelector(".treatmentPage .container");
      const lastSectionCard = container ? container.querySelector(".section-card:last-of-type") : null;
      if (container && lastSectionCard && !container.querySelector("[data-practitioner-card]")) {
        const section = document.createElement("section");
        section.className = "section-card practitioner-card";
        section.setAttribute("data-practitioner-card", "");
        section.innerHTML = `
          <div class="practitioner-content">
            <p class="kicker">Din behandler</p>
            <h2>${practitioner.name}</h2>
            <p class="practitioner-role">${practitioner.role}</p>
            <p>${practitioner.bio}</p>
            <a class="btn btn--primary" href="${BOOKING_URL}" data-booking-link>${practitioner.cta}</a>
          </div>
          <img src="${practitioner.image}" alt="${practitioner.alt}" loading="lazy" />
        `;
        container.insertBefore(section, lastSectionCard);
      }
    }
  }

  function showError(){
    const wrap = document.querySelector("[data-treatment-page]");
    if(!wrap) return;
    wrap.innerHTML = `<div class="section-card">Fant ikke behandlingen. Gå tilbake til <a href="/behandlinger.html">oversikten</a>.</div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-treatment-page]");
    if(!root) return;
    const id = root.getAttribute("data-treatment-id");
    if(!id) return;

    fetch(DATA_URL, { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        const match = findTreatment(id, data);
        if(!match) {
          showError();
          return;
        }
        render(match);
      })
      .catch(() => showError());
  });
})();
